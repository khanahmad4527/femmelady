import ProductReview from '~/components/products/ProductReview';
import { Route } from './+types/$slug.reviews';
import { getLanguageCode } from '~/utils';
import { useLoaderData } from 'react-router';
import { getReviews } from '~/server/api';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);
  const productSlug = params?.slug;

  const reviews = await getReviews({ languageCode, slug: productSlug });

  return { reviews, totalReviewsCount: 10 };
};

const Reviews = () => {
  const { reviews, totalReviewsCount } = useLoaderData<typeof loader>();

  return (
    <div>
      <ProductReview reviews={reviews} totalReviewsCount={totalReviewsCount} />
    </div>
  );
};

export default Reviews;
