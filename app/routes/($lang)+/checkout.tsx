import {
  Button,
  Grid,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Title
} from '@mantine/core';
import {
  href,
  Link,
  redirect,
  useLoaderData
} from 'react-router';

import { isAuthenticated } from '~/auth/auth.server';
import NoCart from '~/components/cart/NoCart';
import CheckoutCartCard from '~/components/checkout/CheckoutCartCard';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { getCarts } from '~/server/api';
import commonClasses from '~/styles/Common.module.scss';
import { Cart, ProductCart } from '~/types';
import {
  formatCurrency,
  getLanguageCode,
  getValidLanguageOrRedirect
} from '~/utils';

import { Route } from './+types/checkout';

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

  const carts = await getCarts({
    languageCode,
    page: 1,
    limit: 100,
    token: token!
  });

  return { carts };
};

const Checkout = () => {
  const { carts } = useLoaderData<{ carts: Cart[] }>();
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const totalPrice = carts?.reduce((total, cart) => {
    const products = (cart.products || []) as ProductCart[];
    const cartTotal = products.reduce((productTotal, product) => {
      const price = getFirstObjectDto(product.product_id)?.price;

      if (price == undefined) {
        throw new Error(
          `Price not found for product ID: ${product.product_id}`
        );
      }

      return productTotal + price;
    }, 0);

    if (!cart.quantity) {
      throw new Error(`Quantity not found for cart ID: ${cart.id}`);
    }

    return total + cartTotal * cart.quantity;
  }, 0);

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Title m={'auto'}>{t('checkout.shoppingBag')}</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 9 }}>
          {!carts?.length && <NoCart />}
          {!!carts?.length && (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              {carts.map(c => (
                <CheckoutCartCard key={c.id} cart={c} />
              ))}
            </SimpleGrid>
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Stack>
            <Paper withBorder p={'md'} ta={'center'} fw={500}>
              {t('checkout.summary')}
            </Paper>
            <Table variant="vertical" withTableBorder>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th w={160}>{t('checkout.subTotal')}</Table.Th>
                  <Table.Td>
                    {formatCurrency({ currentLanguage, value: totalPrice })}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>{t('checkout.total')}</Table.Th>
                  <Table.Td>
                    {formatCurrency({ currentLanguage, value: totalPrice })}
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <Button
              color={'black'}
              disabled={!totalPrice}
              component={Link}
              prefetch="intent"
              to={href('/:lang?/payment', { lang: currentLanguage })}
            >
              {t('checkout.pay')}
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Checkout;
