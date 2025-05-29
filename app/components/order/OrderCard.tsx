import { formatDate, getSingleTranslation } from '~/utils';
import { href } from 'react-router';
import { Order, OrderProduct, Product } from '~/types';
import { Box, Card, Divider, Group, Stack, Text } from '@mantine/core';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { Link } from 'react-router';
import ManagedImage from '~/components/ManagedImage';
import CurrencyFormatter from '~/components/CurrencyFormatter';
import useTranslation from '~/hooks/useTranslation';

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();
  const product = (getFirstObjectDto(order.products) as OrderProduct)
    ?.product_id as Product;
  const translation = getSingleTranslation(product?.translations);

  return (
    <Card withBorder shadow="sm" radius="md" p="md" component={Stack}>
      {!!translation?.title && (
        <Text fw={600} size="lg" tt="capitalize">
          {translation.title}
        </Text>
      )}

      <Box
        component={Link}
        to={href('/:lang?/products/:slug/reviews', {
          lang: currentLanguage,
          slug: translation?.slug ?? product?.id
        })}
        style={{ cursor: 'pointer' }}
      >
        <ManagedImage
          id={product?.feature_image_1 as string}
          alt={translation?.title}
          h={200}
          fit="contain"
        />
      </Box>

      <Stack gap={4}>
        <Group>
          <Text size="sm" c="dimmed">
            {t('orders.orderedOn')}:
          </Text>
          {!!order?.date_created && (
            <Text size="sm">
              {formatDate({ currentLanguage, isoDate: order.date_created })}
            </Text>
          )}
        </Group>

        <Group>
          <Text size="sm" c="dimmed">
            {t('orders.quantity')}:
          </Text>
          <Text>{order.quantity}</Text>
        </Group>

        <Group>
          <Text size="sm" c="dimmed">
            {t('orders.subtotal')}:
          </Text>
          <CurrencyFormatter value={Number(order.subtotal)} />
        </Group>

        <Group>
          <Text size="sm" c="dimmed">
            {t('orders.total')}:
          </Text>
          <CurrencyFormatter value={Number(order.total)} />
        </Group>

        <Group>
          <Text size="sm" c="dimmed">
            {t('orders.paymentMethod')}:
          </Text>
          <Text tt="capitalize">{order.payment_method}</Text>
        </Group>
      </Stack>

      <Divider mt="sm" />

      <Text size="xs" ta="center" c="dimmed">
        {t('orders.orderId')}: {order.id}
      </Text>
    </Card>
  );
};
