import { Box, Loader, Popover, Text, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import React, { useState } from 'react';
import useTranslation from '~/hooks/useTranslation';
import { IconSearch } from '~/icons';

function getSearchResults(
  query: string
): Promise<{ id: number; title: string }[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        query.trim() === ''
          ? []
          : Array(5)
              .fill(0)
              .map((_, index) => ({
                id: index,
                title: `${query} ${index + 1}`
              }))
      );
    }, 1000);
  });
}

const TopSearchBar = () => {
  const t = useTranslation();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<
    { id: number; title: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    setSearchResults(await getSearchResults(query));
    setLoading(false);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };
  return (
    <Box w={'100%'}>
      <TextInput
        w={'100%'}
        placeholder={t('header.search')}
        value={search}
        onChange={handleChange}
        rightSection={loading ? <Loader size={20} /> : <IconSearch />}
      />

      <Popover
        opened={Boolean(searchResults.length)}
        width={'100%'}
        position="bottom"
        withArrow
        shadow="md"
      >
        <Popover.Dropdown>
          <Text size="xs">
            This is uncontrolled popover, it is opened when button is clicked
          </Text>
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
};

export default TopSearchBar;
