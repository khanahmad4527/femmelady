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
import { useEffect, useState } from 'react';
import {
  ActionFunction,
  Link,
  useFetcher,
  useOutletContext
} from 'react-router';
import { z } from 'zod';

import useTranslation from '~/hooks/useTranslation';
import { IconBrandX, IconCheck, IconGoogle, IconX } from '~/icons';
import { registerFormSchema, TRegisterFormSchema } from '~/schema';
import { validateFormWithTranslations } from '~/server/validateFormWithTranslations';
import classes from '~/styles/Common.module.scss';
import { OutletContext, TranslationKeys } from '~/types/types';
import { buildLocalizedLink, parseZodError } from '~/utils';

export const action: ActionFunction = async ({ request, params }) => {
  const language = (params.lang ?? 'en') as TranslationKeys;
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  try {
    const validatedData = validateFormWithTranslations({
      language,
      schema: registerFormSchema,
      data
    });

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

    validate: zodResolver(registerFormSchema(t as any))
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
        {t('register.welcome')}
      </Text>

      <Group grow>
        <Button radius={'xl'} variant="light" leftSection={<IconGoogle />}>
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
        // onSubmit={submitForm(fetcher, form)}
      >
        <Stack>
          <Group grow>
            <TextInput
              withAsterisk
              label={t('authForm.firstName')}
              name="first_name"
              placeholder="Ahmad"
              key={form.key('first_name')}
              {...form.getInputProps('first_name')}
            />

            <TextInput
              label={t('authForm.lastName')}
              name="last_name"
              placeholder="Khan"
              key={form.key('last_name')}
              {...form.getInputProps('last_name')}
            />
          </Group>

          <TextInput
            withAsterisk
            label={t('authForm.email')}
            name="email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <Password form={form} minLength={8} />

          <PasswordInput
            withAsterisk
            label={t('authForm.confirmPassword')}
            name="confirm_password"
            placeholder="Confirm Password"
            key={form.key('confirm_password')}
            {...form.getInputProps('confirm_password')}
          />

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
                primaryPath: 'login'
              })}
            >
              {t('register.accountLogin')}
            </Anchor>
            <Button type="submit"> {t('register.register')}</Button>
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
  const t = useTranslation();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');

  const requirements = [
    { re: /[0-9]/, label: t('register.includesNumber') },
    { re: /[a-z]/, label: t('register.includesLowercaseLetter') },
    { re: /[A-Z]/, label: t('register.includesUppercaseLetter') },
    {
      re: /[$&+,:;=?@#|'<>.^*()%!-]/,
      label: t('register.includesSpecialSymbol')
    },
    { re: /^\S*$/, label: t('register.noSpacesAllowed') }
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

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label as string}
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
            label={t('authForm.password')}
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
          label={t('register.includes8Char')}
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
