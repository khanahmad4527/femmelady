import { getLanguageCode, getValidLanguageOrRedirect } from '~/utils';
import { Route } from './+types/index';
import { isAuthenticated } from '~/auth/auth.server';
import { href, redirect } from 'react-router';
import { getOrders } from '~/server/api';
import { Order } from '~/types';
import { useLoaderData } from 'react-router';
import { SimpleGrid, Stack, Title } from '@mantine/core';
import commonClasses from '~/styles/Common.module.scss';
import { OrderCard } from '~/components/order/OrderCard';
import NoOrder from '~/components/order/NoOrder';
import useTranslation from '~/hooks/useTranslation';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const { token, isLoggedIn, user } = await isAuthenticated(request);

  const result = getValidLanguageOrRedirect({ params, request, user });

  if (result instanceof Response) {
    return result;
  }

  const currentLanguage = result;

  if (!isLoggedIn) {
    return redirect(href('/:lang?', { lang: currentLanguage }));
  }

  const orders = await getOrders({
    languageCode,
    page: 1,
    limit: 100,
    token: token!
  });

  return { orders };
};

const Orders = () => {
  const { orders } = useLoaderData<{ orders: Order[] }>();
  const t = useTranslation();

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Title>{t('orders.title')}</Title>

      {!orders?.length && <NoOrder />}

      {!!orders?.length && (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          {orders.map(o => (
            <OrderCard key={o.id} order={o} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default Orders;
