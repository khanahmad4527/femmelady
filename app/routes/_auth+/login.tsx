import { ActionFunction } from '@remix-run/node';
import { z } from 'zod';
import Login from '~/components/Auth/Login';
import { loginFormSchema } from '~/schema';
import { parseZodError } from '~/utils';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const validatedData = loginFormSchema.parse(data);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }
};

const login = () => {
  return <Login />;
};

export default login;
