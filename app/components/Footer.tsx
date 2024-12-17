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
import { Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconBrandInstagram, IconBrandX, IconBrandYoutube } from '~/icons';
import { buildLocalizedLink } from '~/utils';

const Footer = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const links = [
    {
      link: buildLocalizedLink({ currentLanguage, primaryPath: 'contact' }),
      label: t('footer.links.contact')
    },
    {
      link: buildLocalizedLink({ currentLanguage, primaryPath: 'privacy' }),
      label: t('footer.links.privacy')
    },
    {
      link: buildLocalizedLink({ currentLanguage, primaryPath: 'blog' }),
      label: t('footer.links.blog')
    },
    {
      link: buildLocalizedLink({ currentLanguage, primaryPath: 'store' }),
      label: t('footer.links.store')
    },
    {
      link: buildLocalizedLink({ currentLanguage, primaryPath: 'careers' }),
      label: t('footer.links.careers')
    }
  ];

  const items = links.map(link => (
    <Anchor
      key={link.link}
      component={Link}
      c="white"
      to={link.link}
      lh={1}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  const socialLinks = [
    {
      link: 'https://x.com/khanahmad4527',
      icon: IconBrandX
    },
    {
      link: 'https://www.youtube.com/@khanahmad452',
      icon: IconBrandYoutube
    },
    {
      link: 'https://www.instagram.com/khanahmad4527',
      icon: IconBrandInstagram
    }
  ];

  const socialItems = socialLinks.map(s => (
    <ActionIcon
      key={s.link}
      component={'a'}
      href={s.link}
      target="_blank"
      size="lg"
      variant="default"
      radius="xl"
    >
      <s.icon size={18} />
    </ActionIcon>
  ));

  return (
    <Stack bg="primary" p="md" pb={{ base: 'md', md: 'xl' }}>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify={'space-between'}
        align={{ base: 'center', sm: 'flex-end' }}
        gap={'md'}
      >
        <Stack>
          <Group>{items}</Group>
          <Flex
            gap="xs"
            justify={{ base: 'center', sm: 'flex-start' }}
            wrap="nowrap"
          >
            {socialItems}
          </Flex>
        </Stack>

        <Stack>
          <Text c={'white'}> {t('footer.getLatestNews')}</Text>
          <Box>
            <TextInput placeholder="ahmad@unthaa.com" />
            <Text c={'white'} mt={5} fz={'xs'}>
              {t('footer.signUpAgreement', {
                privacyPolicy: (
                  <Anchor
                    key={'footer.privacyPolicy'}
                    c={'white'}
                    fz="xs"
                    component={Link}
                    to={buildLocalizedLink({
                      currentLanguage,
                      primaryPath: 'privacy-policy'
                    })}
                    underline="always"
                  >
                    {t('footer.privacyPolicy')}
                  </Anchor>
                ),
                termsOfService: (
                  <Anchor
                    key={'footer.termsOfService'}
                    c={'white'}
                    fz="xs"
                    component={Link}
                    to={buildLocalizedLink({
                      currentLanguage,
                      primaryPath: 'terms-of-service'
                    })}
                    underline="always"
                  >
                    {t('footer.termsOfService')}
                  </Anchor>
                )
              })}
            </Text>
          </Box>
          <Button color="black">{t('footer.subscribeButton')}</Button>
        </Stack>
      </Flex>

      <Text c={'white'}>{t('footer.copyright')}</Text>
    </Stack>
  );
};

export default Footer;
