import { Container, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLocation } from 'react-router';

import { ROUTES_WITHOUT_HEADER_AND_FOOTER } from '~/constant';
import { OutletContext } from '~/types';
import commonClasses from '~/styles/Common.module.scss';
import Footer from './Footer';
import Header from './Header';
import { HeaderFooterContext } from '~/hooks/useHeaderFooterContext';
import { useState } from 'react';

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

  const ctx = { ...restData, cartCount, setCartCount };

  return (
    <HeaderFooterContext.Provider value={ctx}>
      <Container component={Stack} className={commonClasses.consistentSpacing}>
        {!isExcludedRoute && <Header />}
        {children}
        {!isExcludedRoute && <Footer />}
      </Container>
    </HeaderFooterContext.Provider>
  );
};

export default Document;
