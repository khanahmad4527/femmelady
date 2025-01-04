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

import { ActionFunction, Link, useOutletContext } from 'react-router';
import { z } from 'zod';
import { useForm } from '~/hooks/useForm';

import useTranslation from '~/hooks/useTranslation';
import { IconGoogle } from '~/icons';
import { loginFormSchema } from '~/schema';
import classes from '~/styles/Common.module.scss';
import { OutletContext } from '~/types';
import { buildLocalizedLink, parseZodError } from '~/utils';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    loginFormSchema.parse(data);
    /**
     * // Call Directus login API to authenticate user
    const authResults = await login({ email, password });
    const { access_token, refresh_token } = authResults;

    const user = (await getUserByToken(access_token!)) as User;
    const sessionId = `${uuid()}#${(user as User).id}`; // random id # user Id
    await redisClient.saveToken(sessionId, {
      token: access_token!,
      refreshToken: refresh_token!
    });
    const redirectPath = url.searchParams.get('redirect_url_path');
    return createUserSession({
      request,
      userSessionId: sessionId,
      remember: true,
      redirectTo: redirectPath
        ? redirectPath
        : DOMAIN +
          `/${languages[user.language || FALLBACK_LANGUAGE] || DEFAULT_LANGUAGE}`
    });
     */

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }
};

const Login = () => {
  const t = useTranslation();
  const { currentLanguage } = useOutletContext<OutletContext>();
  const { Form, form } = useForm({
    schema: loginFormSchema,
    initialValues: { email: '' }
  });

  return (
    <Paper
      component={Stack}
      radius="md"
      p={{ base: 'md', md: 'xl' }}
      w={{ base: '90%', md: '50%' }}
      className={classes.centerDiv}
      withBorder
    >
      <Text size="lg" fw={500}>
        {t('login.welcome')}
      </Text>

      <Group grow>
        <Button radius={'xl'} variant="light" leftSection={<IconGoogle />}>
          Google
        </Button>
        {/* <Button radius={'xl'} variant="light" leftSection={<IconBrandX />}>
          X
        </Button> */}
      </Group>

      <Divider
        label={t('authForm.continueWithEmail')}
        labelPosition="center"
        my="lg"
      />

      <Stack>
        <Form>
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
            <Button type="submit"> {t('login.login')}</Button>
          </Group>
        </Form>
      </Stack>
    </Paper>
  );
};

export default Login;
