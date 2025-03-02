import { getProducts } from '~/server/api';
import { getLanguageCode, getSearchQuery } from '~/utils';

import { Route } from './+types/search-query';

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const searchQuery = getSearchQuery({ request });

  const { products } = await getProducts({
    languageCode,
    route: 'home',
    searchQuery
  });

  return { products, searchQuery };
};
