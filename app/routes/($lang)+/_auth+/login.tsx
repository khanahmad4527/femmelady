import {
  Anchor,
  Button,
  Divider,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { href, Link, redirect, useOutletContext } from 'react-router';

import { isAuthenticated, login } from '~/auth/auth.server';
import { createUserSession } from '~/auth/session.server';
import FetcherError from '~/components/error/FetcherError';
import InvalidProvider from '~/components/error/InvalidProvider';
import ProviderLoginFailed from '~/components/error/ProviderLoginFailed';
import SocialLogin from '~/components/SocialLogin';
import { PARAMS } from '~/constant';
import { useForm } from '~/hooks/useForm';
import useTranslation from '~/hooks/useTranslation';
import { loginFormSchema } from '~/schema';
import { redisClient } from '~/server';
import { validateTurnstile } from '~/server/turnstile';
import { OutletContext } from '~/types';
import {
  buildLocalizedLink,
  generateUuidv4,
  getValidLanguageOrRedirect
} from '~/utils';
import { handleActionError } from '~/utils/error';

import { Route } from './+types/login';
import CFTurnstile from '~/components/CFTurnstile';

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
          url: href('/:lang?', { lang: currentLanguage }),
          queryParams: {
            'force-validate': 'global'
          }
        })
    });
  } catch (error) {
    return handleActionError({ error, route: 'login' });
  }
};

const Login = () => {
  const t = useTranslation();
  const { currentLanguage, searchParams } = useOutletContext<OutletContext>();
  const error = searchParams.get(PARAMS.error);

  const { Form, form, state, fetcher, errors, handleSubmit } = useForm<{
    title: string;
    description: string;
  }>({
    schema: loginFormSchema,
    initialValues: {
      email: '',
      password: '',
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
        {t('login.welcome')}
      </Text>

      <SocialLogin from={'login'} />

      <Divider
        label={t('authForm.continueWithEmail')}
        labelPosition="center"
        my="lg"
      />

      <Form method="POST" onSubmit={handleSubmit}>
        <Stack>
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

          <Flex
            gap="md"
            justify="space-between"
            align={{ base: 'unset', xs: 'end' }}
            direction={{ base: 'column-reverse', xs: 'row' }}
          >
            <Anchor
              component={Link}
              prefetch="intent"
              to={href('/:lang?/forgot-password', { lang: currentLanguage })}
            >
              {t('resetPassword.forgotPasswordQuestion')}
            </Anchor>

            <Button type="submit" loading={state === 'submitting'}>
              {t('login.login')}
            </Button>
          </Flex>

          <Anchor
            component={Link}
            prefetch="intent"
            to={href('/:lang?/register', { lang: currentLanguage })}
          >
            {t('login.accountRegister')}
          </Anchor>

          <CFTurnstile fetcher={fetcher} form={form} state={state} />
        </Stack>
      </Form>

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
