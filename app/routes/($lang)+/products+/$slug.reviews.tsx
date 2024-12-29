import ProductReview from '~/components/products/ProductReview';
import { Route } from './+types/$slug.reviews';
import { getLanguageCode, getLimit, getPage } from '~/utils';
import {
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext
} from 'react-router';
import { getReviews } from '~/server/api';
import { OutletContext } from '~/types/types';
import { PARAMS } from '~/constant';

// export const shouldRevalidate: ShouldRevalidateFunction = ({ nextUrl }) => {
//   const size = nextUrl.searchParams.get(PARAMS.SIZE);
//   const imageId = nextUrl.searchParams.get(PARAMS.IMAGE_ID);
//   const productId = nextUrl.searchParams.get(PARAMS.PRODUCT_ID);
//   const imageSet = nextUrl.searchParams.get(PARAMS.IMAGE_SET);

//   if (size || imageId || productId || imageSet) {
//     return false;
//   }

//   return true;
// };

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);
  const productSlug = params?.slug;

  const reviewsPerPage = getLimit({ request });

  const currentPage = getPage({ request });
  console.log('getReviews');
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
