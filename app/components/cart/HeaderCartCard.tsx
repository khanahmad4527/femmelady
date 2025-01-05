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
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import { IconMinus, IconPlus, IconX } from '~/icons';
import {
  Cart,
  Product,
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

const HeaderCartCard = ({ cart }: { cart: Cart }) => {
  const { hovered, ref } = useHover();
  const {} = useHeaderFooterContext();
  const currentLanguage = useCurrentLanguage();

  const product = cart?.product as Product;

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
              currentLanguage,
              paths: [
                'products',
                productTranslation?.slug ?? product?.id,
                'reviews'
              ]
            })}
            ref={ref as any}
          >
            <Image
              h={'100%'}
              fit={'contain'}
              src={getImageUrl({
                id: (hovered
                  ? cart.feature_image_2
                  : cart.feature_image_1) as string
              })}
              alt={productTranslation?.title!}
              loading={'lazy'}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Text tt={'capitalize'}>{productTranslation?.title}</Text>
            <Text tt={'capitalize'}>{colorTranslation?.name}</Text>
            <Text>
              {formatCurrency({ currentLanguage, value: product?.price! })}
            </Text>
            <Group>
              <ActionIcon color="black">
                <IconMinus color={'white'} />
              </ActionIcon>
              <ThemeIcon color="black">{cart.quantity}</ThemeIcon>
              <ActionIcon color="black">
                <IconPlus color={'white'} />
              </ActionIcon>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={2}>
          <ActionIcon color="black">
            <IconX color="black" />
          </ActionIcon>
        </Grid.Col>
      </Grid>

      <Divider size="sm" my="md" color="black" />
    </>
  );
};

export default HeaderCartCard;
