import { useEffect, useState } from 'react';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import getStringDto from '~/dto/getStringDto';
import {
  Product,
  ProductColor,
  ProductImage,
  ProductImageFile,
  ProductProductImage
} from '~/types/types';

const useCurrentFeaturedImage = ({
  product,
  activeColor
}: {
  product: Product;
  activeColor: ProductColor;
}) => {
  const [featureImageSet, setFeatureImageSet] = useState({
    featureImage1: getStringDto(product?.feature_image_1),
    featureImage2: getStringDto(product?.feature_image_2),
    currentImageSet: getFirstObjectDto(
      getFirstObjectDto(product?.images)?.product_image_id
    )?.images as ProductImageFile[]
  });

  const currentImageSetId = getStringDto(activeColor.image_set);

  useEffect(() => {
    if (currentImageSetId) {
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

      if (featureImage1 && featureImage2) {
        setFeatureImageSet({ featureImage1, featureImage2, currentImageSet });
      }
    }
  }, [currentImageSetId]);

  return featureImageSet;
};

export default useCurrentFeaturedImage;
