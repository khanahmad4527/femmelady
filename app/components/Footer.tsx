import {
  ActionIcon,
  Anchor,
  Avatar,
  Flex,
  Group,
  Stack,
  Text
} from '@mantine/core';
import { IconBrandInstagram, IconBrandX, IconBrandYoutube } from '~/icons';
import LOGO from '@assets/images/logo.png';
import useTranslation from '~/hooks/useTranslation';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { Link } from '@remix-run/react';

const Footer = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const links = [
    { link: `/${currentLanguage}/contact`, label: t('footer.links.contact') },
    { link: `/${currentLanguage}/privacy`, label: t('footer.links.privacy') },
    { link: `/${currentLanguage}/blog`, label: t('footer.links.blog') },
    { link: `/${currentLanguage}/store`, label: t('footer.links.store') },
    { link: `/${currentLanguage}/careers`, label: t('footer.links.careers') }
  ];

  const items = links.map(link => (
    <Anchor
      component={Link}
      c="artichoke"
      key={link.label}
      to={link.link}
      lh={1}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Stack p={'md'}>
      <Flex
        direction={{ base: 'column', xs: 'row' }}
        justify={'space-between'}
        align={'center'}
        p={'md'}
        gap={'md'}
      >
        <Avatar
          component={Link}
          src={LOGO}
          size={100}
          to={`/${currentLanguage}`}
        />
        <Group>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandX size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </Flex>

      <Text>{t('footer.copyright')}</Text>
    </Stack>
  );
};

export default Footer;
