import { useMemo, useState } from 'react';
import { PARAM_KEYS } from '~/constant';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import getStringDto from '~/dto/getStringDto';
import {
  Product,
  ProductColor,
  ProductImage,
  ProductImageFile,
  ProductProductImage
} from '~/types';

const useCurrentActiveImage = ({
  product,
  activeColor,
  searchParams
}: {
  product: Product;
  activeColor: ProductColor;
  searchParams: URLSearchParams;
}) => {
  const paramsImageId = searchParams.get(PARAM_KEYS.IMAGE_ID);
  const paramsImageSet =
    searchParams.get(PARAM_KEYS.IMAGE_SET) ??
    getStringDto(activeColor?.image_set);

  const images = product?.images as ProductProductImage[];

  const defaultImage = getFirstObjectDto(
    getFirstObjectDto(images[0]?.product_image_id)?.images
  )?.directus_files_id as string;

  // Memoize the current image set
  const currentImageSet = useMemo(() => {
    if (paramsImageSet) {
      return ((
        images.find(
          i => (i.product_image_id as ProductImage)?.id === paramsImageSet
        )?.product_image_id as unknown as ProductImage
      )?.images ?? []) as ProductImageFile[];
    }

    // Default to the first image set if no paramsImageSet is provided
    return (getFirstObjectDto(getFirstObjectDto(images)?.product_image_id)
      ?.images ?? []) as ProductImageFile[];
  }, [activeColor.id]) as ProductImageFile[];

  const [activeImage, setActiveImage] = useState<string>(() => {
    return (
      paramsImageId ??
      getFirstObjectDto(currentImageSet)?.directus_files_id ??
      defaultImage
    );
  });

  const newActiveImage = (getFirstObjectDto(currentImageSet)
    ?.directus_files_id ?? defaultImage) as string;

  return { activeImage, setActiveImage, newActiveImage, currentImageSet };
};

export default useCurrentActiveImage;
