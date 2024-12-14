import {
  Anchor,
  ComboboxItem,
  Flex,
  Group,
  Select,
  TextInput
} from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconSearch, IconSwitch } from '~/icons';

import Logo from './Logo';

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
    <>
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
          <Group> {items}</Group>

          <Select
            defaultValue={currentLanguage}
            data={languageOptions}
            allowDeselect={false}
            onChange={handleLanguageChange}
            rightSection={<IconSwitch color="white" size={18} />}
          />
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
    </>
  );
};

export default Header;
