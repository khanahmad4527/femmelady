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
import { Fragment, useState } from 'react';
import { useOutletContext } from 'react-router';

import {
  BRANDS_WITH_ID_MAP,
  CATEGORIES_WITH_ID_MAP,
  DEFAULT_PRODUCT_PAGE,
  FORCE_REVALIDATE_MAP,
  PARAM_KEYS,
  PRE_PARAM_KEYS
} from '~/constant';
import useTranslation from '~/hooks/useTranslation';
import { OutletContext } from '~/types';
import { getPriceRange, getRating } from '~/utils';

const ProductsFilterBy = ({ render }: { render?: 'mobile' | 'desktop' }) => {
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();
  const t = useTranslation();

  const clearSearchParams = () => {
    // Check if there are any search parameters
    if (Array.from(searchParams.keys()).length > 0) {
      // Create a new URLSearchParams instance to clear all parameters
      const newSearchParams = new URLSearchParams();
      // Set the desired parameter

      newSearchParams.set(
        PARAM_KEYS.FORCE_REVALIDATE,
        FORCE_REVALIDATE_MAP.GLOBAL
      );
      // Update the URL with the new parameters
      setSearchParams(newSearchParams, { preventScrollReset: true });
    }
  };

  const productsFilterByAccordionData = [
    {
      value: PARAM_KEYS.CATEGORIES,
      label: t('products.category'),
      component: <CategoryFilter />
    },
    {
      value: PARAM_KEYS.PRICE,
      label: t('products.price'),
      component: <PriceFilter />
    },
    {
      value: PARAM_KEYS.BRANDS,
      label: t('products.brand'),
      component: <BrandFilter />
    },
    {
      value: PARAM_KEYS.RATING,
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
    <Fragment key={item.value}>
      <Menu.Label>{item.label}</Menu.Label>
      <Menu.Item value={item.value}>{item?.component}</Menu.Item>
    </Fragment>
  ));

  return render === 'mobile' ? (
    <Group hiddenFrom="md">
      <Menu shadow="md" width={300}>
        <Menu.Target>
          <Button>{t('products.filterBy')}</Button>
        </Menu.Target>

        <Menu.Dropdown>{menuItems}</Menu.Dropdown>
      </Menu>

      <Button onClick={clearSearchParams}>{t('products.clearFilter')}</Button>
    </Group>
  ) : (
    <Box visibleFrom="md">
      <Group>
        <Text>{t('products.filterBy')}</Text>
        <Button onClick={clearSearchParams}>{t('products.clearFilter')}</Button>
      </Group>
      <Accordion multiple defaultValue={Array.from(searchParams.keys())}>
        {accordionItems}
      </Accordion>
    </Box>
  );
};

export default ProductsFilterBy;

