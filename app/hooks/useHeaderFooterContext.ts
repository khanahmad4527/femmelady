import { createContext, useContext } from 'react';
import { Cart, OutletContext } from '~/types';

type HeaderFooterContextType = OutletContext & {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  carts: Cart[];
  setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
};

export const HeaderFooterContext = createContext<HeaderFooterContextType>(
  {} as HeaderFooterContextType
);

const useHeaderFooterContext = () => {
  const headerFooterContext = useContext(HeaderFooterContext);
  return headerFooterContext;
};

export default useHeaderFooterContext;
