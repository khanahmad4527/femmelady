import { Center, Paper, Text, Group } from '@mantine/core';
import { useOutletContext } from 'react-router';
import { PARAMS, PATHS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { IconFacebook, IconGoogle } from '~/icons';
import { OutletContext } from '~/types';
import { buildLocalizedLink } from '~/utils';

const SocialLogin = ({ from }: { from: 'login' | 'register' }) => {
  const { currentLanguage } = useCurrentLanguage();
  const { env, searchParams } = useOutletContext<OutletContext>();

  const redirectTo = searchParams.get(PARAMS.redirectTo);

  const redirect = buildLocalizedLink({
    baseUrl: env?.APP_URL!,
    currentLanguage,
    paths: [PATHS.loginViaProviders],
    queryParams: {
      from,
      'redirect-to': redirectTo!
    }
  });

  return (
    <Group align={'center'} justify={'center'}>
      <GoogleSsoButton redirect={redirect} />

      <FacebookSsoButton redirect={redirect} />
    </Group>
  );
};

export default SocialLogin;

const FacebookSsoButton = ({ redirect }: { redirect: string }) => {
  const { env } = useOutletContext<OutletContext>();

  return (
    <Paper
      component={'a'}
      href={`${env?.DIRECTUS_URL}/auth/login/google?redirect=${redirect}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      px={12}
      h={40}
      styles={{
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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

  return (
    <Paper
      component={'a'}
      href={`${env?.DIRECTUS_URL}/auth/login/google?redirect=${redirect}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      px={12}
      h={40}
      styles={{
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
