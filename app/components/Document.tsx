import { Container, Stack } from '@mantine/core';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { ROUTES_WITHOUT_HEADER_AND_FOOTER } from '~/constant';
import { HeaderFooterContext } from '~/hooks/useHeaderFooterContext';
import commonClasses from '~/styles/Common.module.scss';
import { Cart, OutletContext } from '~/types';

import Footer from './Footer';
import Header from './Header';

const Document = (
  props: OutletContext & {
    children: React.ReactNode;
  }
) => {
  const { pathname } = useLocation();

  const { children, ...restData } = props;

  const { user } = restData;

  const basePath = pathname.split('/').at(-1) ?? '';

  const isExcludedRoute = ROUTES_WITHOUT_HEADER_AND_FOOTER.has(basePath);

  const [cartCount, setCartCount] = useState(user?.carts?.length ?? 0);
  const [carts, setCarts] = useState<Cart[]>([]);

  const ctx = { ...restData, cartCount, setCartCount, carts, setCarts };

  return (
    <HeaderFooterContext.Provider value={ctx}>
      <Stack className={commonClasses.consistentSpacing}>
        {!isExcludedRoute && <Header />}
        <Container w={'100%'}>{children}</Container>
        {!isExcludedRoute && <Footer />}
      </Stack>
    </HeaderFooterContext.Provider>
  );
};

export default Document;
