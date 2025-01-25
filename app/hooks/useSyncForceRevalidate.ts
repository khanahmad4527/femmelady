import { useEffect } from 'react';
import { SetURLSearchParams, useNavigation } from 'react-router';
import { PARAM_KEYS } from '~/constant';

/*
 * This is used to remove force revalidate param from the url
 */
const useSyncForceRevalidate = ({
  searchParams,
  setSearchParams
}: {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  const navigation = useNavigation();
  const isForceRevalidatePresent = searchParams.get(
    PARAM_KEYS.FORCE_REVALIDATE
  );

  useEffect(() => {
    if (isForceRevalidatePresent && navigation.state === 'idle') {
      searchParams.delete(PARAM_KEYS.FORCE_REVALIDATE);
      setSearchParams(searchParams, { preventScrollReset: true });
    }
  }, [isForceRevalidatePresent, navigation.state]);
};

export default useSyncForceRevalidate;
