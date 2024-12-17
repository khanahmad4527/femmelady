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
import { IProductCard } from '~/types/types';
import { buildLocalizedLink, formatCurrency } from '~/utils';
import ProductColorSwitcher from './ProductColorSwitcher';

const ProductCard = (props: IProductCard) => {
  const { name, colors, image } = props;

  const { currentLanguage } = useCurrentLanguage();

  const topRightSpacing = 5;

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
        top={topRightSpacing}
        right={topRightSpacing}
        size={'xl'}
        aria-label="mark as favorite"
        variant="light"
        color="primary"
        radius="xl"
      >
        <IconHeart />
      </ActionIcon>

      <Box
        h={300}
        component={Link}
        to={buildLocalizedLink({
          currentLanguage,
          primaryPath: 'products',
          secondaryPath: '123'
        })}
      >
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
            <ProductColorSwitcher colors={colors} />
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
        <Text>{formatCurrency({ currentLanguage, value: 1234.56 })}</Text>
      </Box>
    </Card>
  );
};

export default ProductCard;
