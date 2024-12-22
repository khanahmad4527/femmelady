import {
  ActionIcon,
  Box,
  Card,
  Group,
  Image,
  Stack,
  Text
} from '@mantine/core';

import { Link } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';

import { IconHeart, IconPlus } from '~/icons';
import {
  Product,
  ProductColor,
  ProductProductColor,
  ProductTranslation
} from '~/types/types';
import {
  buildLocalizedLink,
  formatCurrency,
  getImageUrl,
  getSingleTranslation
} from '~/utils';
import ProductColorSwitcher from './ProductColorSwitcher';
import { useHover } from '@mantine/hooks';

const ProductCard = (props: Product) => {
  const { hovered, ref } = useHover();

  const { colors, feature_image_1, feature_image_2, translations, price, id } =
    props;

  const translation = getSingleTranslation({
    translations
  }) as ProductTranslation;

  const { currentLanguage } = useCurrentLanguage();

  return (
    <Card
      pos={'relative'}
      component={Stack}
      shadow={'sm'}
      padding={'md'}
      withBorder
    >
      <ActionIcon
        pos={'absolute'}
        m={'md'}
        right={0}
        top={0}
        size={'xl'}
        aria-label="mark as favorite"
        variant="light"
        color="primary"
        radius="xl"
      >
        <IconHeart />
      </ActionIcon>

      <Box
        ref={ref as any}
        h={300}
        component={Link}
        to={buildLocalizedLink({
          currentLanguage,
          primaryPath: 'products',
          secondaryPath: id
        })}
      >
        <Image
          h={'100%'}
          fit={'contain'}
          src={getImageUrl({
            id: (hovered ? feature_image_2 : feature_image_1) as string
          })}
          alt={translation.title!}
          loading={'lazy'}
        />
      </Box>

      <Card.Section bg="primary.1" inheritPadding py={'md'}>
        <Group align={'flex-end'}>
          <Box mr={'auto'}>
            <ProductColorSwitcher
              productColors={colors as ProductProductColor[]}
            />
          </Box>
          <Box ml={'auto'}>
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              aria-label="add to cart"
            >
              <IconPlus />
            </ActionIcon>
          </Box>
        </Group>
      </Card.Section>

      <Box>
        <Text tt={'capitalize'}>{translation?.title}</Text>
        <Text>
          {formatCurrency({ currentLanguage, value: price as number })}
        </Text>
      </Box>
    </Card>
  );
};

export default ProductCard;
