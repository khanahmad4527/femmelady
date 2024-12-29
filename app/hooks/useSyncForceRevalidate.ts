import { useEffect } from 'react';
import { SetURLSearchParams, useOutletContext } from 'react-router';
import { PARAMS } from '~/constant';
import { OutletContext } from '~/types/types';

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
  const isForceRevalidatePresent = searchParams.get(PARAMS.FORCE_REVALIDATE);

  useEffect(() => {
    if (isForceRevalidatePresent) {
      searchParams.delete(PARAMS.FORCE_REVALIDATE);
      setSearchParams(searchParams, { preventScrollReset: true });
    }
  }, [isForceRevalidatePresent]);
};

export default useSyncForceRevalidate;
