import {
  Box,
  Group,
  Image,
  Loader,
  Menu,
  Paper,
  Popover,
  Stack,
  Text,
  TextInput,
  Transition
} from '@mantine/core';
import { useDebouncedCallback, useFetch, useHover } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router';
import getStringDto from '~/dto/getStringDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { IconSearch } from '~/icons';
import { Env, Product, ProductTranslation } from '~/types/types';
import {
  buildLocalizedLink,
  formatCurrency,
  getImageUrl,
  getSingleTranslation
} from '~/utils';

const TopSearchBar = () => {
  const t = useTranslation();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const fetcher = useFetcher();

  console.log({ fetcher });

  const handleSearch = useDebouncedCallback((value: string) => {
    fetcher.load(`/search-query?index&q=${value}`);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value.trim());
    handleSearch(event.currentTarget.value.trim());
  };

  // An effect for appending data to items state
  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return;
    }
  }, [fetcher.data]);

  return (
    <Box w={'100%'}>
      <Menu opened={Boolean(searchResults.length)} shadow="md" width={300}>
        <Menu.Target>
          <TextInput
            w={'100%'}
            placeholder={t('header.search')}
            value={search}
            onChange={handleChange}
            rightSection={
              fetcher.state === 'loading' ? (
                <Loader size={20} />
              ) : (
                <IconSearch />
              )
            }
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Stack>
            {searchResults.map(p => {
              return <Card key={p.id} {...p} />;
            })}
          </Stack>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default TopSearchBar;

const Card = (p: Product) => {
  const { hovered, ref } = useHover();
  const currentLanguage = useCurrentLanguage();
  const { env } = useHeaderFooterContext();

  const translation = getSingleTranslation(
    p.translations
  ) as ProductTranslation;

  return (
    <Group wrap={'nowrap'} align={'flex-start'}>
      <Box
        ref={ref as any}
        h={50}
        component={Link}
        to={buildLocalizedLink({
          currentLanguage,
          paths: ['products', translation?.slug ?? p?.id, 'reviews']
        })}
      >
        <Image
          h={'100%'}
          fit={'contain'}
          src={getImageUrl({
            id: hovered
              ? getStringDto(p?.feature_image_2)
              : getStringDto(p?.feature_image_1),
            DIRECTUS_URL: (env as Env)?.DIRECTUS_URL
          })}
          alt={translation.title!}
          loading={'lazy'}
        />
      </Box>

      <Box>
        <Text tt={'capitalize'}>{translation?.title}</Text>
        <Text>
          {formatCurrency({
            currentLanguage,
            value: p?.price as number
          })}
        </Text>
      </Box>
    </Group>
  );
};
