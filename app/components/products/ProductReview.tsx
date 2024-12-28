import { Box, Group, Pagination, Rating, Stack, Text } from '@mantine/core';
import ProductReviewCard from './ProductReviewCard';
import useTranslation from '~/hooks/useTranslation';
import { formatNumber, getPage } from '~/utils';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { useMediaQuery } from '@mantine/hooks';
import { memo } from 'react';
import { useOutletContext } from 'react-router';
import { OutletContext, Review } from '~/types/types';
import { PARAMS } from '~/constant';

const ProductReview = ({
  reviews,
  totalReviewsCount
}: {
  reviews: Review[];
  totalReviewsCount: number;
}) => {
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const isMobile = useMediaQuery('(max-width: 30em)');

  const currentPage = getPage({ searchParams });

  const reviewsPerPage = 8;

  const totalPaginationButtons = Math.ceil(totalReviewsCount / reviewsPerPage);

  const handlePagination = (value: number) => {
    searchParams.set(PARAMS.PAGE, String(value));
    setSearchParams(searchParams);
  };

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
      {reviews?.map(r => (
        <ProductReviewCard key={r.id} review={r} />
      ))}
      <Pagination
        defaultValue={currentPage}
        total={totalPaginationButtons}
        onChange={handlePagination}
        siblings={isMobile ? 0 : 1}
        m={'auto'}
        color="black"
      />
    </Stack>
  );
};

export default memo(ProductReview);
