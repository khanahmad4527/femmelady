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
import { useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router';
import { PARAMS, PATHS } from '~/constant';
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

const HeaderCartCard = ({ cart, close }: { cart: Cart; close: () => void }) => {
  const { hovered, ref } = useHover();
  const { setCarts, setCartCount, env } = useHeaderFooterContext();
  const { currentLanguage } = useCurrentLanguage();
  const [quantity, setQuantity] = useState(cart?.quantity ?? 1);
  const fetcher = useFetcher<{ success: boolean }>();
  const product = (getFirstObjectDto(cart?.products) as ProductCart)
    .product_id as Product;

  const color = cart?.color as ProductColor;

  const productTranslation = getSingleTranslation(
    product.translations
  ) as ProductTranslation;

  const colorTranslation = getSingleTranslation(
    color.translations
  ) as ProductColorTranslation;

  const fetcherQuantitySubmit = ({
    intent,
    quantity = 0
  }: {
    intent: 'dec' | 'inc';
    quantity?: number;
  }) => {
    fetcher.submit(
      { quantity, cartId: cart.id, intent },
      { method: 'POST', action: `/${currentLanguage}/load-carts` }
    );
  };

  const handleQuantityDec = () => {
    const newQuantity = quantity - 1;
    fetcherQuantitySubmit({ intent: 'dec', quantity: newQuantity });
    setQuantity(newQuantity);
  };

  const handleQuantityInc = () => {
    const newQuantity = quantity + 1;
    fetcherQuantitySubmit({ intent: 'inc', quantity: newQuantity });
    setQuantity(newQuantity);
  };

  let disabledIncButton = false;
  let disabledDecButton = false;
  let disabledCancelButton = false;

  if (fetcher?.formData) {
    const intent = fetcher?.formData.get('intent');

    if (intent === 'inc') {
      disabledIncButton = true;
    }

    if (intent === 'dec') {
      disabledDecButton = true;
    }

    if (intent === 'cancel') {
      disabledCancelButton = true;
    }
  }

  const isCanceling = Boolean(
    fetcher.data?.success && fetcher?.formData?.get('intent') === 'cancel'
  );

  useEffect(() => {
    if (isCanceling) {
      setCarts(prev => prev.filter(p => p.id !== cart.id));
      setCartCount(prev => prev - 1);
    }
  }, [isCanceling]);

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
            color="black"
            loading={disabledCancelButton}
            onClick={() => {
              fetcher.submit(
                { cartId: cart.id, intent: 'cancel' },
                { method: 'POST', action: `/${currentLanguage}/load-carts` }
              );
            }}
          >
            <IconX color="black" />
          </ActionIcon>
        </Grid.Col>
      </Grid>

      <Divider size="sm" my="md" color="black" />
    </>
  );
};

export default HeaderCartCard;
