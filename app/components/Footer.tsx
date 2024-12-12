import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { IconBrandInstagram, IconBrandX, IconBrandYoutube } from '~/icons';
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

  const items = links.map((link, i) => (
    <Anchor
      component={Link}
      c="primary"
      key={i}
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
        align={'flex-end'}
        p={'md'}
        gap={'md'}
      >
        <Stack>
          <Group>{items}</Group>
          <Group gap="xs" wrap="nowrap">
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
        </Stack>

        <Stack>
          <Text> {t('footer.getLatestNews')}</Text>
          <Box>
            <TextInput placeholder="ahmad@unthaa.com" />
            <Text mt={5} fz={'xs'}>
              {t('footer.signUpAgreement', {
                privacyPolicy: (
                  <Anchor
                    fz="xs"
                    component={Link}
                    to="/privacy-policy"
                    underline="always"
                  >
                    {t('footer.privacyPolicy')}
                  </Anchor>
                ),
                termsOfService: (
                  <Anchor
                    fz="xs"
                    component={Link}
                    to="/terms-of-service"
                    underline="always"
                  >
                    {t('footer.termsOfService')}
                  </Anchor>
                )
              })}
            </Text>
          </Box>
          <Button>{t('footer.subscribeButton')}</Button>
        </Stack>
      </Flex>

      <Text>{t('footer.copyright')}</Text>
    </Stack>
  );
};

export default Footer;
