import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { Product, ProductColor, ProductProductColor } from '~/types';

const useDefaultColor = ({ product }: { product: Product }) => {
  const defaultActiveColor = getFirstObjectDto(
    (getFirstObjectDto(product?.colors) as ProductProductColor)
      ?.product_color_id
  ) as ProductColor;

  return defaultActiveColor;
};

export default useDefaultColor;
