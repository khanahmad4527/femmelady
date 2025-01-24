import { Center, Paper, Text } from '@mantine/core';
import { useOutletContext } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { IconFacebook } from '~/icons';
import { OutletContext } from '~/types';

const FacebookSsoButton = () => {
  const currentLanguage = useCurrentLanguage();
  const { env } = useOutletContext<OutletContext>();
  return (
    <Paper
      component="a"
      href={`${env?.DIRECTUS_URL}/auth/login/google?redirect=${env?.APP_URL}/${currentLanguage}/login-via-providers?from=login`}
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
        <IconFacebook size={20} />

        <Text ml={10} ff={'Helvetica Neue'} fw={500} c={'#ffffff'}>
          Continue with Facebook
        </Text>
      </Center>
    </Paper>
  );
};

export default FacebookSsoButton;
