import { Button, Center, Paper, Text } from '@mantine/core';
import { useOutletContext } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { IconGoogle } from '~/icons';
import { OutletContext } from '~/types';

const GoogleSsoButton = () => {
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

export default GoogleSsoButton;
