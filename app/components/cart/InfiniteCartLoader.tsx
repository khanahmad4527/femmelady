import { Button, Group, Skeleton, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router';
import HeaderCartCard from './HeaderCartCard';
import { buildLocalizedLink } from '~/utils';
import useTranslation from '~/hooks/useTranslation';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { Cart } from '~/types';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import { PATHS } from '~/constant';

type ItemsResponse = { carts: Cart[]; page: number };

const initialPage = 1;

const InfiniteCartLoader = ({ close }: { close: () => void }) => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const fetcher = useFetcher<ItemsResponse>();
  const { carts, setCarts, env } = useHeaderFooterContext();
  const [noLoadMore, setNoLoadMore] = useState(false); // Useful to save query, if no data return from the query then we cn consider there is no more data to load

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

    if (fetcher.data?.carts.length === 0) {
      setNoLoadMore(true);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (!noLoadMore) {
      const query = `/${currentLanguage}/load-carts?index&page=1`;

      fetcher.load(query);
    }
  }, []);

  return (
    <Stack>
      {carts.map(c => (
        <HeaderCartCard key={c.id} cart={c} close={close} />
      ))}

      {fetcher.state === 'loading' &&
        Array.from({ length: 6 }).map((_, index) => (
          <Group wrap={'nowrap'} h={100} align={'start'} key={index}>
            <Skeleton w={'30%'} h={'100%'} radius={0} />
            <Stack w={'70%'}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} w={'100%'} height={8} radius={0} />
              ))}
            </Stack>
          </Group>
        ))}
      {carts.length > 0 && !noLoadMore && (
        <Button
          variant={'light'}
          fullWidth
          onClick={() => {
            const page = fetcher.data ? fetcher.data.page + 1 : initialPage + 1;
            const query = `/${currentLanguage}/load-carts?index&page=${page}`;

            fetcher.load(query);
          }}
        >
          {t('common.loadMore')}
        </Button>
      )}

      {carts.length > 0 && (
        <Button
          component={Link}
          to={buildLocalizedLink({
            baseUrl: env?.APP_URL!,
            currentLanguage,
            paths: [PATHS.checkout]
          })}
          color="black"
          fullWidth
          onClick={close}
        >
          {t('checkout.goToCheckout')}
        </Button>
      )}
    </Stack>
  );
};

export default InfiniteCartLoader;
