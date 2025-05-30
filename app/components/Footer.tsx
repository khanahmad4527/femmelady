import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { href, Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconBrandInstagram, IconBrandX, IconBrandYoutube } from '~/icons';

const Footer = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const links = [
    {
      id: '7d4a5c83-9b2f-49e7-a5b4-2f1c3a8d6b47',
      link: href('/:lang?/about-us', { lang: currentLanguage }),
      label: t('footer.links.aboutUs')
    },
    {
      id: '4b5f25a7-3d2e-4f79-a1b7-43767c88d1f3',
      link: href('/:lang?/contact-us', { lang: currentLanguage }),
      label: t('footer.links.contactUs')
    },
    {
      id: 'd1c7f8a6-9b8e-4a27-a9f1-0c5f784e12c6',
      link: href('/:lang?/privacy-policy', { lang: currentLanguage }),
      label: t('footer.links.privacyPolicy')
    },
    {
      id: 'c8967158-00be-4683-bb82-dfc55c8bc0e8',
      link: href('/:lang?/terms-of-service', { lang: currentLanguage }),
      label: t('footer.links.termsOfService')
    },
    {
      id: 'a34c8e57-6a41-4b39-9384-d4b7a1f27b89',
      link: href('/:lang?', { lang: currentLanguage }),
      label: t('footer.links.blog')
    },
    {
      id: 'cf72d496-5b84-42e9-a8e1-84f3c67b8a29',
      link: href('/:lang?/faq', { lang: currentLanguage }),
      label: t('footer.links.faq')
    }
  ];

  const items = links.map(l => (
    <Anchor
      key={l.id}
      component={Link}
      prefetch="intent"
      c="white"
      to={l.link}
      lh={1}
      size="sm"
    >
      {l.label}
    </Anchor>
  ));

  const socialLinks = [
    {
      id: 'e8b1f3d7-6f8c-4b7d-89a3-c25f75d1a462',
      link: 'https://x.com/khanahmad4527',
      icon: IconBrandX
    },
    {
      id: 'c7a5e4f1-b2d8-4d7f-a6b1-89f3d42c7e75',
      link: 'https://www.youtube.com/@khanahmad452',
      icon: IconBrandYoutube
    },
    {
      id: 'a2c4d7b9-85f3-41d6-b7e2-f47c8a1b925d',
      link: 'https://www.instagram.com/khanahmad4527',
      icon: IconBrandInstagram
    }
  ];

  const socialItems = socialLinks.map(s => (
    <ActionIcon
      key={s.id}
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
    <Box bg="primary">
      <Stack component={Container} p="md" pb={{ base: 'md', md: 'xl' }}>
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
              <TextInput placeholder="ahmad@femmelady.com" />
              <Text c={'white'} mt={5} fz={'xs'}>
                {t('footer.signUpAgreement', {
                  privacyPolicy: (
                    <Anchor
                      key={'4f471f99-87e5-4df3-8ef4-9c2ddc7857b0'}
                      c={'white'}
                      fz="xs"
                      component={Link}
                      prefetch="intent"
                      to={href('/:lang?/privacy-policy', {
                        lang: currentLanguage
                      })}
                      underline="always"
                    >
                      {t('footer.privacyPolicy')}
                    </Anchor>
                  ),
                  termsOfService: (
                    <Anchor
                      key={'5f38c819-c8d7-4512-b1e9-8ff2237ef3f2'}
                      c={'white'}
                      fz="xs"
                      component={Link}
                      prefetch="intent"
                      to={href('/:lang?/terms-of-service', {
                        lang: currentLanguage
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

        <Text c={'white'}>
          {t('footer.copyright', {
            copyrightYear: (
              <Text key={'footer.copyright'} span>
                {new Date().getFullYear()}
              </Text>
            )
          })}
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;
