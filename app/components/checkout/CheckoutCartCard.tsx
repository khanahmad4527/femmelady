import {
  ActionIcon,
  Box,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { href, Link } from 'react-router';

import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCartCardManager from '~/hooks/useCartCardManager';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { IconMinus, IconPlus, IconX } from '~/icons';
import {
  Cart,
  Product,
  ProductCart,
  ProductColor,
  ProductColorTranslation,
  ProductTranslation
} from '~/types';
import { getSingleTranslation } from '~/utils';

import FetcherError from '../error/FetcherError';
import ManagedImage from '../ManagedImage';
import CurrencyFormatter from '../CurrencyFormatter';

const CheckoutCartCard = ({ cart }: { cart: Cart }) => {
  const { currentLanguage } = useCurrentLanguage();

  const {
    fetcher,
    handleQuantityDec,
    handleQuantityInc,
    quantity,
    disabledIncButton,
    disabledDecButton,
    disabledCancelButton
  } = useCartCardManager({ cart });

  const { hovered, ref } = useHover();

  const product = (getFirstObjectDto(cart?.products) as ProductCart)
    ?.product_id as Product;

  const color = cart?.color as ProductColor;

  const productTranslation = getSingleTranslation(
    product?.translations
  ) as ProductTranslation;

  const colorTranslation = getSingleTranslation(
    color?.translations
  ) as ProductColorTranslation;

  return (
    <Card
      pos={'relative'}
      component={Stack}
      shadow={'sm'}
      padding={'md'}
      withBorder
    >
      <Box
        ref={ref as any}
        component={Link}
        prefetch="intent"
        to={href('/:lang?/products/:slug/reviews', {
          lang: currentLanguage,
          slug: productTranslation?.slug ?? product?.id
        })}
      >
        <ManagedImage
          h={'100%'}
          fit={'contain'}
          id={
            (hovered ? cart.feature_image_2 : cart?.feature_image_1) as string
          }
          alt={productTranslation?.title!}
          loading={'lazy'}
        />
      </Box>

      <Stack>
        <Text fw={500}>{productTranslation?.title}</Text>
        <Text>{colorTranslation?.name}</Text>
        <CurrencyFormatter value={product?.price!} />
        <Group>
          <ActionIcon
            color="black"
            onClick={handleQuantityDec}
            disabled={quantity <= 1}
            loading={disabledDecButton}
          >
            <IconMinus color={'white'} />
          </ActionIcon>
          <ThemeIcon color="black">{quantity}</ThemeIcon>
          <ActionIcon
            color="black"
            onClick={handleQuantityInc}
            disabled={quantity >= 10}
            loading={disabledIncButton}
          >
            <IconPlus color={'white'} />
          </ActionIcon>
        </Group>
      </Stack>

      <ActionIcon
        color={'black'}
        pos={'absolute'}
        mx={'md'}
        right={0}
        loading={disabledCancelButton}
        onClick={() => {
          fetcher.submit(
            { cartId: cart.id, intent: 'cancel' },
            { method: 'POST', action: `/${currentLanguage}/load-carts` }
          );
        }}
      >
        <IconX color={'white'} />
      </ActionIcon>

      <FetcherError fetcher={fetcher} />
    </Card>
  );
};

export default CheckoutCartCard;
