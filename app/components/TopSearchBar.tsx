import {
  Box,
  Grid,
  Image,
  Loader,
  Menu,
  Text,
  TextInput,
  useMatches
} from '@mantine/core';
import { useDebouncedCallback, useHover } from '@mantine/hooks';
import React, { memo, useEffect, useState } from 'react';
import { href, Link, useFetcher } from 'react-router';
import { PATHS } from '~/constant';
import getStringDto from '~/dto/getStringDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { IconSearch } from '~/icons';
import { Product, ProductTranslation } from '~/types';
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
    <Menu
      opened={canShowDropDown}
      onChange={setOpened}
      shadow="md"
      styles={{ dropdown: { padding: 0, borderRadius: 0 } }}
      width={useMatches({ base: 300, sm: 500 })}
    >
      <Menu.Target>
        <TextInput
          w={'100%'}
          placeholder={t('header.search')}
          value={searchValue}
          onClick={() => setOpened(true)}
          onChange={handleChange}
          rightSection={
            fetcher.state === 'loading' ? <Loader size={20} /> : <IconSearch />
          }
        />
      </Menu.Target>

      {searchResults.length > 0 && (
        <Menu.Dropdown
          mah={250}
          style={{
            overflowY: 'auto' // Enables scrolling if content exceeds 250px
          }}
          onClick={() => {
            setSearchValue('');
            setPreviousSearchValue('');
            setSearchResults([]);
          }}
        >
          {searchResults.map(p => {
            return <Card key={p.id} {...p} />;
          })}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

export default memo(TopSearchBar);

const Card = (p: Product) => {
  const { hovered, ref: hoveredRef } = useHover();
  const { currentLanguage } = useCurrentLanguage();
  const { env } = useHeaderFooterContext();

  const translation = getSingleTranslation(
    p.translations
  ) as ProductTranslation;

  return (
    <Link
      prefetch="intent"
      to={buildLocalizedLink({
        baseUrl: href('/:lang?/products/:slug/reviews', {
          lang: currentLanguage,
          slug: translation?.slug ?? p?.id
        }),
        queryParams: {
          'force-validate': 'global'
        }
      })}
      style={{ textDecoration: 'none' }}
    >
      <Grid
        gutter={20}
        p={'xs'}
        bg={hovered ? 'primary.5' : 'white'}
        ref={hoveredRef as any}
        align="center"
      >
        <Grid.Col span={3} h={100} w={150}>
          <Image
            h={'100%'}
            w={'100%'}
            fit={'contain'}
            src={getImageUrl({
              id: hovered
                ? getStringDto(p?.feature_image_2)
                : getStringDto(p?.feature_image_1),
              url: env?.CDN_URL
            })}
            alt={translation.title!}
            loading={'lazy'}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Text tt={'capitalize'} c={hovered ? 'white' : 'black'}>
            {translation?.title}
          </Text>
          <Text c={hovered ? 'white' : 'black'}>
            {formatCurrency({
              currentLanguage,
              value: p?.price as number
            })}
          </Text>
        </Grid.Col>
      </Grid>
    </Link>
  );
};
