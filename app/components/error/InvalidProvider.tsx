import { Alert } from '@mantine/core';
import { Translation } from '~/types';

const InvalidProvider = ({ t }: { t: Translation }) => {
  return (
    <Alert variant="light" color="red" title={t('invalidProvider.title')}>
      {t('invalidProvider.description')}
    </Alert>
  );
};

export default InvalidProvider;
