import ProductReview from '~/components/products/ProductReview';
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
import { OutletContext } from '~/types';
import { FORCE_REVALIDATE_MAP, PARAMS } from '~/constant';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  nextUrl,
  currentUrl
}) => {
  // Use shared logic
  const commonResult = shouldRevalidateLogic(nextUrl, currentUrl);

  if (commonResult) {
    return true; // If shared logic already decided to revalidate, no need to check further
  }

  const forceValidate = nextUrl.searchParams.get(PARAMS.FORCE_REVALIDATE);

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
  const { reviews } = useLoaderData<typeof loader>();

  return (
    <div>
      <ProductReview reviews={reviews} totalReviewsCount={totalReviewsCount} />
    </div>
  );
};

export default Reviews;
