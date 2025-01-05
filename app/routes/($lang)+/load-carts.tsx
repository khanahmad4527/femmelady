import { getLanguageCode, getPage } from '~/utils';
import { getCarts } from '~/server/api';
import { Route } from './+types/load-carts';
import { isAuthenticated } from '~/auth/auth.server';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const { token } = await isAuthenticated(request);
  const page = getPage({ request });

  const carts = await getCarts({ languageCode, page, token: token! });

  return { page: page, carts };
};
