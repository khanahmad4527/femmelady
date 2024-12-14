import { Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLocation } from 'react-router';

import { ROUTES_WITHOUT_HEADER_AND_FOOTER } from '~/constant';
import { OutletContext } from '~/types/types';

import Footer from './Footer';
import Header from './Header';

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
    <Container>
      {!isExcludedRoute && <Header />}
      {children}
      {!isExcludedRoute && <Footer />}
    </Container>
  );
};

export default Document;
