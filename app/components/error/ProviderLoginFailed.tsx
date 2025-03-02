import { Alert } from '@mantine/core';

import { Translation } from '~/types';

const ProviderLoginFailed = ({ t }: { t: Translation }) => {
  return (
    <Alert variant="light" color="red" title={t('providerLoginFailed.title')}>
      {t('providerLoginFailed.description')}
    </Alert>
  );
};

export default ProviderLoginFailed;
