import { Anchor, Group, Input, Avatar, Select, Flex } from '@mantine/core';
import { Link, useNavigate } from '@remix-run/react';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconSearch } from '~/icons';
import LOGO from '@assets/images/logo.png';

const Header = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const navigate = useNavigate();

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' }
  ];

  const links = [
    { link: `/${currentLanguage}/login`, label: t('login.login') },
    { link: `/${currentLanguage}/register`, label: t('register.register') }
  ];

  const items = links.map(link => (
    <Anchor
      component={Link}
      c="artichoke.1"
      key={link.label}
      to={link.link}
      lh={1}
    >
      {link.label}
    </Anchor>
  ));

  const categoryLinks = [
    { link: `/${currentLanguage}/new`, label: t('header.new') },
    { link: `/${currentLanguage}/top-rated`, label: t('header.topRated') },
    { link: `/${currentLanguage}/dresses`, label: t('header.dresses') },
    { link: `/${currentLanguage}/clothing`, label: t('header.clothing') },
    { link: `/${currentLanguage}/shoes`, label: t('header.shoes') },
    { link: `/${currentLanguage}/accessories`, label: t('header.accessories') },
    { link: `/${currentLanguage}/weddings`, label: t('header.weddings') },
    {
      link: `/${currentLanguage}/home-furniture`,
      label: t('header.homeFurniture')
    },
    {
      link: `/${currentLanguage}/beauty-wellness`,
      label: t('header.beautyWellness')
    },
    {
      link: `/${currentLanguage}/gifts-candles`,
      label: t('header.giftsCandles')
    },
    { link: `/${currentLanguage}/sale`, label: t('header.sale') }
  ];

  const categoryItems = categoryLinks.map(link => (
    <Anchor
      component={Link}
      c="artichoke.7"
      key={link.label}
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
        bg="artichoke"
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
          placeholder={t('header.search')}
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
            onChange={(_value, option) =>
              navigate(`/${option.value}`, { replace: true })
            }
          />
        </Group>
      </Flex>
      <Group
        p={'md'}
        pos={'sticky'}
        bg={'artichoke.1'}
        top={0}
        style={{ zIndex: 100 }}
      >
        {categoryItems}
      </Group>
    </>
  );
};

export default Header;
