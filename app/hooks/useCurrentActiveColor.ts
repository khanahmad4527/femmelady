import { useEffect, useMemo, useRef, useState } from 'react';
import { PARAMS } from '~/constant';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { Product, ProductColor, ProductProductColor } from '~/types/types';
import useDefaultColor from './useDefaultColor';

const useCurrentActiveColor = ({
  product,
  searchParams
}: {
  product: Product;
  searchParams: URLSearchParams;
}) => {
  // Memoize the calculation of the default active color
  const defaultActiveColor = useMemo(() => {
    let defaultColor = useDefaultColor({ product });

    const paramsProductId = searchParams.get(PARAMS.PRODUCT_ID);
    const paramsImageSet = searchParams.get(PARAMS.IMAGE_SET);

    if (
      paramsProductId === product?.id &&
      product?.colors?.length &&
      product?.colors.length > 1
    ) {
      const selectedColor = product?.colors?.find(c => {
        const color = getFirstObjectDto(c) as ProductProductColor;
        const productColor = getFirstObjectDto(
          color?.product_color_id
        ) as ProductColor;

        return productColor?.image_set === paramsImageSet;
      });

      // Extract the product_color_id for the matched color, if any
      if (selectedColor) {
        defaultColor = getFirstObjectDto(selectedColor)?.product_color_id;
      }
    }

    return defaultColor;
  }, [product.translations]);

  // Initialize the activeColor state
  const [activeColor, setActiveColor] = useState(defaultActiveColor);

  // Create a ref to track the initial mount
  const hasMounted = useRef(false);

  // Sync the activeColor state with memoized defaultActiveColor
  // We only want to run this when color translation changed
  useEffect(() => {
    if (!hasMounted.current) {
      // Skip the effect on the initial mount
      hasMounted.current = true;
      return;
    }

    setActiveColor(defaultActiveColor);
  }, [product.translations]);

  return { activeColor, defaultActiveColor, setActiveColor };
};

export default useCurrentActiveColor;
