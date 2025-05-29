import { Alert, Button, Stack } from '@mantine/core';
import { href, Link } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { Route } from './+types/verify-email';
import { directus } from '~/server/directus';
import { registerUserVerify } from '@directus/sdk';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    throw Error('invalid token');
  }

  await directus.request(registerUserVerify(token));
};

export const ErrorBoundary = () => {
  const t = useTranslation();

  return (
    <Alert
      w="100%"
      variant="light"
      color="red"
      title={t('register.invalidTokenTitle')}
    >
      {t('register.invalidTokenDescription')}
    </Alert>
  );
};

const verifyEmail = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  return (
    <Stack w="100%">
      <Alert
        variant="light"
        color="green"
        title={t('register.verificationSuccessTitle')}
      >
        {t('register.verificationSuccessDescription')}
      </Alert>
      <Button
        w="fit-content"
        component={Link}
        to={href('/:lang?/login', { lang: currentLanguage })}
      >
        {t('login.login')}
      </Button>
    </Stack>
  );
};

export default verifyEmail;
