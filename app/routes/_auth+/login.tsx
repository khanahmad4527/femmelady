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
import { Link, useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { z } from 'zod';
import { PRODUCT_NAME } from '~/constant';
import { loginFormSchema, TLoginFormSchema } from '~/schema';
import { parseZodError } from '~/utils';
import { GoogleIcon, XIcon } from '~/icons';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const validatedData = loginFormSchema.parse(data);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }
};

const login = () => {
  const fetcher = useFetcher<{ errors: TLoginFormSchema }>();
  const form = useForm<TLoginFormSchema>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: ''
    },

    validate: zodResolver(loginFormSchema)
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
        Welcome to {PRODUCT_NAME}, Login with
      </Text>

      <Group grow>
        <Button radius={'xl'} variant="light" leftSection={<GoogleIcon />}>
          Google
        </Button>
        <Button radius={'xl'} variant="light" leftSection={<XIcon />}>
          X
        </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <fetcher.Form
        method="POST"
        //  onSubmit={submitForm(fetcher, form)}
      >
        <Stack>
          <TextInput
            withAsterisk
            label="Email"
            name={'email'}
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label="Password"
            name={'password'}
            placeholder="Your password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Group justify="space-between">
            <Anchor component={Link} to={'/register'}>
              Don't have an account? Register
            </Anchor>
            <Button type="submit">Login</Button>
          </Group>
        </Stack>
      </fetcher.Form>
    </Paper>
  );
};

export default login;
