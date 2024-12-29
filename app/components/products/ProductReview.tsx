import { Pagination, Stack } from '@mantine/core';
import ProductReviewCard from './ProductReviewCard';
import { getPage } from '~/utils';
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

  const isMobile = useMediaQuery('(max-width: 30em)');

  const currentPage = getPage({ searchParams });

  const reviewsPerPage = 8;

  const totalPaginationButtons = Math.floor(totalReviewsCount / reviewsPerPage);

  const handlePagination = (value: number) => {
    searchParams.set(PARAMS.PAGE, String(value));
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Stack>
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
