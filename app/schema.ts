import { z } from 'zod';

const emailSchema = (t: (key: string) => string) =>
  z
    .string()
    .email({ message: t('authFormValidationError.invalidEmail') })
    .transform(value => value.trim().toLowerCase());

const passwordSchema = (t: (key: string) => string) =>
  z
    .string()
    .min(8, { message: t('authFormValidationError.passwordMin') })
    .regex(/[A-Z]/, {
      message: t('authFormValidationError.passwordUppercase')
    })
    .regex(/[a-z]/, {
      message: t('authFormValidationError.passwordLowercase')
    })
    .regex(/[0-9]/, {
      message: t('authFormValidationError.passwordNumber')
    })
    .regex(/[@$!%*?&#]/, {
      message: t('authFormValidationError.passwordSpecial')
    })
    .regex(/^\S*$/, {
      message: t('authFormValidationError.passwordNoSpaces')
    })
    .transform(value => value.trim());

export const loginFormSchema = (t: (key: string) => string) =>
  z.object({
    email: emailSchema(t),
    password: passwordSchema(t)
  });

export type TLoginFormSchema = z.infer<ReturnType<typeof loginFormSchema>>;

export const registerFormSchema = (t: (key: string) => string) =>
  z
    .object({
      first_name: z
        .string()
        .min(2, { message: t('authFormValidationError.firstNameMin') })
        .transform(value => value.trim()),
      last_name: z
        .string()
        .min(2, { message: t('authFormValidationError.lastNameMin') })
        .transform(value => value.trim()),
      email: emailSchema(t),
      password: passwordSchema(t),
      confirm_password: z.string().transform(value => value.trim()),
      terms: z.string({
        required_error: t('authFormValidationError.termsRequired')
      })
    })
    .refine(
      data => data.password.length > 0 && data.confirm_password.length > 0,
      {
        path: ['confirm_password'],
        message: t('authFormValidationError.confirmPasswordRequired')
      }
    )
    .refine(data => data.password === data.confirm_password, {
      path: ['confirm_password'],
      message: t('authFormValidationError.passwordMismatch')
    });

export type TRegisterFormSchema = z.infer<
  ReturnType<typeof registerFormSchema>
>;
