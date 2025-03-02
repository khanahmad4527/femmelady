import { Alert } from '@mantine/core';
import { FetcherWithComponents } from 'react-router';

import useTranslation from '~/hooks/useTranslation';
import type { TFetcherError } from '~/utils/error';

const FetcherError = ({
  fetcher,
  description,
  title
}: TFetcherError & {
  fetcher?: FetcherWithComponents<TFetcherError>;
}) => {
  const t = useTranslation();

  const _title = fetcher?.data?.title ?? title;
  const _description = fetcher?.data?.description ?? description;

  if (!_title || !_description) {
    return null;
  }

  return (
    <Alert variant="light" color="red" title={t(_title)}>
      {t(_description)}
    </Alert>
  );
};

export default FetcherError;
