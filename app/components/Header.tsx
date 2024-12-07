import {
  Anchor,
  Group,
  Input,
  Stack,
  Grid,
  Avatar,
  Select,
  Box,
  Flex
} from '@mantine/core';
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

  return (
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
          onChange={(_value, option) =>
            navigate(`/${option.value}`, { replace: true })
          }
        />
      </Group>
    </Flex>
  );
};

export default Header;
