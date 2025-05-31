import { getSingleOrderPageMeta } from '~/meta';
import { Route } from './+types/$id';
import {
  Order,
  OrderProduct,
  OutletContext,
  Product,
  TranslationKeys
} from '~/types';
import {
  formatDate,
  getLanguageCode,
  getSingleTranslation,
  getValidLanguageOrRedirect
} from '~/utils';
import { isAuthenticated } from '~/auth/auth.server';
import { redirect, useOutletContext, useSearchParams } from 'react-router';
import { href } from 'react-router';
import { getSingleOrder } from '~/server/api';
import { useLoaderData } from 'react-router';
import useTranslation from '~/hooks/useTranslation';
import {
  Alert,
  Badge,
  Divider,
  Group,
  Stack,
  Text,
  Title
} from '@mantine/core';
import CurrencyFormatter from '~/components/CurrencyFormatter';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import ManagedImage from '~/components/ManagedImage';

export const meta = ({ data, params }: Route.MetaArgs) => {
  return getSingleOrderPageMeta({
    language: params.lang as TranslationKeys,
    order: data?.order as Order
  });
};

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

  const order = await getSingleOrder({
    id: params.id!,
    languageCode,
    token: token!
  });

  return { order };
};

const SingleOrder = () => {
  const { currentLanguage } = useOutletContext<OutletContext>();
  const { order } = useLoaderData<{ order: Order }>();
  const t = useTranslation();
  const [searchParams] = useSearchParams();

  const showThankYouMessage = !!searchParams.get('thank-you');

  const product = (getFirstObjectDto(order?.products) as OrderProduct)
    ?.product_id as Product;
  const productTranslation = getSingleTranslation(product?.translations);

  return (
    <Stack gap="xl">
      {!!showThankYouMessage && (
        <Alert variant="light" color="green" title={t('cart.thankYouTitle')}>
          {t('cart.thankYouMessage')}
        </Alert>
      )}

      <Stack gap="xs">
        {!!order?.id && <Title order={2}>#{order.id}</Title>}

        {!!order?.date_created! && (
          <Text size="sm" c="dimmed">
            {t('orders.orderedOn')}:{' '}
            {formatDate({ currentLanguage, isoDate: order.date_created })}
          </Text>
        )}

        <Group gap="xs">
          {!!order?.payment_method && (
            <Badge color="blue" variant="light">
              {t('orders.paymentMethod')}: {order.payment_method.toUpperCase()}
            </Badge>
          )}

          {!!order?.quantity && (
            <Badge color="green" variant="light">
              {t('orders.quantity')}: {order.quantity}
            </Badge>
          )}
        </Group>
      </Stack>

      <Group key={product.id} align="flex-start" gap="md" wrap="nowrap">
        <ManagedImage
          id={product?.feature_image_1 as string}
          alt={productTranslation?.title}
          h={200}
          fit="contain"
        />

        <Stack gap={4} style={{ flex: 1 }}>
          {!!productTranslation?.title && (
            <Text fw={600} size="lg" tt="capitalize">
              {productTranslation.title}
            </Text>
          )}

          {!!productTranslation?.description && (
            <Text
              size="sm"
              dangerouslySetInnerHTML={{
                __html: productTranslation.description
              }}
            />
          )}
        </Stack>
      </Group>

      <Stack gap={4}>
        {order?.full_name && (
          <Text>
            <strong>{t('payment.fullName')}:</strong> {order.full_name}
          </Text>
        )}
        {order?.email && (
          <Text>
            <strong>{t('payment.email')}:</strong> {order.email}
          </Text>
        )}
        {order?.phone_number && (
          <Text>
            <strong>{t('payment.phoneNumber')}:</strong> {order.phone_number}
          </Text>
        )}
        {order?.address && (
          <Text>
            <strong>{t('payment.address')}:</strong> {order.address},{' '}
            {order?.city}, {order?.state} {order?.zip_code}
          </Text>
        )}
      </Stack>

      <Divider />

      <Group>
        {!!order?.total && (
          <Text>
            <strong>{t('checkout.subTotal')}:</strong>{' '}
            <CurrencyFormatter value={Number(order.subtotal)} />
          </Text>
        )}

        {!!order?.paid_amount && (
          <Text>
            <strong>{t('checkout.total')}:</strong>{' '}
            <CurrencyFormatter value={Number(order.total)} />
          </Text>
        )}
      </Group>
    </Stack>
  );
};

export default SingleOrder;
