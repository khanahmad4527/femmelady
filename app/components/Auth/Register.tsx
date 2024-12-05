import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
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
import { registerFormSchema, TRegisterFormSchema } from '~/schema';
import classes from '~/styles/common.module.css';
import { submitForm } from '~/utils';

const Register = () => {
  const fetcher = useFetcher<{ errors: TRegisterFormSchema }>();
  const form = useForm<TRegisterFormSchema>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPassword: ''
    },

    validate: zodResolver(registerFormSchema)
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
        Welcome to {PRODUCT_NAME}, Register with
      </Text>

      <Group grow>
        <Button leftSection={<GoogleIcon />}>Google</Button>
        <Button leftSection={<XIcon />}>X</Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <fetcher.Form method="POST" onSubmit={submitForm(fetcher, form)}>
        <Stack>
          <Group grow>
            <TextInput
              withAsterisk
              label="First name"
              placeholder="Ahmad"
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />

            <TextInput
              label="Last name"
              placeholder="Khan"
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
            />
          </Group>

          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Checkbox label="I accept terms and conditions" />

          <Group justify="space-between">
            <Anchor component={Link} to={'/login'}>
              Already have an account? Login
            </Anchor>
            <Button type="submit">Register</Button>
          </Group>
        </Stack>
      </fetcher.Form>
    </Paper>
  );
};

export default Register;
