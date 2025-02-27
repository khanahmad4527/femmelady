import { Route } from './+types/$slug.reviews';
import {
  getLanguageCode,
  getLimit,
  getPage,
  shouldRevalidateLogic
} from '~/utils';
import {
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext
} from 'react-router';
import { getReviews } from '~/server/api';
import { OutletContext, Review } from '~/types';
import {
  DEFAULT_PRODUCT_LIMIT,
  FORCE_REVALIDATE_MAP,
  PARAM_KEYS
} from '~/constant';
import ProductReviewCard from '~/components/products/ProductReviewCard';
import LocalizedPagination from '~/components/LocalizedPagination';
import { useMediaQuery } from '@mantine/hooks';
import { Stack } from '@mantine/core';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  nextUrl,
  currentUrl
}) => {
  // Use shared logic
  const commonResult = shouldRevalidateLogic(nextUrl, currentUrl);

  if (commonResult) {
    return true; // If shared logic already decided to revalidate, no need to check further
  }

  const forceValidate = nextUrl.searchParams.get(PARAM_KEYS.FORCE_REVALIDATE);

  if (forceValidate === FORCE_REVALIDATE_MAP.PRODUCT_REVIEW) {
    return true;
  }

  return false;
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);
  const productSlug = params?.slug;

  const reviewsPerPage = getLimit({ request });

  const currentPage = getPage({ request });

  const reviews = await getReviews({
    languageCode,
    slug: productSlug,
    currentPage,
    reviewsPerPage
  });

  return { reviews };
};

const Reviews = () => {
  const { totalReviewsCount } = useOutletContext<
    OutletContext & { totalReviewsCount: number }
  >();
  const { reviews } = useLoaderData<{ reviews: Review[] }>();

  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const isMobile = useMediaQuery('(max-width: 30em)');

  const currentPage = getPage({ searchParams });

  const reviewsPerPage = DEFAULT_PRODUCT_LIMIT;

  const totalPaginationButtons = Math.ceil(totalReviewsCount / reviewsPerPage);

  const handlePagination = (value: number) => {
    searchParams.set(PARAM_KEYS.PAGE, String(value));
    searchParams.set(
      PARAM_KEYS.FORCE_REVALIDATE,
      FORCE_REVALIDATE_MAP.PRODUCT_REVIEW
    );
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Stack>
      {reviews?.map(r => (
        <ProductReviewCard key={r.id} review={r} />
      ))}
      {totalPaginationButtons > 1 && (
        <LocalizedPagination
          currentPage={currentPage}
          totalPaginationButtons={totalPaginationButtons}
          handlePagination={handlePagination}
          siblings={isMobile ? 0 : 1}
        />
      )}
    </Stack>
  );
};

export default Reviews;
