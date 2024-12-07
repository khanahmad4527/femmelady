import classes from '~/styles/common.module.css';
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useForm, UseFormReturnType, zodResolver } from '@mantine/form';
import { ActionFunction } from '@remix-run/node';
import { Link, useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { PRODUCT_NAME } from '~/constant';
import { GoogleIcon, IconCheck, IconX, XIcon } from '~/icons';
import { registerFormSchema, TRegisterFormSchema } from '~/schema';
import { parseZodError } from '~/utils';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log({ formData });
  const data = Object.fromEntries(formData);
  try {
    const validatedData = registerFormSchema.parse(data);

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
  const fetcher = useFetcher<{ errors: TRegisterFormSchema }>();
  const form = useForm<TRegisterFormSchema>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
      terms: 'on'
    },

    validate: zodResolver(registerFormSchema)
  });

  const serverErrors = fetcher.data?.errors;

  useEffect(() => {
    if (serverErrors) {
      console.log({ serverErrors });
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
        // onSubmit={submitForm(fetcher, form)}
      >
        <Stack>
          <Group grow>
            <TextInput
              withAsterisk
              label="First name"
              name="first_name"
              placeholder="Ahmad"
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />

            <TextInput
              label="Last name"
              name="last_name"
              placeholder="Khan"
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
            />
          </Group>

          <TextInput
            withAsterisk
            label="Email"
            name="email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <Password form={form} minLength={8} />

          <PasswordInput
            withAsterisk
            label="Confirm Password"
            name="confirm_password"
            placeholder="Confirm Password"
            key={form.key('confirm_password')}
            {...form.getInputProps('confirm_password')}
          />

          <Checkbox
            name="terms"
            key={form.key('terms')}
            {...form.getInputProps('terms', { type: 'checkbox' })}
            label="I accept terms and conditions"
          />

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

export default register;

const Password = ({
  form,
  minLength
}: {
  form: UseFormReturnType<TRegisterFormSchema>;
  minLength: number;
}) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value, minLength);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Password"
            value={value}
            key={form.key('password')}
            {...form.getInputProps('password')}
            onChange={event => setValue(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label={`Includes at least ${minLength} characters`}
          meets={value.length >= minLength}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
};

const PasswordRequirement = ({
  meets,
  label
}: {
  meets: boolean;
  label: string;
}) => {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}{' '}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  { re: /^\S*$/, label: 'No spaces allowed' }
];

const getStrength = (password: string, minLength: number) => {
  let multiplier = password.length >= minLength ? 0 : 1;

  requirements.forEach(requirement => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};
