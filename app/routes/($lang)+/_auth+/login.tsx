import {
  Alert,
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput
} from '@mantine/core';

import { Link, redirect, useOutletContext } from 'react-router';
import { isAuthenticated, login } from '~/auth/auth.server';
import { createUserSession } from '~/auth/session.server';

import useTranslation from '~/hooks/useTranslation';
import { loginFormSchema } from '~/schema';
import { OutletContext } from '~/types';
import {
  buildLocalizedLink,
  generateUuidv4,
  getValidLanguageOrRedirect
} from '~/utils';
import { Route } from './+types/login';
import InvalidProvider from '~/components/error/InvalidProvider';
import ProviderLoginFailed from '~/components/error/ProviderLoginFailed';
import { handleError } from '~/utils/error';
import { validateTurnstile } from '~/server/turnstile';
import { Turnstile } from '@marsidev/react-turnstile';
import SocialLogin from '~/components/SocialLogin';
import { PARAMS, PATHS } from '~/constant';
import FetcherError from '~/components/error/FetcherError';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '~/hooks/useForm';
import Marquee from '~/components/Marquee';
import { redisClient } from '~/server';
import { href } from 'react-router';

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

export const action = async ({ request, params }: Route.ActionArgs) => {
  try {
    const result = getValidLanguageOrRedirect({ params, request });

    if (result instanceof Response) {
      return result;
    }

    const currentLanguage = result;

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const {
      email,
      password,
      'cf-turnstile-response': cfTurnstileResponseToken
    } = loginFormSchema.parse(data);

    const outcome = await validateTurnstile({
      request,
      token: cfTurnstileResponseToken
    });

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

    const url = new URL(request.url);

    return createUserSession({
      request,
      userSessionId: sessionId,
      remember: true,
      redirectTo:
        url.searchParams.get(PARAMS.redirectTo) ??
        buildLocalizedLink({
          baseUrl: process.env?.APP_URL!,
          currentLanguage,
          queryParams: {
            'force-validate': 'global'
          }
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
  const isCompact = useMediaQuery('(max-width: 22em)');
  const turnstileSize = isCompact ? 'compact' : 'normal';

  const error = searchParams.get(PARAMS.error);

  const { Form, form, state, fetcher, errors, handleSubmit } = useForm<{
    title: string;
    description: string;
  }>({
    schema: loginFormSchema,
    initialValues: {
      email: '',
      password: '',
      'cf-turnstile-response': 'XXXXX-XXXXX-XXXXX-XXXXX' // To by pass the form validation
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
        {t('login.welcome')}
      </Text>

      <SocialLogin from={'login'} />

      <Divider
        label={t('authForm.continueWithEmail')}
        labelPosition="center"
        my="lg"
      />

      <Stack>
        <Marquee>
          <Text size="xl" c="yellow">
            {t('common.continueWithGoogle')}
          </Text>
        </Marquee>

        <Form method="POST" onSubmit={handleSubmit}>
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

          <Group my={'md'} justify="space-between">
            <Anchor
              component={Link}
              prefetch="intent"
              to={href('/:lang?/register', { lang: currentLanguage })}
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
              size: turnstileSize
            }}
          />
        </Form>
      </Stack>

      <FetcherError fetcher={fetcher} />

      {errors?.['cf-turnstile-response'] && (
        <Text fz={11} c={'red'}>
          {t('turnstile.tokenRequired')}
        </Text>
      )}

      {error === 'invalidProvider' && <InvalidProvider t={t} />}

      {error === 'providerLoginFailed' && <ProviderLoginFailed t={t} />}
    </Paper>
  );
};

export default Login;
