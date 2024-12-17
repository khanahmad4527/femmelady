import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Flex,
  Group,
  Text,
  TextInput,
  Tooltip
} from '@mantine/core';
import { Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconLogout, IconSearch, IconShoppingCart } from '~/icons';

import Logo from './Logo';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import { useDisclosure } from '@mantine/hooks';
import HeaderCart from './cart/HeaderCart';
import MobileDrawer from './MobileDrawer';
import LanguageSwitcher from './LanguageSwitcher';
import { buildLocalizedLink } from '~/utils';

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

  const { isLoggedIn } = headerFooterContext;

  const authLinks = [
    {
      link: buildLocalizedLink({ currentLanguage, primaryPath: 'login' }),
      label: t('login.login')
    },
    {
      link: buildLocalizedLink({ currentLanguage, primaryPath: 'register' }),
      label: t('register.register')
    }
  ];

  const authItems = authLinks.map(a => (
    <Anchor key={a.link} component={Link} c="primary.1" to={a.link} lh={1}>
      {a.label}
    </Anchor>
  ));

  const categoryLinks = [
    { link: `/${currentLanguage}/products`, label: t('header.new') },
    { link: `/${currentLanguage}/products`, label: t('header.topRated') },
    { link: `/${currentLanguage}/products`, label: t('header.dresses') },
    { link: `/${currentLanguage}/products`, label: t('header.clothing') },
    { link: `/${currentLanguage}/products`, label: t('header.shoes') },
    { link: `/${currentLanguage}/products`, label: t('header.accessories') },
    { link: `/${currentLanguage}/products`, label: t('header.weddings') },
    {
      link: `/${currentLanguage}/products`,
      label: t('header.homeFurniture')
    },
    {
      link: `/${currentLanguage}/products`,
      label: t('header.beautyWellness')
    },
    {
      link: `/${currentLanguage}/products`,
      label: t('header.giftsCandles')
    },
    { link: `/${currentLanguage}/products`, label: t('header.sale') }
  ];

  const categoryItems = categoryLinks.map(c => (
    <Anchor key={c.link} component={Link} c="primary.7" to={c.link} lh={1}>
      {c.label}
    </Anchor>
  ));

  return (
    <Box>
      <Flex
        justify={{ base: 'center', md: 'space-between' }}
        align="center"
        direction={{ base: 'column', md: 'row' }}
        gap={'md'}
        p="md"
        bg="primary"
      >
        <Logo />

        <Group
          justify={'center'}
          wrap={'nowrap'}
          w={{ base: '100%', md: '40%' }}
        >
          <TextInput
            w={'100%'}
            rightSection={<IconSearch />}
            placeholder={t('header.search')}
          />
          <Burger
            display={{ base: 'block', md: 'none' }}
            color={'white'}
            opened={burgerOpened}
            onClick={() => {
              mobileDrawerOpen();
              burgerToggle();
            }}
          />
        </Group>

        <Group
          display={{ base: 'none', md: 'flex' }}
          justify="space-between"
          p="sm"
        >
          <LanguageSwitcher />

          {isLoggedIn && (
            <Flex>
              <Group
                gap={0}
                wrap={'nowrap'}
                onClick={headerCartDrawerOpen}
                style={{ cursor: 'pointer' }}
              >
                <ActionIcon variant="transparent" size={'xl'}>
                  <IconShoppingCart size={30} color={'white'} />
                </ActionIcon>
                <Text fw={500} fz={'md'} c={'white'}>
                  {'9+'}
                </Text>
              </Group>
              <Tooltip label={t('common.logout')}>
                <ActionIcon
                  variant="transparent"
                  size={'xl'}
                  component={Link}
                  to={'/logout'}
                >
                  <IconLogout color={'white'} />
                </ActionIcon>
              </Tooltip>
            </Flex>
          )}

          {!isLoggedIn && <Group> {authItems}</Group>}
        </Group>
      </Flex>
      <Group
        display={{ base: 'none', md: 'flex' }}
        p={'md'}
        bg={'primary.1'}
        // pos={'sticky'}
        // top={0}
        // style={{ zIndex: 100 }}
      >
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
    </Box>
  );
};

export default Header;
