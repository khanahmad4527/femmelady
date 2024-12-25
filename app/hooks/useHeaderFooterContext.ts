import { createContext, useContext } from 'react';
import { OutletContext } from '~/types/types';

export const HeaderFooterContext = createContext<
  OutletContext | Record<string, string>
>({});

const useHeaderFooterContext = () => {
  const headerFooterContext = useContext(HeaderFooterContext);
  return headerFooterContext;
};

export default useHeaderFooterContext;
