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
import useCurrentFeaturedImage from '~/hooks/useCurrentFeaturedImage';
import { useState } from 'react';
import getStringDto from '~/dto/getStringDto';

const ProductCard = (props: Product) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeColor, setActiveColor] = useState<ProductColor>(
    props.colors?.[0].product_color_id
  );

  const { hovered, ref } = useHover();
  const { featureImage1, featureImage2 } = useCurrentFeaturedImage({
    product: props,
    activeColor
  });

  const { colors, translations, price, id } = props;

  const translation = getSingleTranslation({
    translations
  }) as ProductTranslation;

  const { currentLanguage } = useCurrentLanguage();

  const handleActiveProduct = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('product-id', props.id);
    newSearchParams.set('image-set', getStringDto(activeColor?.image_set)!);
    setSearchParams(newSearchParams, { preventScrollReset: true });
  };

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
            id: hovered ? featureImage2 : featureImage1
          })}
          alt={translation.title!}
          loading={'lazy'}
        />
      </Box>

      <Card.Section bg="primary.1" inheritPadding py={'md'}>
        <Group align={'flex-end'}>
          <Box mr={'auto'} onClick={() => handleActiveProduct()}>
            <ProductColorSwitcher
              activeColor={activeColor}
              setActiveColor={setActiveColor}
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
