import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import {
  ActionFunction,
  href,
  Link,
  redirect,
  useOutletContext
} from 'react-router';

import { isAuthenticated } from '~/auth/auth.server';
import FetcherError from '~/components/error/FetcherError';
import InvalidProvider from '~/components/error/InvalidProvider';
import ProviderLoginFailed from '~/components/error/ProviderLoginFailed';
import PasswordComponent from '~/components/PasswordComponent';
import SocialLogin from '~/components/SocialLogin';
import { PARAMS } from '~/constant';
import { useForm } from '~/hooks/useForm';
import useTranslation from '~/hooks/useTranslation';
import { registerFormSchema } from '~/schema';
import { OutletContext } from '~/types';
import { buildLocalizedLink, getValidLanguageOrRedirect } from '~/utils';

import { Route } from './+types/register';
import { handleActionError, throwVerificationLimitError } from '~/utils/error';
import { directus } from '~/server/directus';
import { registerUser } from '@directus/sdk';
import { validateTurnstile } from '~/server/turnstile';
import { getUserIp, redisClient } from '~/server';
import { getEnv } from '~/server/env';
import CFTurnstile from '~/components/CFTurnstile';
import { isDisposableEmail } from '~/server/disposable';

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
      url: href('/:lang?', { lang: currentLanguage }),
      queryParams: {
        'force-validate': 'global'
      }
    });

    return redirect(redirectTo);
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  try {
    const result = getValidLanguageOrRedirect({ params, request });

    if (result instanceof Response) {
      return result;
    }

    const currentLanguage = result;

    const formData = await request.formData();

    const data = Object.fromEntries(formData);

    const validatedData = registerFormSchema.parse(data);

    const email = validatedData.email;

    if (isDisposableEmail(email)) {
      return {};
    }

    const outcome = await validateTurnstile({
      request,
      token: validatedData['cf-turnstile-response']
    });

    if (!outcome.success) {
      return {
        title: 'turnstile.errorTitle',
        description: 'turnstile.errorDescription'
      };
    }

    const ip = getUserIp(request);

    // Check rate limit before sending the verification email
    const { allowed } = await redisClient.checkRateLimit(
      'email-verification',
      email,
      ip!
    );

    if (!allowed) {
      return throwVerificationLimitError();
    }

    const env = getEnv(process.env);

    await directus.request(
      registerUser(email, validatedData.password, {
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        verification_url: buildLocalizedLink({
          origin: env.APP_URL,
          url: href('/:lang?/verify-email', {
            lang: currentLanguage
          })
        })
      })
    );

    return { title: 'REGISTRATION_SUCCESSFUL' };
  } catch (error) {
    return handleActionError({ error, route: 'register' });
  }
};

const register = () => {
  const { currentLanguage, searchParams } = useOutletContext<OutletContext>();

  const t = useTranslation();

  const error = searchParams.get(PARAMS.error);

  const { Form, form, state, fetcher, handleSubmit } = useForm<{
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
      terms: 'on',
      'cf-turnstile-response': ''
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
      <Form method="POST" onSubmit={handleSubmit}>
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
              withAsterisk
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
              prefetch="intent"
              to={href('/:lang?/login', { lang: currentLanguage })}
            >
              {t('register.accountLogin')}
            </Anchor>
            <Button type="submit" loading={state !== 'idle'}>
              {t('register.register')}
            </Button>
          </Group>

          <CFTurnstile fetcher={fetcher} form={form} state={state} />
        </Stack>
      </Form>

      <FetcherError fetcher={fetcher} />

      {fetcher.data?.title === 'REGISTRATION_SUCCESSFUL' && (
        <Alert
          variant="light"
          color="green"
          title={t('register.registrationSuccessfulTitle')}
        >
          {t('register.registrationSuccessfulDescription')}
        </Alert>
      )}

      {error === 'invalidProvider' && <InvalidProvider t={t} />}
      {error === 'providerLoginFailed' && <ProviderLoginFailed t={t} />}
    </Paper>
  );
};

export default register;
