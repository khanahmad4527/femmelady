import {
  ActionIcon,
  Box,
  Card,
  Group,
  Image,
  Stack,
  Text
} from '@mantine/core';

import { Link, useSearchParams } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';

import { IconHeart, IconPlus } from '~/icons';
import {
  Product,
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
import useCurrentFeaturedImage from '~/hooks/useCurrentFeaturedImage';

import useCurrentActiveColor from '~/hooks/useCurrentActiveColor';
import { memo } from 'react';

const ProductCard = (product: Product) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { hovered, ref } = useHover();

  // Manage the current active color
  const { activeColor, setActiveColor } = useCurrentActiveColor({
    product,
    searchParams
  });

  // Manage the featureImages based on the active color
  const { featureImage1, featureImage2 } = useCurrentFeaturedImage({
    product,
    activeColor
  });

  const { colors, translations, price, id } = product;

  const translation = getSingleTranslation(translations) as ProductTranslation;

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
          secondaryPath: translation?.slug ?? id
        })}
      >
        <Image
          h={'100%'}
          fit={'contain'}
          src={getImageUrl({
            id: hovered ? featureImage2 : featureImage1
          })}
          alt={translation?.title!}
          loading={'lazy'}
        />
      </Box>

      <Box>
        <Text tt={'capitalize'}>{translation?.title}</Text>
        <Text>
          {formatCurrency({ currentLanguage, value: price as number })}
        </Text>
      </Box>

      <Card.Section bg="primary.1" inheritPadding pb={4}>
        <Group align={'flex-end'}>
          <Box mr={'auto'}>
            <ProductColorSwitcher
              activeColor={activeColor}
              setActiveColor={setActiveColor}
              productColors={colors as ProductProductColor[]}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
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
    </Card>
  );
};

export default memo(ProductCard);
