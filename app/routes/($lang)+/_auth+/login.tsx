import {
  Alert,
  Anchor,
  Button,
  Center,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput
} from '@mantine/core';

import { Link, useOutletContext } from 'react-router';
import { login } from '~/auth/auth.server';
import { createUserSession } from '~/auth/session.server';
import { redisClient } from '~/entry.server';
import { useForm } from '~/hooks/useForm';

import useTranslation from '~/hooks/useTranslation';
import { IconFacebook, IconGoogle } from '~/icons';
import { loginFormSchema } from '~/schema';
import { OutletContext } from '~/types';
import {
  buildLocalizedLink,
  generateUuidv4,
  getCurrentLanguage
} from '~/utils';
import { Route } from './+types/login';
import InvalidProvider from '~/components/error/InvalidProvider';
import ProviderLoginFailed from '~/components/error/ProviderLoginFailed';
import { handleError } from '~/utils/error';
import { validateTurnstile } from '~/server/turnstile';
import { Turnstile } from '@marsidev/react-turnstile';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const currentLanguage = getCurrentLanguage(params);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const {
      email,
      password,
      'cf-turnstile-response': cfTurnstileResponseToken
    } = loginFormSchema.parse(data);

    const outcome = await validateTurnstile({
      request,
      token: cfTurnstileResponseToken
    });

    console.log({ outcome });

    if (!outcome.success) {
      return {
        title: 'turnstile.errorTitle',
        description: 'turnstile.errorDescription'
      };
    }

    const authResults = await login({ email, password });
    const { access_token, refresh_token } = authResults;

    const sessionId = generateUuidv4();

    await redisClient.saveToken(sessionId, {
      token: access_token!,
      refreshToken: refresh_token!
    });

    return createUserSession({
      request,
      userSessionId: sessionId,
      remember: true,
      redirectTo: buildLocalizedLink({
        currentLanguage,
        paths: ['?force-validate=global']
      })
    });
  } catch (error) {
    return handleError({ error, route: 'login' });
  }
};

const Login = () => {
  const t = useTranslation();
  const { currentLanguage, env, searchParams } =
    useOutletContext<OutletContext>();

  const error = searchParams.get('error');

  const { Form, form, state, fetcher, errors } = useForm<{
    title: string;
    description: string;
  }>({
    schema: loginFormSchema,
    initialValues: {
      email: '',
      password: ''
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
          {t('login.welcome')}
        </Text>

        <Group grow>
          <Button
            radius={'xl'}
            variant="light"
            leftSection={<IconGoogle />}
            component={'a'}
            href={`${env?.DIRECTUS_URL}/auth/login/google?redirect=${env?.APP_URL}/${currentLanguage}/login-via-providers?from=login`}
          >
            {t('common.google')}
          </Button>
          <Button radius={'xl'} variant="light" leftSection={<IconFacebook />}>
            {t('common.facebook')}
          </Button>
        </Group>

        <Divider
          label={t('authForm.continueWithEmail')}
          labelPosition="center"
          my="lg"
        />

        <Stack>
          <Form method="POST">
            <TextInput
              withAsterisk
              name={'email'}
              label={t('authForm.email')}
              placeholder={'john@gmail.com'}
              key={form.key('email')}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              withAsterisk
              radius={0}
              label={t('authForm.password')}
              name={'password'}
              placeholder="********"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            <Group mt={'md'} justify="space-between">
              <Anchor
                component={Link}
                to={buildLocalizedLink({
                  currentLanguage,
                  paths: ['register']
                })}
              >
                {t('login.accountRegister')}
              </Anchor>

              <Button type="submit" loading={state === 'submitting'}>
                {t('login.login')}
              </Button>
            </Group>

            <Turnstile
              siteKey={env?.TURNSTILE_SITE_KEY!}
              options={{
                size: 'invisible'
              }}
            />
          </Form>
        </Stack>

        {fetcher.data?.title && (
          <Alert variant="light" color="red" title={t(fetcher.data?.title)}>
            {t(fetcher.data?.description)}
          </Alert>
        )}

        {errors?.['cf-turnstile-response'] && (
          <Text fz={11} c={'red'}>
            {t('turnstile.tokenRequired')}
          </Text>
        )}

        {error === 'invalidProvider' && <InvalidProvider t={t} />}

        {error === 'providerLoginFailed' && <ProviderLoginFailed t={t} />}
      </Paper>
    </Center>
  );
};

export default Login;
