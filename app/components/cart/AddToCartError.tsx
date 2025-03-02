import { Alert, List } from '@mantine/core';
import { FetcherWithComponents } from 'react-router';

import useTranslation from '~/hooks/useTranslation';
import { translateErrors } from '~/utils';

const AddToCartError = ({
  fetcher
}: {
  fetcher: FetcherWithComponents<any>;
}) => {
  const t = useTranslation();
  const errors = Object.values(translateErrors(fetcher.data?.errors, t));

  return (
    <>
      {errors.length > 0 && (
        <Alert variant="light" color="red" title={t('common.errors')}>
          <List c={'red'}>
            {errors.map((error, index) => (
              <List.Item key={index}>{error}</List.Item>
            ))}
          </List>
        </Alert>
      )}
    </>
  );
};

export default AddToCartError;
