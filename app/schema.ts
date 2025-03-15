import { z } from 'zod';

const normalizeEmail = (email: string): string => {
  let [localPart, domain] = email.toLowerCase().split('@');

  if (['gmail.com', 'googlemail.com'].includes(domain)) {
    // Gmail: Remove dots & `+` aliases
    localPart = localPart.split('+')[0].replace(/\./g, '');
  } else if (
    ['outlook.com', 'hotmail.com', 'icloud.com', 'protonmail.com'].includes(
      domain
    )
  ) {
    // Other providers: Only remove `+` aliases
    localPart = localPart.split('+')[0];
  }

  return `${localPart}@${domain}`;
};

const emailSchema = z
  .string()
  .email({ message: 'authFormValidationError.invalidEmail' })
  .transform(value => normalizeEmail(value.trim().toLowerCase()));

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

const cfTurnstileResponseSchema = z
  .string({ required_error: 'turnstile.errorDescription' })
  .min(1, { message: 'turnstile.errorDescription' });

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  'cf-turnstile-response': cfTurnstileResponseSchema
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
    }),
    'cf-turnstile-response': cfTurnstileResponseSchema
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

export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
  'cf-turnstile-response': cfTurnstileResponseSchema
});

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirm_password: z.string().transform(value => value.trim()),
    'cf-turnstile-response': cfTurnstileResponseSchema
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
  cartId: z
    .string({ required_error: 'cart.errors.cartIdRequired' })
    .uuid('cart.errors.cartIdInvalid'),
  productId: z
    .string({ required_error: 'cart.errors.productIdRequired' })
    .uuid('cart.errors.productIdInvalid'),
  sizeId: z
    .string({ required_error: 'cart.errors.sizeIdRequired' })
    .uuid('cart.errors.sizeIdInvalid'),
  colorId: z
    .string({ required_error: 'cart.errors.colorIdRequired' })
    .uuid('cart.errors.colorIdInvalid'),
  featureImage1Id: z
    .string({ required_error: 'cart.errors.featureImage1IdRequired' })
    .uuid('cart.errors.featureImage1IdInvalid'),
  featureImage2Id: z
    .string({ required_error: 'cart.errors.featureImage2IdRequired' })
    .uuid('cart.errors.featureImage2IdInvalid'),
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

export const mutateCartSchema = z.object({
  cartId: z
    .string({ required_error: 'cart.errors.cartIdRequired' })
    .uuid('cart.errors.cartIdInvalid'),
  quantity: z
    .string()
    .optional()
    .refine(
      value => value === undefined || !isNaN(Number(value)),
      'cart.errors.quantityInvalidNumber'
    )
    .transform(value => (value === undefined ? undefined : Number(value)))
    .refine(
      value => value === undefined || Number.isInteger(value),
      'cart.errors.quantityNotInteger'
    )
    .refine(
      value => value === undefined || (value >= 1 && value <= 10),
      'cart.errors.quantityOutOfRange'
    ),
  intent: z.enum(['inc', 'dec', 'cancel'], {
    required_error: 'cart.errors.intentRequired'
  })
});

const months = Array.from({ length: 12 }, (_, index) => {
  const date = new Date(0, index); // Month 0 = January
  return date.toLocaleString('default', { month: 'long' }).toLowerCase();
});

export const paymentFormSchema = z.object({
  cardNumber: z
    .string({ required_error: 'payment.errors.cardNumberRequired' })
    .regex(/^[0-9]{13,19}$/, 'payment.errors.cardNumberInvalid'),

  cvv: z
    .string({ required_error: 'payment.errors.cvvRequired' })
    .regex(/^[0-9]{3,4}$/, 'payment.errors.cvvInvalid'),

  cardHolderName: z.string(),

  expiryMonth: z
    .string({ required_error: 'payment.errors.expiryMonthRequired' })
    .refine(
      value => months.includes(value),
      'payment.errors.expiryMonthInvalid'
    ),

  expiryYear: z
    .string({ required_error: 'payment.errors.expiryYearRequired' })
    .regex(/^\d{4}$/, 'payment.errors.expiryYearInvalidFormat')
    .refine(
      year => parseInt(year) >= new Date().getFullYear(),
      'payment.errors.expiryYearInPast'
    )
});

// Define the schema for required environment variables
export const envSchema = z.object({
  DIRECTUS_URL: z.string().url('DIRECTUS_URL must be a valid URL.'),
  APP_URL: z.string().url('APP_URL must be a valid URL.'),
  EXCHANGE_RATE_API_URL: z
    .string()
    .url('EXCHANGE_RATE_API_URL must be a valid URL.'),
  APP_DOMAIN: z.string().min(1, 'APP_DOMAIN is required.'),
  DIRECTUS_DOMAIN: z.string().min(1, 'DIRECTUS_DOMAIN is required.'),
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters long.'),
  REDIS_URL: z.string().url('REDIS_URL must be a valid URL.'),
  TURNSTILE_SECRET_KEY: z.string().min(1, 'TURNSTILE_SECRET_KEY is required.'),
  TURNSTILE_SITE_KEY: z.string().min(1, 'TURNSTILE_SITE_KEY is required.'),
  CDN_URL: z.string().url('CDN_URL must be a valid URL.'),
  NODE_ENV: z.enum(['development', 'production', 'test'])
});
