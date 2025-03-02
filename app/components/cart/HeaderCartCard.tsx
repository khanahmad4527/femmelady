import {
  ActionIcon,
  Box,
  Divider,
  Grid,
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
  ProductSize,
  ProductTranslation
} from '~/types';
import { buildLocalizedLink, getSingleTranslation } from '~/utils';

import FetcherError from '../error/FetcherError';
import ManagedImage from '../ManagedImage';
import CurrencyFormatter from '../CurrencyFormatter';

const HeaderCartCard = ({ cart, close }: { cart: Cart; close: () => void }) => {
  const { hovered, ref } = useHover();
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

  const product = (getFirstObjectDto(cart?.products) as ProductCart)
    .product_id as Product;

  const color = cart?.color as ProductColor;

  const productTranslation = getSingleTranslation(
    product.translations
  ) as ProductTranslation;

  const colorTranslation = getSingleTranslation(
    color.translations
  ) as ProductColorTranslation;

  return (
    <>
      <Grid align="self-start">
        <Grid.Col span={4}>
          <Box
            component={Link}
            prefetch="intent"
            to={buildLocalizedLink({
              url: href('/:lang?/products/:slug/reviews', {
                lang: currentLanguage,
                slug: productTranslation?.slug ?? product?.id
              }),
              queryParams: {
                'force-validate': 'global'
              }
            })}
            onClick={close}
            ref={ref as any}
          >
            <ManagedImage
              h={'100%'}
              fit={'contain'}
              id={
                (hovered
                  ? cart.feature_image_2
                  : cart.feature_image_1) as string
              }
              alt={productTranslation?.title!}
              loading={'lazy'}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Text tt={'capitalize'}>
              {productTranslation?.title} -{' '}
              <Text span>
                {(cart?.size as ProductSize)?.size?.toLocaleUpperCase()}
              </Text>
            </Text>
            <Text tt={'capitalize'}>{colorTranslation?.name}</Text>
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
        </Grid.Col>
        <Grid.Col span={2}>
          <ActionIcon
            color={'black'}
            loading={disabledCancelButton}
            onClick={() => {
              fetcher.submit(
                { cartId: cart.id, intent: 'cancel' },
                { method: 'POST', action: `/${currentLanguage}/load-carts` }
              );
            }}
          >
            <IconX color="white" />
          </ActionIcon>
        </Grid.Col>
      </Grid>

      <FetcherError fetcher={fetcher} />

      <Divider size="sm" my="md" color="black" />
    </>
  );
};

export default HeaderCartCard;
