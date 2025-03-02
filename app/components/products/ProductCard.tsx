import { Box, Card, Group, Stack, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { memo } from 'react';
import { href, Link, useOutletContext } from 'react-router';

import useCurrentActiveColor from '~/hooks/useCurrentActiveColor';
import useCurrentFeaturedImage from '~/hooks/useCurrentFeaturedImage';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useResponsivePreloadImages from '~/hooks/useResponsivePreloadImages';
import {
  OutletContext,
  Product,
  ProductProductColor,
  ProductTranslation
} from '~/types';
import { getImageUrl, getSingleTranslation } from '~/utils';

import ManagedImage from '../ManagedImage';
import ProductColorSwitcher from './ProductColorSwitcher';
import CurrencyFormatter from '../CurrencyFormatter';

const ProductCard = (product: Product) => {
  const { searchParams, setSearchParams, env } =
    useOutletContext<OutletContext>();

  const { currentLanguage } = useCurrentLanguage();

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

  useResponsivePreloadImages({
    base: [
      getImageUrl({
        id: featureImage1!,
        url: env?.CDN_URL
      }),
      getImageUrl({
        id: featureImage2!,
        url: env?.CDN_URL
      })
    ] as string[]
  });

  return (
    <Card
      pos={'relative'}
      component={Stack}
      shadow={'sm'}
      padding={'md'}
      withBorder
    >
      {/* <ActionIcon
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
      </ActionIcon> */}

      <Box
        ref={ref as any}
        h={300}
        component={Link}
        prefetch="intent"
        to={href('/:lang?/products/:slug/reviews', {
          lang: currentLanguage,
          slug: translation?.slug ?? id
        })}
      >
        <ManagedImage
          h="100%"
          fit={'contain'}
          id={hovered ? featureImage2 : featureImage1}
          alt={translation?.title!}
          loading={'lazy'}
        />
      </Box>

      <Box>
        <Text tt={'capitalize'}>{translation?.title}</Text>
        <CurrencyFormatter value={price!} />
      </Box>

      <Card.Section bg={'primary.1'} inheritPadding pb={4}>
        <Group align={'flex-end'} justify={'space-between'}>
          <Box>
            <ProductColorSwitcher
              activeColor={activeColor}
              setActiveColor={setActiveColor}
              productColors={colors as ProductProductColor[]}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </Box>
          {/* <Box>
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              aria-label="add to cart"
            >
              <IconPlus />
            </ActionIcon>
          </Box> */}
        </Group>
      </Card.Section>
    </Card>
  );
};

export default memo(ProductCard);
