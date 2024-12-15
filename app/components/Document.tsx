import { Container, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLocation } from 'react-router';

import { ROUTES_WITHOUT_HEADER_AND_FOOTER } from '~/constant';
import { OutletContext } from '~/types/types';
import commonClasses from '~/styles/Common.module.scss';
import Footer from './Footer';
import Header from './Header';
import { HeaderFooterContext } from '~/hooks/useHeaderFooterContext';

const Document = (
  props: OutletContext & {
    children: React.ReactNode;
  }
) => {
  const [opened, { toggle }] = useDisclosure();

  const { pathname } = useLocation();

  const { children, ...restData } = props;

  const { isLoggedIn } = restData;

  const basePath = pathname.split('/').at(-1) ?? '';

  const isExcludedRoute = ROUTES_WITHOUT_HEADER_AND_FOOTER.has(basePath);

  return (
    <HeaderFooterContext.Provider value={restData}>
      <Container component={Stack} className={commonClasses.consistentSpacing}>
        {!isExcludedRoute && <Header />}
        {children}
        {!isExcludedRoute && <Footer />}
      </Container>
    </HeaderFooterContext.Provider>
  );
};

export default Document;
