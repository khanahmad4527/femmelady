import { deleteItem, updateItem, withToken } from '@directus/sdk';

import { isAuthenticated } from '~/auth/auth.server';
import { mutateCartSchema } from '~/schema';
import { getCarts } from '~/server/api';
import { directus } from '~/server/directus';
import { getLanguageCode, getPage } from '~/utils';
import { handleError } from '~/utils/error';

import { Route } from './+types/load-carts';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const { token } = await isAuthenticated(request);
  const page = getPage({ request });

  const carts = await getCarts({ languageCode, page, token: token! });

  return { page: page, carts };
};

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const { token } = await isAuthenticated(request);

    const formData = await request.formData();

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
    return handleError({ error });
  }
};
