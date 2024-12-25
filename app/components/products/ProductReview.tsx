import { Box, Group, Pagination, Rating, Stack, Text } from '@mantine/core';
import ProductReviewCard from './ProductReviewCard';
import useTranslation from '~/hooks/useTranslation';
import { formatNumber } from '~/utils';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { useMediaQuery } from '@mantine/hooks';
import { memo } from 'react';

const ProductReview = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const isMobile = useMediaQuery('(max-width: 30em)');

  return (
    <Stack>
      <Box py={{ base: 'md', md: 'xl' }}>
        <Group>
          <Text fz={20} fw={500} span>
            {formatNumber({ currentLanguage, number: 4.4 })}
          </Text>
          <Rating value={3.7} fractions={10} color={'black'} readOnly />
        </Group>

        <Text>
          {t('products.reviews', {
            number: (
              <Text span>{formatNumber({ currentLanguage, number: 14 })}</Text>
            )
          })}
        </Text>
      </Box>
      {new Array(10).fill('*').map(r => (
        <ProductReviewCard />
      ))}
      <Pagination
        siblings={isMobile ? 0 : 1}
        total={10}
        m={'auto'}
        color="black"
      />
    </Stack>
  );
};

export default memo(ProductReview);
