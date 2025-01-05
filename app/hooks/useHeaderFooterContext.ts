import { createContext, useContext } from 'react';
import { OutletContext } from '~/types';

type HeaderFooterContextType = OutletContext & {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export const HeaderFooterContext = createContext<HeaderFooterContextType>(
  {} as HeaderFooterContextType
);

const useHeaderFooterContext = () => {
  const headerFooterContext = useContext(HeaderFooterContext);
  return headerFooterContext;
};

export default useHeaderFooterContext;
