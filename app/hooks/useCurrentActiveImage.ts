import { useEffect, useMemo, useRef, useState } from 'react';
import { SetURLSearchParams } from 'react-router';
import { PARAMS } from '~/constant';
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
  searchParams,
  setSearchParams
}: {
  product: Product;
  activeColor: ProductColor;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  // Create a ref to track the initial mount
  const hasMounted = useRef(false);

  const paramsImageId = searchParams.get(PARAMS.IMAGE_ID);
  const paramsImageSet =
    searchParams.get(PARAMS.IMAGE_SET) ?? getStringDto(activeColor?.image_set);

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
  }, [activeColor]);

  // Compute the initial active image
  const initialActiveImage = useMemo(() => {
    return (
      paramsImageId ??
      getFirstObjectDto(currentImageSet)?.directus_files_id ??
      defaultImage // Default fallback
    );
  }, []);

  const [activeImage, setActiveImage] = useState<string>(initialActiveImage!);

  // Recompute active image whenever activeColor dependencies change
  useEffect(() => {
    if (!hasMounted.current) {
      // Skip the effect on the initial mount
      hasMounted.current = true;
      return;
    }

    // Run the effect only when activeColor ID changes after the initial mount
    const newActiveImage = (getFirstObjectDto(currentImageSet)
      ?.directus_files_id ?? defaultImage) as string;

    if (newActiveImage !== activeImage) {
      setActiveImage(newActiveImage);

      searchParams.set(PARAMS.IMAGE_ID, newActiveImage);
      setSearchParams(searchParams, { preventScrollReset: true });
    }
  }, [activeColor.id]);

  return { activeImage, setActiveImage, currentImageSet };
};

export default useCurrentActiveImage;
