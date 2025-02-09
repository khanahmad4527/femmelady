import { Box, PasswordInput, Popover, Progress, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useState } from 'react';
import useTranslation from '~/hooks/useTranslation';
import { IconCheck, IconX } from '~/icons';

const PasswordComponent = ({ form }: { form: UseFormReturnType<any> }) => {
  const t = useTranslation();
  return (
    <>
      <Password form={form} minLength={8} />

      <PasswordInput
        withAsterisk
        label={t('authForm.confirmPassword')}
        name="confirm_password"
        placeholder="********"
        key={form.key('confirm_password')}
        {...form.getInputProps('confirm_password')}
      />
    </>
  );
};

export default PasswordComponent;

const Password = ({
  form,
  minLength
}: {
  form: UseFormReturnType<any>;
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
            radius={0}
            label={t('authForm.password')}
            name="password"
            placeholder="********"
            value={form.values.password} // Use form's value
            key={form.key('password')}
            {...form.getInputProps('password')} // Spread other form props
            onChange={event => {
              const inputValue = event.currentTarget.value;
              form.setFieldValue('password', inputValue); // Update the form's value
              setValue(inputValue); // Update the local state for strength calculation
            }}
            withAsterisk
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
