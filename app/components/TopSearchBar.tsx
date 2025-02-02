import {
  Box,
  Group,
  Image,
  Loader,
  Menu,
  ScrollArea,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import {
  useClickOutside,
  useDebouncedCallback,
  useHover
} from '@mantine/hooks';
import React, { memo, useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router';
import { PARAMS, PATHS } from '~/constant';
import getStringDto from '~/dto/getStringDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { IconSearch } from '~/icons';
import { Env, Product, ProductTranslation } from '~/types';
import {
  buildLocalizedLink,
  formatCurrency,
  getImageUrl,
  getSingleTranslation
} from '~/utils';

const TopSearchBar = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [previousSearchValue, setPreviousSearchValue] = useState('');
  const [opened, setOpened] = useState(true);
  const ref = useClickOutside(() => setOpened(false));

  const fetcher = useFetcher<{ products: Product[]; searchQuery: string }>();

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value !== previousSearchValue && value.length >= 3) {
      fetcher.load(`/${currentLanguage}/search-query?index&q=${value}`);
    }
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    setSearchValue(value);
    handleSearch(value);
  };

  // An effect for appending data to items state
  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return;
    }

    if (fetcher.data?.products) {
      setSearchResults(fetcher.data.products);
      setPreviousSearchValue(fetcher.data?.searchQuery);
    }
  }, [fetcher.data]);

  const canShowDropDown = Boolean(
    searchValue.length &&
      searchResults.length &&
      searchValue === previousSearchValue &&
      opened
  );

  return (
    <Box w={'100%'} ref={ref}>
      <Menu
        opened={canShowDropDown}
        shadow="md"
        width={300}
        styles={{ dropdown: { padding: 0, borderRadius: 0 } }}
      >
        <Menu.Target>
          <TextInput
            w={'100%'}
            placeholder={t('header.search')}
            value={searchValue}
            onClick={() => setOpened(true)}
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
        {searchResults.length > 0 && (
          <Menu.Dropdown>
            <Stack
              mah={250}
              style={{
                overflowY: 'auto' // Enables scrolling if content exceeds 250px
              }}
              gap={0}
              onClick={() => {
                setSearchValue('');
                setPreviousSearchValue('');
                setSearchResults([]);
              }}
            >
              {searchResults.map(p => {
                return <Card key={p.id} {...p} />;
              })}
            </Stack>
          </Menu.Dropdown>
        )}
      </Menu>
    </Box>
  );
};

export default memo(TopSearchBar);

const Card = (p: Product) => {
  const { hovered, ref } = useHover();
  const { currentLanguage } = useCurrentLanguage();
  const { env } = useHeaderFooterContext();

  const translation = getSingleTranslation(
    p.translations
  ) as ProductTranslation;

  return (
    <Link
      to={buildLocalizedLink({
        baseUrl: env?.APP_URL!,
        currentLanguage,
        paths: [PATHS.products, translation?.slug ?? p?.id, PATHS.reviews],
        queryParams: {
          'force-validate': 'global'
        }
      })}
      style={{ textDecoration: 'none' }}
    >
      <Group
        p={'xs'}
        bg={hovered ? 'primary.5' : 'white'}
        ref={ref as any}
        wrap={'nowrap'}
        align={'flex-start'}
      >
        <Box h={50}>
          <Image
            h={'100%'}
            fit={'contain'}
            src={getImageUrl({
              id: hovered
                ? getStringDto(p?.feature_image_2)
                : getStringDto(p?.feature_image_1),
              DIRECTUS_URL: env?.DIRECTUS_URL
            })}
            alt={translation.title!}
            loading={'lazy'}
          />
        </Box>

        <Box>
          <Text tt={'capitalize'} c={hovered ? 'white' : 'black'}>
            {translation?.title}
          </Text>
          <Text c={hovered ? 'white' : 'black'}>
            {formatCurrency({
              currentLanguage,
              value: p?.price as number
            })}
          </Text>
        </Box>
      </Group>
    </Link>
  );
};
