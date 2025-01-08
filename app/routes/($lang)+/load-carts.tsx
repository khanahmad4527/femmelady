import { getLanguageCode, getPage, parseZodError } from '~/utils';
import { getCarts } from '~/server/api';
import { Route } from './+types/load-carts';
import { isAuthenticated } from '~/auth/auth.server';
import { z } from 'zod';
import { mutateCartSchema } from '~/schema';
import { directus } from '~/server/directus';
import { deleteItem, updateItem, withToken } from '@directus/sdk';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const { token } = await isAuthenticated(request);
  const page = getPage({ request });

  const carts = await getCarts({ languageCode, page, token: token! });

  return { page: page, carts };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { token } = await isAuthenticated(request);

  const formData = await request.formData();

  try {
    const { cartId, intent, quantity } = mutateCartSchema.parse(
      Object.fromEntries(formData)
    );

    if (intent === 'inc') {
      await directus.request(
        withToken(
          token!,
          updateItem('cart', cartId, {
            quantity
          })
        )
      );
    }

    if (intent === 'dec') {
      await directus.request(
        withToken(
          token!,
          updateItem('cart', cartId, {
            quantity
          })
        )
      );
    }

    if (intent === 'cancel') {
      await directus.request(withToken(token!, deleteItem('cart', cartId)));
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    console.error('Something went wrong', error);
    throw error;
  }
};
