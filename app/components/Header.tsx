import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  ComboboxItem,
  Drawer,
  Flex,
  Group,
  Indicator,
  Select,
  TextInput
} from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconLogout, IconSearch, IconShoppingCart, IconSwitch } from '~/icons';

import Logo from './Logo';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import { useDisclosure } from '@mantine/hooks';
import HeaderCart from './cart/HeaderCart';

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const headerFooterContext = useHeaderFooterContext();

  const { isLoggedIn } = headerFooterContext;

  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (
    _value: string | null,
    option: ComboboxItem
  ) => {
    if (currentLanguage !== option.value) {
      const newPath = location.pathname.replace(
        `/${currentLanguage}`,
        `/${option.value}`
      );

      navigate({
        pathname: newPath,
        search: location.search
      });
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' }
  ];

  const links = [
    { link: `/${currentLanguage}/login`, label: t('login.login') },
    { link: `/${currentLanguage}/register`, label: t('register.register') }
  ];

  const items = links.map((link, i) => (
    <Anchor component={Link} c="primary.1" key={i} to={link.link} lh={1}>
      {link.label}
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

  const categoryItems = categoryLinks.map((link, i) => (
    <Anchor component={Link} c="primary.7" key={i} to={link.link} lh={1}>
      {link.label}
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

        <TextInput
          w={{ base: '100%', md: '40%' }}
          size="md"
          rightSection={<IconSearch />}
          placeholder={t('header.search')}
        />

        <Group
          display={{ base: 'none', md: 'flex' }}
          justify="space-between"
          p="sm"
        >
          <Select
            w={150}
            defaultValue={currentLanguage}
            data={languageOptions}
            allowDeselect={false}
            onChange={handleLanguageChange}
            rightSection={<IconSwitch color="white" size={18} />}
          />

          {isLoggedIn && (
            <>
              <>
                <Indicator
                  inline
                  label={'9+'}
                  color="primary.5"
                  size={30}
                  styles={{
                    indicator: {
                      fontWeight: 500,
                      fontSize: 16
                    }
                  }}
                >
                  <ActionIcon variant="transparent" size={'xl'} onClick={open}>
                    <IconShoppingCart size={30} color={'white'} />
                  </ActionIcon>
                </Indicator>
              </>
              <ActionIcon
                variant="transparent"
                size={'xl'}
                component={Link}
                to={'/logout'}
              >
                <IconLogout color={'white'} />
              </ActionIcon>
            </>
          )}

          {!isLoggedIn && <Group> {items}</Group>}
        </Group>
      </Flex>
      <Group
        p={'md'}
        // pos={'sticky'}
        // top={0}
        bg={'primary.1'}
        style={{ zIndex: 100 }}
      >
        {categoryItems}
      </Group>

      <HeaderCart close={close} opened={opened} />
    </Box>
  );
};

export default Header;
