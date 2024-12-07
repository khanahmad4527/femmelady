import classes from '~/styles/common.module.css';
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
import { useForm, zodResolver } from '@mantine/form';
import { ActionFunction } from '@remix-run/node';
import { Link, useFetcher, useOutletContext } from '@remix-run/react';
import { useEffect } from 'react';
import { z } from 'zod';
import { loginFormSchema, TLoginFormSchema } from '~/schema';
import { parseZodError } from '~/utils';
import { GoogleIcon, IconBrandX } from '~/icons';
import useTranslation from '~/hooks/useTranslation';
import { validateFormWithTranslations } from '~/server/validateFormWithTranslations';
import { OutletContext, TranslationKeys } from '~/types/types';

export const action: ActionFunction = async ({ request, params }) => {
  const language = (params.lang ?? 'en') as TranslationKeys;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const validatedData = validateFormWithTranslations({
      language,
      schema: loginFormSchema,
      data
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }
};

const login = () => {
  const t = useTranslation();
  const { currentLanguage } = useOutletContext<OutletContext>();
  const fetcher = useFetcher<{ errors: TLoginFormSchema }>();
  const form = useForm<TLoginFormSchema>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: ''
    },

    validate: zodResolver(loginFormSchema(t))
  });

  const serverErrors = fetcher.data?.errors;

  useEffect(() => {
    if (serverErrors) {
      form.setErrors(serverErrors);
    }
  }, [serverErrors]);

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
        <Button radius={'xl'} variant="light" leftSection={<GoogleIcon />}>
          Google
        </Button>
        <Button radius={'xl'} variant="light" leftSection={<IconBrandX />}>
          X
        </Button>
      </Group>

      <Divider
        label={t('authForm.continueWithEmail')}
        labelPosition="center"
        my="lg"
      />

      <fetcher.Form
        method="POST"
        //  onSubmit={submitForm(fetcher, form)}
      >
        <Stack>
          <TextInput
            withAsterisk
            label={t('authForm.email')}
            name={'email'}
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label={t('authForm.password')}
            name={'password'}
            placeholder="Your password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Group justify="space-between">
            <Anchor component={Link} to={`/${currentLanguage}/register`}>
              {t('login.accountRegister')}
            </Anchor>
            <Button type="submit"> {t('login.login')}</Button>
          </Group>
        </Stack>
      </fetcher.Form>
    </Paper>
  );
};

export default login;
