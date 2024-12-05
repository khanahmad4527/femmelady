import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email' });

export const loginFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'Name should have at least 2 letters' }),
  email: emailSchema
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;