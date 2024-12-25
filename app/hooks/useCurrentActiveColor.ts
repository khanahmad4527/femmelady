import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { PARAMS } from '~/constant';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { Product, ProductColor, ProductProductColor } from '~/types/types';

const useCurrentActiveColor = ({ product }: { product: Product }) => {
  const [searchParams] = useSearchParams();

  let defaultActiveColor = getFirstObjectDto(
    (getFirstObjectDto(product?.colors) as ProductProductColor)
      ?.product_color_id
  ) as ProductColor;

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
      defaultActiveColor = getFirstObjectDto(selectedColor)?.product_color_id;
    }
  }

  const [activeColor, setActiveColor] = useState(defaultActiveColor);

  return { activeColor, setActiveColor };
};

export default useCurrentActiveColor;
