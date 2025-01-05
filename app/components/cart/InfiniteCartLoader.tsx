import { Button, Center, Loader, Stack } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { Link, useFetcher } from 'react-router';
import HeaderCartCard from './HeaderCartCard';
import { buildLocalizedLink } from '~/utils';
import useTranslation from '~/hooks/useTranslation';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { Cart } from '~/types';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';

type ItemsResponse = { carts: Cart[]; page: number };

const initialPage = 1;

const InfiniteCartLoader = () => {
  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();

  const fetcher = useFetcher<ItemsResponse>();
  const { carts, setCarts } = useHeaderFooterContext();

  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return;
    }

    if (fetcher.data?.carts) {
      const newCarts = fetcher.data.carts;
      setCarts(prevCarts => {
        // Create a Map to track unique items by their `id`
        const cartMap = new Map();

        // Add previous carts to the Map
        prevCarts.forEach(cart => cartMap.set(cart.id, cart));

        // Add new carts to the Map (will overwrite duplicates by id)
        newCarts.forEach(cart => cartMap.set(cart.id, cart));

        // Return the unique carts as an array
        return Array.from(cartMap.values());
      });
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (!carts.length) {
      const query = '/load-carts?index&page=1';

      fetcher.load(query);
    }
  }, []);

  return (
    <InfiniteScroller
      loadNext={() => {
        const page = fetcher.data ? fetcher.data.page + 1 : initialPage + 1;
        const query = `/load-carts?index&page=${page}`;

        fetcher.load(query);
      }}
      loading={fetcher.state === 'loading'}
    >
      <Stack>
        {carts.map(c => (
          <HeaderCartCard key={c.id} cart={c} />
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
