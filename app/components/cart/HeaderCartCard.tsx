import {
  ActionIcon,
  Box,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { Link } from 'react-router';
import { PATHS } from '~/constant';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
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
import {
  buildLocalizedLink,
  formatCurrency,
  getImageUrl,
  getSingleTranslation
} from '~/utils';
import FetcherError from '../FetcherError';
import useCartCardManager from '~/hooks/useCartCardManager';

const HeaderCartCard = ({ cart, close }: { cart: Cart; close: () => void }) => {
  const { hovered, ref } = useHover();
  const { env } = useHeaderFooterContext();
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
            to={buildLocalizedLink({
              baseUrl: env?.APP_URL!,
              currentLanguage,
              paths: [
                PATHS.products,
                productTranslation?.slug ?? product?.id,
                PATHS.reviews
              ],
              queryParams: {
                'force-validate': 'global'
              }
            })}
            onClick={close}
            ref={ref as any}
          >
            <Image
              h={'100%'}
              fit={'contain'}
              src={getImageUrl({
                id: (hovered
                  ? cart.feature_image_2
                  : cart.feature_image_1) as string,
                DIRECTUS_URL: env?.DIRECTUS_URL
              })}
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
            <Text>
              {formatCurrency({
                currentLanguage,
                value: product?.price!
              })}
            </Text>
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
