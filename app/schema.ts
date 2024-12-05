import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email' });

export const loginFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'First name should have at least 2 letters' }),
  email: emailSchema
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: 'First name should have at least 2 letters' }),
    last_name: z
      .string()
      .min(2, { message: 'Last name should have at least 2 letters' }),
    email: emailSchema,
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
      }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // Error path
    message: 'Passwords do not match'
  });

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
