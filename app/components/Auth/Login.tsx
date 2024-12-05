import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Link, useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import GoogleIcon from '~/components/GoogleIcon';
import XIcon from '~/components/XIcon';
import { PRODUCT_NAME } from '~/constant';
import { loginFormSchema, TLoginFormSchema } from '~/schema';
import classes from '~/styles/common.module.css';
import { submitForm } from '~/utils';

const Login = () => {
  const fetcher = useFetcher<{ errors: TLoginFormSchema }>();
  const form = useForm<TLoginFormSchema>({
    mode: 'uncontrolled',
    initialValues: {
      email: 'khan@khan.com',
      first_name: 'ASDF'
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
        <Button leftSection={<GoogleIcon />}>Google</Button>
        <Button leftSection={<XIcon />}>X</Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <fetcher.Form method="POST" onSubmit={submitForm(fetcher, form)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            label="First name"
            placeholder="Ahmad"
            key={form.key('first_name')}
            {...form.getInputProps('first_name')}
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

export default Login;
