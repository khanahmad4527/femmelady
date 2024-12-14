import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Group,
  Image,
  Paper,
  Stack,
  Text
} from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';

import { IconHeart, IconPlus } from '~/icons';
import { IProductCard } from '~/types/types';
import { formatCurrency } from '~/utils';
import ProductColorSwitcher from './ProductColorSwitcher';

const ProductCard = (props: IProductCard) => {
  const { name, colors, image } = props;

  const [activeColor, setActiveColor] = useState<
    IProductCard['colors'][number]
  >(colors[0]);
  const { currentLanguage } = useCurrentLanguage();

  const handleActiveColor = (id: string, index: number) => {
    if (id !== activeColor.id) {
      setActiveColor(colors[index]);
    }
  };

  return (
    <Card
      pos={'relative'}
      component={Stack}
      shadow="sm"
      padding={'md'}
      withBorder
    >
      <ActionIcon
        pos={'absolute'}
        top={2}
        right={2}
        variant="transparent"
        aria-label="mark as favorite"
      >
        <IconHeart />
      </ActionIcon>

      <Box h={300} component={Link} to={`/${currentLanguage}/products/123`}>
        <Image
          h={'100%'}
          fit={'contain'}
          src={image}
          alt={name}
          loading={'lazy'}
        />
      </Box>

      <Card.Section bg="primary.1" inheritPadding py={'md'}>
        <Group align={'flex-end'}>
          <Box mr={'auto'}>
            <ProductColorSwitcher colors={colors}/>
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
        <Text>{name}</Text>
        <Text>{formatCurrency(1234.56, 'USD', 'en-US')}</Text>
      </Box>
    </Card>
  );
};

export default ProductCard;
