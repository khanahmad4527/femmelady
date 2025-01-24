import { Group } from '@mantine/core';
import GoogleSsoButton from './GoogleSsoButton';
import FacebookSsoButton from './FacebookSsoButton';

const SocialLogin = () => {
  return (
    <Group align={'center'} justify={'center'}>
      <GoogleSsoButton />

      <FacebookSsoButton />
    </Group>
  );
};

export default SocialLogin;