const RatingFilter = () => {
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();
  const [value, setValue] = useState(getRating({ searchParams }) ?? 3);

  const handleSearch = (v: number) => {
    if (value !== v) {
      searchParams.set(PARAM_KEYS.PAGE, String(DEFAULT_PRODUCT_PAGE)); // To reset the page to 1
      searchParams.set(PARAM_KEYS.RATING, String(v));
      searchParams.set(
        PARAM_KEYS.FORCE_REVALIDATE,
        FORCE_REVALIDATE_MAP.GLOBAL
      );
      setSearchParams(searchParams, { preventScrollReset: true });
    }
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
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();
  const t = useTranslation();

  const brandNamesWithSlugs = [
    { label: t('brands.veraLuxe'), value: BRANDS_WITH_ID_MAP['vera-luxe'].key },
    {
      label: t('brands.moniqueCouture'),
      value: BRANDS_WITH_ID_MAP['monique-couture'].key
    },
    {
      label: t('brands.pristineVows'),
      value: BRANDS_WITH_ID_MAP['pristine-vows'].key
    },
    {
      label: t('brands.crimsonSoles'),
      value: BRANDS_WITH_ID_MAP['crimson-soles'].key
    },
    {
      label: t('brands.jewelHeels'),
      value: BRANDS_WITH_ID_MAP['jewel-heels'].key
    },
    {
      label: t('brands.sophiaGrace'),
      value: BRANDS_WITH_ID_MAP['sophia-grace'].key
    },
    {
      label: t('brands.aromaLuxe'),
      value: BRANDS_WITH_ID_MAP['aroma-luxe'].key
    },
    {
      label: t('brands.glowEssence'),
      value: BRANDS_WITH_ID_MAP['glow-essence'].key
    },
    {
      label: t('brands.luminousBliss'),
      value: BRANDS_WITH_ID_MAP['luminous-bliss'].key
    },
    { label: t('brands.chantelle'), value: BRANDS_WITH_ID_MAP.chantelle.key },
    {
      label: t('brands.divineElegance'),
      value: BRANDS_WITH_ID_MAP['divine-elegance'].key
    },
    {
      label: t('brands.oliviaDeLuxe'),
      value: BRANDS_WITH_ID_MAP['olivia-de-luxe'].key
    },
    { label: t('brands.luxeCo'), value: BRANDS_WITH_ID_MAP['luxe-co'].key },
    { label: t('brands.caratierre'), value: BRANDS_WITH_ID_MAP.caratierre.key },
    {
      label: t('brands.velvetCharms'),
      value: BRANDS_WITH_ID_MAP['velvet-charms'].key
    },
    {
      label: t('brands.elyseBags'),
      value: BRANDS_WITH_ID_MAP['elyse-bags'].key
    },
    {
      label: t('brands.cherieLuxe'),
      value: BRANDS_WITH_ID_MAP['cherie-luxe'].key
    },
    {
      label: t('brands.gildedGrace'),
      value: BRANDS_WITH_ID_MAP['gilded-grace'].key
    },
    {
      label: t('brands.scentNoire'),
      value: BRANDS_WITH_ID_MAP['scent-noire'].key
    },
    {
      label: t('brands.dameFleur'),
      value: BRANDS_WITH_ID_MAP['dame-fleur'].key
    },
    { label: t('brands.laBelle'), value: BRANDS_WITH_ID_MAP['la-belle'].key },
    {
      label: t('brands.timelessLady'),
      value: BRANDS_WITH_ID_MAP['timeless-lady'].key
    },
    {
      label: t('brands.crystalOrb'),
      value: BRANDS_WITH_ID_MAP['crystal-orb'].key
    },
    {
      label: t('brands.radiantMoments'),
      value: BRANDS_WITH_ID_MAP['radiant-moments'].key
    }
  ];

  const handleBrandSearch = (value: string) => {
    const currentBrands = searchParams.getAll(PARAM_KEYS.BRANDS);
    const updatedBrands = currentBrands.includes(value)
      ? currentBrands.filter(brand => brand !== value) // Remove if already selected
      : [...currentBrands, value]; // Add new brand

    searchParams.delete(PARAM_KEYS.BRANDS); // Clear existing values

    // Append updated categories back
    updatedBrands.forEach(brand =>
      searchParams.append(PARAM_KEYS.BRANDS, brand)
    );
    searchParams.set(PARAM_KEYS.PAGE, String(DEFAULT_PRODUCT_PAGE)); // To reset the page to 1
    searchParams.set(PARAM_KEYS.FORCE_REVALIDATE, FORCE_REVALIDATE_MAP.GLOBAL);
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <ScrollArea h={250}>
      <Stack gap={'sm'}>
        {brandNamesWithSlugs.map(n => {
          const isSelected = searchParams
            .getAll(PARAM_KEYS.BRANDS)
            .includes(n.value);

          return (
            <Button
              key={n.value}
              variant={isSelected ? 'filled' : 'light'}
              color="primary"
              onClick={() => handleBrandSearch(n.value)}
            >
              {n.label}
            </Button>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};

const CategoryFilter = () => {
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();
  const t = useTranslation();

  const categoriesWithSlugs = [
    {
      label: t('products.filter.weddingDresses'),
      value: CATEGORIES_WITH_ID_MAP['wedding-dresses'].key
    },
    {
      label: t('products.filter.shoes'),
      value: CATEGORIES_WITH_ID_MAP.shoes.key
    },
    {
      label: t('products.filter.candles'),
      value: CATEGORIES_WITH_ID_MAP.candles.key
    },
    {
      label: t('products.filter.dresses'),
      value: CATEGORIES_WITH_ID_MAP.dresses.key
    },
    {
      label: t('products.filter.jewelry'),
      value: CATEGORIES_WITH_ID_MAP.jewelry.key
    },
    {
      label: t('products.filter.bags'),
      value: CATEGORIES_WITH_ID_MAP.bags.key
    },
    {
      label: t('products.filter.perfumes'),
      value: CATEGORIES_WITH_ID_MAP.perfumes.key
    },
    {
      label: t('products.filter.watches'),
      value: CATEGORIES_WITH_ID_MAP.watches.key
    },
    {
      label: t('products.filter.beautyWellness'),
      value: CATEGORIES_WITH_ID_MAP['beauty-and-wellness'].key
    },
    {
      label: t('products.filter.homeFurniture'),
      value: CATEGORIES_WITH_ID_MAP['home-and-furniture'].key
    }
  ];

  const handleCategorySearch = (value: string) => {
    const currentCategories = searchParams.getAll(PARAM_KEYS.CATEGORIES);
    const updatedCategories = currentCategories.includes(value)
      ? currentCategories.filter(category => category !== value) // Remove if already selected
      : [...currentCategories, value]; // Add new category

    searchParams.delete(PARAM_KEYS.CATEGORIES); // Clear existing values

    // Append updated categories back
    updatedCategories.forEach(category =>
      searchParams.append(PARAM_KEYS.CATEGORIES, category)
    );
    searchParams.set(PARAM_KEYS.PAGE, String(DEFAULT_PRODUCT_PAGE)); // To reset the page to 1
    searchParams.set(PARAM_KEYS.FORCE_REVALIDATE, FORCE_REVALIDATE_MAP.GLOBAL);
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <ScrollArea h={250}>
      <Stack gap={'sm'}>
        {categoriesWithSlugs.map(n => {
          const isSelected = searchParams
            .getAll(PARAM_KEYS.CATEGORIES)
            .includes(n.value);

          return (
            <Button
              key={n.value}
              variant={isSelected ? 'filled' : 'light'}
              color="primary"
              onClick={() => handleCategorySearch(n.value)}
            >
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

  const handleSearch = useDebouncedCallback((v: [number, number]) => {
    searchParams.set(PARAM_KEYS.PRICE, String(v));
    searchParams.set(
      PRE_PARAM_KEYS.PRICE,
      String(getPriceRange({ searchParams }))
    );
    searchParams.set(PARAM_KEYS.PAGE, String(DEFAULT_PRODUCT_PAGE)); // To reset the page to 1
    searchParams.set(PARAM_KEYS.FORCE_REVALIDATE, FORCE_REVALIDATE_MAP.GLOBAL);
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
