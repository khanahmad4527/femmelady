import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { PARAMS } from '~/constant';
import { Product } from '~/types';

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
      const targetElement = productCardRefs.current[targetIndex];

      // Scroll to the target element
      targetElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // Add the glow class to highlight the product
      targetElement?.classList.add('productCardGlow');

      // Remove the glow class after 2 seconds
      const timeoutId = setTimeout(() => {
        targetElement?.classList.remove('productCardGlow');
      }, 2000);

      // Cleanup the timeout when component unmounts or when dependencies change
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return productCardRefs;
};

export default useScrollToProduct;
