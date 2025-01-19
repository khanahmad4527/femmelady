import {
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

import { Link, useOutletContext } from 'react-router';
import { z } from 'zod';
import { login } from '~/auth/auth.server';
import { createUserSession } from '~/auth/session.server';
import { redisClient } from '~/entry.server';
import { useForm } from '~/hooks/useForm';

import useTranslation from '~/hooks/useTranslation';
import { IconBrandX, IconGoogle } from '~/icons';
import { loginFormSchema } from '~/schema';
import classes from '~/styles/Common.module.scss';
import { OutletContext } from '~/types';
import {
  buildLocalizedLink,
  generateUuidv4,
  getLang,
  parseZodError
} from '~/utils';
import { Route } from './+types/login';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const lang = getLang(params);
  const formData = await request.formData();

  try {
    const { email, password } = loginFormSchema.parse(
      Object.fromEntries(formData)
    );

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
      redirectTo: `/${lang}/?force-validate=global`
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }
};

const Login = () => {
  const t = useTranslation();
  const { currentLanguage, env } = useOutletContext<OutletContext>();
  const { Form, form, state } = useForm({
    schema: loginFormSchema,
    initialValues: {
      email: 'khanahmad4527@gmail.com',
      password: 'KuibKtc@#2kdon33VcIdMN'
    }
  });

  return (
    <Paper
      component={Stack}
      radius={0}
      p={{ base: 'md', md: 'xl' }}
      w={{ base: '90%', md: '50%' }}
      className={classes.centerDiv}
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
          href={
            `${env?.DIRECTUS_URL}/auth/login/google?redirect=${env?.APP_URL}/${currentLanguage}/login-via-providers`
          }
        >
          Google
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
        </Form>
      </Stack>
    </Paper>
  );
};

export default Login;
