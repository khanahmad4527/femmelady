import {
  Anchor,
  Group,
  Input,
  Avatar,
  Select,
  Flex,
  ComboboxItem,
  Text
} from '@mantine/core';
import { Link, useLocation, useNavigate } from '@remix-run/react';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconSearch } from '~/icons';
import LOGO from '@assets/images/logo.png';

const Header = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
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
    <Anchor
      component={Link}
      c="primary.1"
      key={i}
      to={link.link}
      lh={1}
    >
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
    <Anchor
      component={Link}
      c="primary.7"
      key={i}
      to={link.link}
      lh={1}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <>
      <Flex
        justify={{ base: 'center', md: 'space-between' }}
        align="center"
        direction={{ base: 'column', md: 'row' }}
        gap={'md'}
        p="md"
        bg="primary"
      >
        <Avatar
          component={Link}
          src={LOGO}
          size={100}
          to={`/${currentLanguage}`}
        />

        <Input
          w={{ base: '100%', md: '40%' }}
          size="md"
          rightSection={<IconSearch />}
          placeholder={t('header.search') as string}
        />

        <Group
          display={{ base: 'none', md: 'flex' }}
          justify="space-between"
          p="sm"
        >
          {items}

          <Select
            defaultValue={currentLanguage}
            data={languageOptions}
            allowDeselect={false}
            onChange={handleLanguageChange}
          />
        </Group>
      </Flex>
      <Group
        p={'md'}
        pos={'sticky'}
        bg={'primary.1'}
        top={0}
        style={{ zIndex: 100 }}
      >
        {categoryItems}
      </Group>
    </>
  );
};

export default Header;
