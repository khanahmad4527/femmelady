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
  const [searchParams, setSearchParams] = useSearchParams();
  const t = useTranslation();

  const clearSearchParams = () => {
    // Clears all search params from the URL
    setSearchParams(undefined);
  };

  const productsFilterByAccordionData = [
    {
      value: PARAMS.CATEGORY,
      label: t('products.category'),
      component: <CategoryFilter />
    },
    {
      value: PARAMS.PRICE,
      label: t('products.price'),
      component: <PriceFilter />
    },
    {
      value: PARAMS.BRAND,
      label: t('products.brand'),
      component: <BrandFilter />
    },
    {
      value: PARAMS.RATING,
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
      <Accordion defaultValue={Array.from(searchParams.keys())} multiple>
        {accordionItems}
      </Accordion>
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
  const t = useTranslation();

  const brandNamesWithSlugs = [
    { label: t('brands.veraLuxe'), value: 'vera-luxe' },
    { label: t('brands.moniqueCouture'), value: 'monique-couture' },
    { label: t('brands.pristineVows'), value: 'pristine-vows' },
    { label: t('brands.crimsonSoles'), value: 'crimson-soles' },
    { label: t('brands.jewelHeels'), value: 'jewel-heels' },
    { label: t('brands.sophiaGrace'), value: 'sophia-grace' },
    { label: t('brands.aromaLuxe'), value: 'aroma-luxe' },
    { label: t('brands.glowEssence'), value: 'glow-essence' },
    { label: t('brands.luminousBliss'), value: 'luminous-bliss' },
    { label: t('brands.chantelle'), value: 'chantelle' },
    { label: t('brands.divineElegance'), value: 'divine-elegance' },
    { label: t('brands.oliviaDeLuxe'), value: 'olivia-de-luxe' },
    { label: t('brands.luxeCo'), value: 'luxe-co' },
    { label: t('brands.caratierre'), value: 'caratierre' },
    { label: t('brands.velvetCharms'), value: 'velvet-charms' },
    { label: t('brands.elyseBags'), value: 'elyse-bags' },
    { label: t('brands.cherieLuxe'), value: 'cherie-luxe' },
    { label: t('brands.gildedGrace'), value: 'gilded-grace' },
    { label: t('brands.scentNoire'), value: 'scent-noire' },
    { label: t('brands.dameFleur'), value: 'dame-fleur' },
    { label: t('brands.laBelle'), value: 'la-belle' },
    { label: t('brands.timelessLady'), value: 'timeless-lady' },
    { label: t('brands.crystalOrb'), value: 'crystal-orb' },
    { label: t('brands.radiantMoments'), value: 'radiant-moments' }
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
  const t = useTranslation();

  const categoriesWithSlugs = [
    { label: t('products.filter.weddingDresses'), value: 'wedding-dresses' },
    { label: t('products.filter.shoes'), value: 'shoes' },
    { label: t('products.filter.candles'), value: 'candles' },
    { label: t('products.filter.dresses'), value: 'dresses' },
    { label: t('products.filter.jewelry'), value: 'jewelry' },
    { label: t('products.filter.bags'), value: 'bags' },
    { label: t('products.filter.perfumes'), value: 'perfumes' },
    { label: t('products.filter.watches'), value: 'watches' }
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
