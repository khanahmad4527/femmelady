import { useState } from 'react';
import { PARAMS } from '~/constant';
import { Product, ProductSize } from '~/types';

const useCurrentActiveSize = ({
  product,
  searchParams
}: {
  product: Product;
  searchParams: URLSearchParams;
}) => {
  const productSizeParam = searchParams.get(PARAMS.SIZE);
  // Safely initialize the active size state
  const [activeSize, setActiveSize] = useState<ProductSize>(() => {
    // Ensure `product.sizes` is defined and is an array
    const sizes = product.sizes as ProductSize[];

    // Find the size that matches the parameter or fall back to the first size
    return sizes.find(s => s.size === productSizeParam) ?? sizes[0];
  });

  return { activeSize, setActiveSize };
};

export default useCurrentActiveSize;
