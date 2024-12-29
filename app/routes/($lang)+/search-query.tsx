import { getLanguageCode } from '~/utils';
import { Route } from './+types/search-query';
import { getProducts } from '~/server/api';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const { products } = await getProducts({ languageCode, route: 'home' });

  return { products };
};
