import { ActionFunction } from '@remix-run/node';
import { z } from 'zod';
import Register from '~/components/Auth/Register';
import { registerFormSchema } from '~/schema';
import { parseZodError } from '~/utils';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const validatedData = registerFormSchema.parse(data);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }
};

const register = () => {
  return <Register />;
};

export default register;
