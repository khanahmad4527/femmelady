import { useMemo } from 'react';

import getFirstObjectDto from '~/dto/getFirstObjectDto';
import getStringDto from '~/dto/getStringDto';
import {
  Product,
  ProductColor,
  ProductImage,
  ProductImageFile,
  ProductProductImage
} from '~/types';

const useCurrentFeaturedImage = ({
  product,
  activeColor
}: {
  product: Product;
  activeColor: ProductColor;
}) => {
  // Memoize the `currentImageSetId` to avoid recomputing
  const currentImageSetId = getStringDto(activeColor.image_set);

  // Memoize the `currentImageSet` and feature images based on dependencies
  const featureImageSet = useMemo(() => {
    if (!currentImageSetId) {
      return {
        featureImage1: getStringDto(product?.feature_image_1),
        featureImage2: getStringDto(product?.feature_image_2),
        currentImageSet: getFirstObjectDto(
          getFirstObjectDto(product?.images)?.product_image_id
        )?.images as ProductImageFile[]
      };
    }

    const images = product.images as ProductProductImage[];

    const currentImageSet = (
      images.find(
        i => (i.product_image_id as ProductImage)?.id === currentImageSetId
      )?.product_image_id as unknown as ProductImage
    )?.images as ProductImageFile[];

    const featureImage1 = getStringDto(
      currentImageSet?.[0]?.directus_files_id,
      'directus_files_id'
    );

    const featureImage2 = getStringDto(
      currentImageSet?.[1]?.directus_files_id,
      'directus_files_id'
    );

    return {
      featureImage1: featureImage1 || getStringDto(product?.feature_image_1),
      featureImage2: featureImage2 || getStringDto(product?.feature_image_2),
      currentImageSet
    };
  }, [currentImageSetId, product]);

  // Return the memoized result
  return featureImageSet;
};

export default useCurrentFeaturedImage;
