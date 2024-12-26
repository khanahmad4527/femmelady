import {
  Accordion,
  Box,
  Button,
  Group,
  Menu,
  RangeSlider,
  Rating,
  ScrollArea,
  Stack,
  Text
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router';
import { PARAMS } from '~/constant';

import useTranslation from '~/hooks/useTranslation';
import { OutletContext } from '~/types/types';
import { getPriceRange, getRating } from '~/utils';

const ProductsFilterBy = ({ render }: { render?: 'mobile' | 'desktop' }) => {
  const [, setSearchParams] = useSearchParams();
  const t = useTranslation();

  const clearSearchParams = () => {
    // Clears all search params from the URL
    setSearchParams(undefined);
  };

  const productsFilterByAccordionData = [
    {
      value: 'category',
      label: t('products.category'),
      component: <CategoryFilter />
    },
    {
      value: 'price',
      label: t('products.price'),
      component: <PriceFilter />
    },
    {
      value: 'brand',
      label: t('products.brand'),
      component: <BrandFilter />
    },
    {
      value: 'rating',
      label: t('products.rating'),
      component: <RatingFilter />
    }
  ];

  const accordionItems = productsFilterByAccordionData.map(item => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.label}</Accordion.Control>
      <Accordion.Panel>{item?.component}</Accordion.Panel>
    </Accordion.Item>
  ));

  const menuItems = productsFilterByAccordionData.map(item => (
    <>
      <Menu.Label>{item.label}</Menu.Label>
      <Menu.Item key={item.value} value={item.value}>
        {item?.component}
      </Menu.Item>
    </>
  ));

  return render === 'mobile' ? (
    <Box display={{ base: 'block', md: 'none' }}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button fullWidth>{t('products.filterBy')}</Button>
        </Menu.Target>

        <Menu.Dropdown>{menuItems}</Menu.Dropdown>
      </Menu>
    </Box>
  ) : (
    <Box display={{ base: 'none', md: 'block' }}>
      <Group>
        <Text>{t('products.filterBy')}</Text>
        <Button onClick={clearSearchParams}>{t('products.clearFilter')}</Button>
      </Group>
      <Accordion>{accordionItems}</Accordion>
    </Box>
  );
};

export default ProductsFilterBy;

const RatingFilter = () => {
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();
  const [value, setValue] = useState(getRating({ searchParams }) ?? 3);

  const handleSearch = (value: number) => {
    searchParams.set(PARAMS.RATING, String(value));
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Rating
      value={value}
      onChange={e => {
        handleSearch(e);
        setValue(e);
      }}
      size="sm"
      color={'primary'}
    />
  );
};

const BrandFilter = () => {
  const brandNamesWithSlugs = [
    { label: 'Vera Luxe', value: 'vera-luxe' },
    { label: 'Monique Couture', value: 'monique-couture' },
    { label: 'Pristine Vows', value: 'pristine-vows' },
    { label: 'Crimson Soles', value: 'crimson-soles' },
    { label: 'Jewel Heels', value: 'jewel-heels' },
    { label: 'Sophia Grace', value: 'sophia-grace' },
    { label: 'Aroma Luxe', value: 'aroma-luxe' },
    { label: 'Glow Essence', value: 'glow-essence' },
    { label: 'Luminous Bliss', value: 'luminous-bliss' },
    { label: 'Chantelle', value: 'chantelle' },
    { label: 'Divine Elegance', value: 'divine-elegance' },
    { label: 'Olivia de Luxe', value: 'olivia-de-luxe' },
    { label: 'Luxe & Co.', value: 'luxe-co' },
    { label: 'Caratierre', value: 'caratierre' },
    { label: 'Velvet Charms', value: 'velvet-charms' },
    { label: 'Elyse Bags', value: 'elyse-bags' },
    { label: 'Chérie Luxe', value: 'cherie-luxe' },
    { label: 'Gilded Grace', value: 'gilded-grace' },
    { label: 'Scent Noire', value: 'scent-noire' },
    { label: 'Dame Fleur', value: 'dame-fleur' },
    { label: 'La Belle', value: 'la-belle' },
    { label: 'Timeless Lady', value: 'timeless-lady' },
    { label: 'Crystal Orb', value: 'crystal-orb' },
    { label: 'Radiant Moments', value: 'radiant-moments' }
  ];

  return (
    <ScrollArea h={250}>
      <Stack gap={'sm'}>
        {brandNamesWithSlugs.map(n => {
          return (
            <Button key={n.value} variant="light" color="primary">
              {n.label}
            </Button>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};

const CategoryFilter = () => {
  const categoriesWithSlugs = [
    { label: 'Wedding Dresses', value: 'wedding-dresses' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Candles', value: 'candles' },
    { label: 'Dresses', value: 'dresses' },
    { label: 'Jewelry', value: 'jewelry' },
    { label: 'Bags', value: 'bags' },
    { label: 'Perfumes', value: 'perfumes' },
    { label: 'Watches', value: 'watches' }
  ];

  return (
    <ScrollArea h={250}>
      <Stack gap={'sm'}>
        {categoriesWithSlugs.map(n => {
          return (
            <Button key={n.value} variant="light" color="primary">
              {n.label}
            </Button>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};

const PriceFilter = () => {
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();
  const [value, setValue] = useState<[number, number]>(
    getPriceRange({ searchParams }) ?? [20, 500]
  );

  const handleSearch = useDebouncedCallback((value: [number, number]) => {
    searchParams.set(PARAMS.PRICE, String(value));
    setSearchParams(searchParams, { preventScrollReset: true });
  }, 1000);

  return (
    <RangeSlider
      min={20}
      max={1000}
      value={value}
      onChange={e => {
        handleSearch(e);
        setValue(e);
      }}
      step={20}
    />
  );
};
