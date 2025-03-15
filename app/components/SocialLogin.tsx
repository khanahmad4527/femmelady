import { Center, Group, Paper, Text } from '@mantine/core';
import { href, useOutletContext } from 'react-router';

import { PARAMS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { IconFacebook, IconGoogle } from '~/icons';
import { OutletContext } from '~/types';
import { buildLocalizedLink } from '~/utils';

const SocialLogin = ({ from }: { from: 'login' | 'register' }) => {
  const { currentLanguage } = useCurrentLanguage();
  const { searchParams, env } = useOutletContext<OutletContext>();

  const redirectTo = searchParams.get(PARAMS.redirectTo);

  const redirect = buildLocalizedLink({
    origin: env.APP_URL,
    url: href('/:lang?/login-via-providers', { lang: currentLanguage }),
    queryParams: {
      from,
      ...(redirectTo && { 'redirect-to': redirectTo })
    }
  });

  return (
    <Group justify="center">
      <GoogleSsoButton redirect={redirect} />

      {/* <FacebookSsoButton redirect={redirect} /> */}
    </Group>
  );
};

export default SocialLogin;

const FacebookSsoButton = ({ redirect }: { redirect: string }) => {
  const { env } = useOutletContext<OutletContext>();

  const url = new URL(`${env?.DIRECTUS_URL}/auth/login/google`);
  url.searchParams.set(PARAMS.redirect, redirect);

  return (
    <Paper
      component={'a'}
      href={url.toString()}
      style={{ textDecoration: 'none', color: 'inherit' }}
      px={12}
      h={40}
      styles={{
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          direction: 'ltr'
        }
      }}
      bg={'#1877f2'}
      aria-label="Continue with Facebook"
      withBorder
    >
      <Center inline>
        <IconFacebook size={30} />

        <Text ml={10} ff={'Helvetica Neue'} fw={500} c={'#ffffff'}>
          Continue with Facebook
        </Text>
      </Center>
    </Paper>
  );
};

const GoogleSsoButton = ({ redirect }: { redirect: string }) => {
  const { env } = useOutletContext<OutletContext>();

  const url = new URL(`${env?.DIRECTUS_URL}/auth/login/google`);
  url.searchParams.set(PARAMS.redirect, redirect);

  return (
    <Paper
      component={'a'}
      href={url.toString()}
      style={{ textDecoration: 'none', color: 'inherit' }}
      px={12}
      h={40}
      styles={{
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          direction: 'ltr'
        }
      }}
      aria-label="Continue with Google"
      withBorder
    >
      <Center inline>
        <IconGoogle size={20} />

        <Text ml={10} ff={'Roboto'} fw={500} c={'#000000'}>
          Continue with Google
        </Text>
      </Center>
    </Paper>
  );
};
