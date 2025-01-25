import { createUser } from '@directus/sdk';
import {
  Alert,
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
import { PATHS } from '~/constant';
import { useForm } from '~/hooks/useForm';

import useTranslation from '~/hooks/useTranslation';
import { registerFormSchema } from '~/schema';
import { directus } from '~/server/directus';
import { validateTurnstile } from '~/server/turnstile';
import { OutletContext } from '~/types';
import { buildLocalizedLink, getCurrentLanguage } from '~/utils';
import { handleError } from '~/utils/error';

export const action: ActionFunction = async ({ request, params }) => {
  const currentLanguage = getCurrentLanguage(params);
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  try {
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
      buildLocalizedLink({ currentLanguage, paths: [PATHS.login] })
    );
  } catch (error) {
    return handleError({ error, route: 'register' });
  }
};

const register = () => {
  const { currentLanguage, searchParams, env } =
    useOutletContext<OutletContext>();

  const t = useTranslation();

  const error = searchParams.get('error');

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
    <Center>
      <Paper
        component={Stack}
        radius={0}
        p={{ base: 'md', md: 'xl' }}
        w={{ base: '90%', md: '50%' }}
        withBorder
      >
        <Text size="lg" fw={500}>
          {t('register.welcome')}
        </Text>

        <SocialLogin />

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
                to={buildLocalizedLink({
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

        {fetcher.data?.title && (
          <Alert variant="light" color="red" title={t(fetcher.data?.title)}>
            {t(fetcher.data?.description)}
          </Alert>
        )}

        {error === 'invalidProvider' && <InvalidProvider t={t} />}

        {error === 'providerLoginFailed' && <ProviderLoginFailed t={t} />}
      </Paper>
    </Center>
  );
};

export default register;
