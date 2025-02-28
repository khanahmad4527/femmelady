import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Container,
  Flex,
  Group
} from '@mantine/core';
import { href, Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconShoppingCart } from '~/icons';

import Logo from './Logo';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import { useDisclosure } from '@mantine/hooks';
import HeaderCart from './cart/HeaderCart';
import MobileDrawer from './MobileDrawer';
import LanguageSwitcher from './LanguageSwitcher';
import { buildLocalizedLink } from '~/utils';
import TopSearchBar from './TopSearchBar';
import CartCount from './cart/CartCount';
import BurgerMenu from './BurgerMenu';
import { PATHS, CATEGORIES_WITH_ID_MAP, PARAM_KEYS } from '~/constant';
import useCurrentUrl from '~/hooks/useCurrentUrl';

const Header = () => {
  const [
    mobileDrawerOpened,
    { open: mobileDrawerOpen, close: mobileDrawerClose }
  ] = useDisclosure(false);
  const [
    headerCartDrawerOpened,
    { close: headerCartDrawerClose, open: headerCartDrawerOpen }
  ] = useDisclosure(false);
  const [burgerOpened, { toggle: burgerToggle, close: burgerClose }] =
    useDisclosure();
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const headerFooterContext = useHeaderFooterContext();
  const { currentUrl } = useCurrentUrl();

  const { isLoggedIn, cartCount, locale, env } = headerFooterContext;

  const authLinks = [
    {
      id: 'a3f5c2e8-9d4b-46f1-8b47-c1d9a7f83412',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.login],
        queryParams: {
          'redirect-to': currentUrl!
        }
      }),
      label: t('login.login')
    },
    {
      id: 'b7e3f6a2-d8c1-44e9-b519-e7c5a4b39127',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.register],
        queryParams: {
          'redirect-to': currentUrl!
        }
      }),
      label: t('register.register')
    }
  ];

  const authItems = authLinks.map(a => (
    <Anchor
      key={a.id}
      component={Link}
      prefetch="intent"
      c="primary.1"
      to={a.link}
      lh={1}
    >
      {a.label}
    </Anchor>
  ));

  const categoryLinks = [
    {
      id: 'c9d1e5d6-7d3a-4f7c-aafa-089fc58a3d62',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          'force-validate': 'global'
        }
      }),
      label: t('header.new')
    },
    {
      id: 'a8e2f3b4-c2c9-48d6-a1e7-b05c4a89d816',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          'force-validate': 'global'
        }
      }),
      label: t('header.topRated')
    },
    {
      id: 'b7f4e6d3-f1c8-439d-91a7-c57b1a98d319',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.dresses.key,
          'force-validate': 'global'
        }
      }),
      label: t('header.dresses')
    },
    {
      id: 'd6e3c7b2-e1d7-472c-b519-d91e2b43f2a7',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.dresses.key,
          'force-validate': 'global'
        }
      }),
      label: t('header.clothing')
    },
    {
      id: 'e5f7c4a9-a9b2-4d38-b716-d84f9a1b5e13',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.shoes.key,
          'force-validate': 'global'
        }
      }),
      label: t('header.shoes')
    },
    {
      id: 'f3c8e6d2-d3c9-4a15-81f9-c16b2a43d719',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.jewelry.key,
          'force-validate': 'global'
        }
      }),
      label: t('header.accessories')
    },
    {
      id: 'a1b3d2f4-f7c2-4e39-b816-c47e9b31a517',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP['wedding-dresses'].key,
          'force-validate': 'global'
        }
      }),
      label: t('header.weddings')
    },
    {
      id: 'c2e1f7b4-d2c3-437f-a8e9-f19b4a27d816',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP['home-and-furniture'].key,
          'force-validate': 'global'
        }
      }),
      label: t('header.homeFurniture')
    },
    {
      id: 'b5d2c8f1-c7a3-4f92-b8a7-e1b5a7f49c38',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP['beauty-and-wellness'].key,
          'force-validate': 'global'
        }
      }),
      label: t('header.beautyWellness')
    },
    {
      id: 'f7b3c9e2-d6c8-471a-b4e7-a91b8e36d412',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.candles.key,
          'force-validate': 'global'
        }
      }),
      label: t('header.giftsCandles')
    },
    {
      id: 'e1d3f6a4-a4b9-4297-a5b7-f18c4e31d9a5',
      link: buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products],
        queryParams: {
          'force-validate': 'global'
        }
      }),
      label: t('header.sale')
    }
  ];

  const categoryItems = categoryLinks.map(c => (
    <Anchor
      key={c.id}
      component={Link}
      prefetch="intent"
      c="primary.7"
      to={c.link}
      lh={1}
    >
      {c.label}
    </Anchor>
  ));

  return (
    <Box bg="primary">
      <Container>
        <Flex
          justify={{ base: 'center', md: 'space-between' }}
          align="center"
          direction={{ base: 'column', md: 'row' }}
          gap={'md'}
          py="md"
        >
          <Logo />

          <Group
            justify={'center'}
            wrap={'nowrap'}
            w={{ base: '100%', md: '40%' }}
          >
            <TopSearchBar />
            <Burger
              hiddenFrom="md"
              color={'white'}
              opened={burgerOpened}
              onClick={() => {
                mobileDrawerOpen();
                burgerToggle();
              }}
            />
          </Group>

          <Group visibleFrom="md" justify="space-between" p="sm">
            <LanguageSwitcher />

            {isLoggedIn && (
              <Flex>
                <Anchor
                  component={Link}
                  prefetch="intent"
                  to={href('/:lang?/checkout', { lang: currentLanguage })}
                >
                  <Group gap={0} wrap={'nowrap'} style={{ cursor: 'pointer' }}>
                    <ActionIcon variant="transparent" size="xl">
                      <IconShoppingCart size={30} color="white" />
                    </ActionIcon>
                    <CartCount cartCount={cartCount} locale={locale} />
                  </Group>
                </Anchor>

                <BurgerMenu />
              </Flex>
            )}

            {!isLoggedIn && <Group> {authItems}</Group>}
          </Group>
        </Flex>

        <Group visibleFrom="md" p={'md'} bg={'primary.1'}>
          {categoryItems}
        </Group>

        <MobileDrawer
          authLinks={authLinks}
          categoryLinks={categoryLinks}
          close={mobileDrawerClose}
          burgerClose={burgerClose}
          opened={mobileDrawerOpened}
          headerCartDrawerOpen={headerCartDrawerOpen}
        />
        <HeaderCart
          close={headerCartDrawerClose}
          opened={headerCartDrawerOpened}
        />
      </Container>
    </Box>
  );
};

export default Header;
