import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { PARAMS } from '~/constant';
import { Product } from '~/types/types';

const useScrollToProduct = ({ products }: { products: Product[] }) => {
  const [searchParams] = useSearchParams();

  const paramsProductId = searchParams.get(PARAMS.PRODUCT_ID);
  const productCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Find the index of the product card that matches the productId from params
    const targetIndex = products.findIndex(
      product => product.id === paramsProductId
    );

    // If a valid product is found, scroll to the corresponding card
    if (targetIndex !== -1 && productCardRefs.current[targetIndex]) {
      productCardRefs.current[targetIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, []);

  return productCardRefs;
};

export default useScrollToProduct;
