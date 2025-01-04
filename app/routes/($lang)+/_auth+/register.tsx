import {
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

import { ActionFunction, Link, useOutletContext } from 'react-router';
import { z } from 'zod';
import PasswordComponent from '~/components/PasswordComponent';
import { useForm } from '~/hooks/useForm';

import useTranslation from '~/hooks/useTranslation';
import { IconGoogle } from '~/icons';
import { registerFormSchema } from '~/schema';
import classes from '~/styles/Common.module.scss';
import { OutletContext } from '~/types';
import { buildLocalizedLink, parseZodError } from '~/utils';

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  try {
    registerFormSchema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return parseZodError(error);
    }
    throw error;
  }
};

const register = () => {
  const { currentLanguage } = useOutletContext<OutletContext>();

  const t = useTranslation();

  const { Form, form } = useForm({
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
      radius="md"
      p={{ base: 'md', md: 'xl' }}
      w={{ base: '90%', md: '50%' }}
      className={classes.centerDiv}
      withBorder
    >
      <Text size="lg" fw={500}>
        {t('register.welcome')}
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

      <Form>
        <Stack>
          <Group grow>
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
                paths: ['login']
              })}
            >
              {t('register.accountLogin')}
            </Anchor>
            <Button type="submit"> {t('register.register')}</Button>
          </Group>
        </Stack>
      </Form>
    </Paper>
  );
};

export default register;
