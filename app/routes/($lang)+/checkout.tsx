import {
  Button,
  Grid,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Title
} from '@mantine/core';
import CheckoutCartCard from '~/components/checkout/CheckoutCartCard';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';
import { formatCurrency, getLanguageCode, parseZodError } from '~/utils';
import { Route } from './+types/checkout';
import { isAuthenticated } from '~/auth/auth.server';
import { getCarts } from '~/server/api';
import { useLoaderData } from 'react-router';
import { mutateCartSchema } from '~/schema';
import { directus } from '~/server/directus';
import { deleteItem, updateItem, withToken } from '@directus/sdk';
import { z } from 'zod';
import { ProductCart } from '~/types';
import getFirstObjectDto from '~/dto/getFirstObjectDto';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const { token } = await isAuthenticated(request);

  const carts = await getCarts({
    languageCode,
    page: 1,
    limit: 100,
    token: token!
  });

  return { carts };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
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

const Checkout = () => {
  const { carts } = useLoaderData<typeof loader>();
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
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {carts.map(c => (
              <CheckoutCartCard key={c.id} cart={c} />
            ))}
          </SimpleGrid>
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

            <Button color={'black'} disabled>
              {t('checkout.pay')}
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Checkout;
