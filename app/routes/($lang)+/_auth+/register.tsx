import { createUser } from '@directus/sdk';
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { Turnstile } from '@marsidev/react-turnstile';

import { ActionFunction, Link, redirect, useOutletContext } from 'react-router';
import InvalidProvider from '~/components/error/InvalidProvider';
import ProviderLoginFailed from '~/components/error/ProviderLoginFailed';
import PasswordComponent from '~/components/PasswordComponent';
import SocialLogin from '~/components/SocialLogin';
import { PARAMS, PATHS } from '~/constant';
import { useForm } from '~/hooks/useForm';

import useTranslation from '~/hooks/useTranslation';
import { registerFormSchema } from '~/schema';
import { directus } from '~/server/directus';
import { validateTurnstile } from '~/server/turnstile';
import { OutletContext } from '~/types';
import { buildLocalizedLink, getValidLanguageOrRedirect } from '~/utils';
import { handleError } from '~/utils/error';
import { Route } from './+types/register';
import { isAuthenticated } from '~/auth/auth.server';
import FetcherError from '~/components/error/FetcherError';

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const result = getValidLanguageOrRedirect({ params, request });

  if (result instanceof Response) {
    return result;
  }

  const currentLanguage = result;

  // redirect to home page if already loggedIn
  const { isLoggedIn } = await isAuthenticated(request);

  if (isLoggedIn) {
    const redirectTo = buildLocalizedLink({
      baseUrl: process.env?.APP_URL!,
      currentLanguage,
      queryParams: {
        'force-validate': 'global'
      }
    });

    return redirect(redirectTo);
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  return {};
  try {
    const result = getValidLanguageOrRedirect({ params, request });

    if (result instanceof Response) {
      return result;
    }

    const currentLanguage = result;

    const formData = await request.formData();

    const data = Object.fromEntries(formData);

    const validatedData = registerFormSchema.parse(data);

    const outcome = await validateTurnstile({
      request,
      token: validatedData['cf-turnstile-response']
    });

    console.log({ outcome });

    if (!outcome.success) {
      return {
        title: 'turnstile.errorTitle',
        description: 'turnstile.errorDescription'
      };
    }

    await directus.request(
      createUser({
        email: validatedData.email,
        first_name: validatedData.first_name,
        last_name: validatedData?.last_name,
        password: validatedData.password
      })
    );

    return redirect(
      buildLocalizedLink({
        baseUrl: process.env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.login]
      })
    );
  } catch (error) {
    return handleError({ error, route: 'register' });
  }
};

const register = () => {
  const { currentLanguage, searchParams, env } =
    useOutletContext<OutletContext>();

  const t = useTranslation();

  const error = searchParams.get(PARAMS.error);

  const { Form, form, state, fetcher } = useForm<{
    title: string;
    description: string;
  }>({
    schema: registerFormSchema,
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
      terms: 'on'
    }
  });

  return (
    <Paper
      component={Stack}
      radius={0}
      p={{ base: 'md', md: 'xl' }}
      w={{ base: '100%', md: '50%' }}
      m={'auto'}
      withBorder
    >
      <Text size="lg" fw={500}>
        {t('register.welcome')}
      </Text>

      <SocialLogin from={'register'} />

      <Divider
        label={t('authForm.continueWithEmail')}
        labelPosition="center"
        my="lg"
      />

      <Form method="POST">
        <Stack>
          <Group align={'start'} grow>
            <TextInput
              withAsterisk
              label={t('authForm.firstName')}
              name="first_name"
              placeholder="John"
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />

            <TextInput
              label={t('authForm.lastName')}
              name="last_name"
              placeholder="Doe"
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
            />
          </Group>
          <TextInput
            withAsterisk
            label={t('authForm.email')}
            name="email"
            placeholder="jhon@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
            disabled //TODO: remove later, when email verification is implemented
          />

          <PasswordComponent form={form} />

          <Checkbox
            name="terms"
            label={t('authForm.terms')}
            key={form.key('terms')}
            {...form.getInputProps('terms', { type: 'checkbox' })}
          />

          <Group justify="space-between">
            <Anchor
              component={Link}
              prefetch="intent"
              to={buildLocalizedLink({
                baseUrl: env?.APP_URL!,
                currentLanguage,
                paths: [PATHS.login]
              })}
            >
              {t('register.accountLogin')}
            </Anchor>
            <Button type="submit" loading={state !== 'idle'}>
              {' '}
              {t('register.register')}
            </Button>
          </Group>
        </Stack>

        <Turnstile
          siteKey={env?.TURNSTILE_SITE_KEY!}
          options={{
            size: 'invisible'
          }}
        />
      </Form>

      <FetcherError fetcher={fetcher} />

      {error === 'invalidProvider' && <InvalidProvider t={t} />}

      {error === 'providerLoginFailed' && <ProviderLoginFailed t={t} />}
    </Paper>
  );
};

export default register;
