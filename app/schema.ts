import { z } from 'zod';

const emailSchema = z
  .string()
  .email({ message: 'authFormValidationError.invalidEmail' })
  .transform(value => value.trim().toLowerCase());

const passwordSchema = z
  .string()
  .min(8, { message: 'authFormValidationError.passwordMin' })
  .regex(/[A-Z]/, {
    message: 'authFormValidationError.passwordUppercase'
  })
  .regex(/[a-z]/, {
    message: 'authFormValidationError.passwordLowercase'
  })
  .regex(/[0-9]/, {
    message: 'authFormValidationError.passwordNumber'
  })
  .regex(/[@$!%*?&#]/, {
    message: 'authFormValidationError.passwordSpecial'
  })
  .regex(/^\S*$/, {
    message: 'authFormValidationError.passwordNoSpaces'
  })
  .transform(value => value.trim());

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const registerFormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: 'authFormValidationError.firstNameMin' })
      .transform(value => value.trim()),
    last_name: z
      .string()
      .min(2, { message: 'authFormValidationError.lastNameMin' })
      .transform(value => value.trim()),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: z.string().transform(value => value.trim()),
    terms: z.string({
      required_error: 'authFormValidationError.termsRequired'
    })
  })
  .refine(
    data => data.password.length > 0 && data.confirm_password.length > 0,
    {
      path: ['confirm_password'],
      message: 'authFormValidationError.confirmPasswordRequired'
    }
  )
  .refine(data => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'authFormValidationError.passwordMismatch'
  });

export const addToCartSchema = z.object({
  productId: z
    .string({ required_error: 'cart.errors.productIdRequired' })
    .uuid('cart.errors.productIdInvalid'),
  sizeId: z
    .string({ required_error: 'cart.errors.sizeIdRequired' })
    .uuid('cart.errors.sizeIdInvalid'),
  colorId: z
    .string({ required_error: 'cart.errors.colorIdRequired' })
    .uuid('cart.errors.colorIdInvalid'),
  quantity: z
    .string({ required_error: 'cart.errors.quantityRequired' })
    .refine(value => !isNaN(Number(value)), 'cart.errors.quantityInvalidNumber')
    .transform(value => Number(value))
    .refine(value => Number.isInteger(value), 'cart.errors.quantityNotInteger')
    .refine(
      value => value >= 1 && value <= 10,
      'cart.errors.quantityOutOfRange'
    )
});
