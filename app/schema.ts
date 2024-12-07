import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email' });

export const loginFormSchema = z.object({
  password: z.string(),
  email: emailSchema
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: 'First name should have at least 2 letters' })
      .transform(value => value.trim()),
    last_name: z
      .string()
      .min(2, { message: 'Last name should have at least 2 letters' })
      .transform(value => value.trim()),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .transform(value => value.trim().toLowerCase()),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter'
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter'
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[@$!%*?&#]/, {
        message: 'Password must contain at least one special character'
      })
      .regex(/^\S*$/, { message: 'Password must not contain spaces' }) // No spaces allowed
      .transform(value => value.trim()),
    confirm_password: z.string().transform(value => value.trim()),
    terms: z.string({
      required_error: 'You must accept the terms to proceed.'
    })
  })
  .refine(
    data => data.password.length > 0 && data.confirm_password.length > 0,
    {
      path: ['confirm_password'],
      message: 'Both password and confirm password are required'
    }
  )
  .refine(data => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match'
  });

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
