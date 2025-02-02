import {
  ActionIcon,
  Box,
  Card,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router';
import { PATHS } from '~/constant';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { IconMinus, IconPlus, IconX } from '~/icons';
import {
  Cart,
  Product,
  ProductCart,
  ProductColor,
  ProductColorTranslation,
  ProductTranslation
} from '~/types';
import {
  buildLocalizedLink,
  formatCurrency,
  getImageUrl,
  getSingleTranslation
} from '~/utils';

const CheckoutCartCard = ({ cart }: { cart: Cart }) => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const { setCarts, setCartCount, env } = useHeaderFooterContext();
  const [quantity, setQuantity] = useState(cart?.quantity ?? 1);
  const fetcher = useFetcher();
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

  const fetcherQuantitySubmit = ({
    intent,
    quantity = 0
  }: {
    intent: 'dec' | 'inc';
    quantity?: number;
  }) => {
    fetcher.submit({ quantity, cartId: cart.id, intent }, { method: 'POST' });
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
        to={buildLocalizedLink({
          baseUrl: env?.APP_URL!,
          currentLanguage,
          paths: [
            PATHS.products,
            productTranslation?.slug ?? product?.id,
            PATHS.reviews
          ]
        })}
      >
        <Image
          h={'100%'}
          fit={'contain'}
          src={getImageUrl({
            id: (hovered
              ? cart.feature_image_2
              : cart?.feature_image_1) as string,
            DIRECTUS_URL: env?.DIRECTUS_URL
          })}
          alt={productTranslation?.title!}
          loading={'lazy'}
        />
      </Box>

      <Stack>
        <Text fw={500}>{productTranslation?.title}</Text>
        <Text>{colorTranslation?.name}</Text>
        <Text>
          {formatCurrency({ currentLanguage, value: product?.price! })}
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

      <ActionIcon
        color="black"
        pos={'absolute'}
        mx={'md'}
        right={0}
        loading={disabledCancelButton}
        onClick={() => {
          fetcher.submit(
            { cartId: cart.id, intent: 'cancel' },
            { method: 'POST' }
          );
        }}
      >
        <IconX color="black" />
      </ActionIcon>
    </Card>
  );
};

export default CheckoutCartCard;
