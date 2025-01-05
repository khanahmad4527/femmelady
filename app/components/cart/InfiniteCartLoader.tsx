import { Button, Center, Loader, Stack } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Link, useFetcher } from 'react-router';
import HeaderCartCard from './HeaderCartCard';
import { buildLocalizedLink } from '~/utils';
import useTranslation from '~/hooks/useTranslation';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';

type Data = { id: number; thumb: string };
type ItemsResponse = { carts: Data[]; page: number };

const initialItems: ItemsResponse = { page: 1, carts: [] };

const InfiniteCartLoader = () => {
  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();

  const fetcher = useFetcher<ItemsResponse>();
  const [carts, setCarts] = useState<Data[]>(initialItems.carts);

  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return;
    }

    if (fetcher.data?.carts) {
      const newCarts = fetcher.data.carts;
      setCarts(prevCarts => [...prevCarts, ...newCarts]);
    }
  }, [fetcher.data]);

  useEffect(() => {
    const query = '/load-carts?index&page=1';

    fetcher.load(query);
  }, []);

  console.log({ carts });

  return (
    <InfiniteScroller
      loadNext={() => {
        const page = fetcher.data
          ? fetcher.data.page + 1
          : initialItems.page + 1;
        const query = `/load-carts?index&page=${page}`;

        fetcher.load(query);
      }}
      loading={fetcher.state === 'loading'}
    >
      <Stack>
        {carts.map((i, index) => (
          <HeaderCartCard key={index} />
        ))}

        {fetcher.state === 'loading' && (
          <Center>
            <Loader />
          </Center>
        )}

        {carts.length > 0 && (
          <Button
            component={Link}
            to={buildLocalizedLink({ currentLanguage, paths: ['checkout'] })}
            color="black"
            fullWidth
            onClick={close}
          >
            {t('checkout.goToCheckout')}
          </Button>
        )}
      </Stack>
    </InfiniteScroller>
  );
};

export default InfiniteCartLoader;

const InfiniteScroller = (props: {
  children: any;
  loading: boolean;
  loadNext: () => void;
}) => {
  const { children, loading, loadNext } = props;
  const scrollListener = useRef(loadNext);

  useEffect(() => {
    scrollListener.current = loadNext;
  }, [loadNext]);

  const onScroll = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollDifference = Math.floor(window.innerHeight + window.scrollY);
    const scrollEnded = documentHeight == scrollDifference;

    if (scrollEnded && !loading) {
      scrollListener.current();
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <>{children}</>;
};
