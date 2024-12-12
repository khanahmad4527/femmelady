import {
  Accordion,
  Badge,
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
import { useState } from 'react';
import useTranslation from '~/hooks/useTranslation';

const ProductsFilterBy = ({ render }: { render?: 'mobile' | 'desktop' }) => {
  const t = useTranslation();

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

        <Menu.Dropdown>
          {/* <Menu.Label>{t('products.filterBy')}</Menu.Label> */}
          {menuItems}
        </Menu.Dropdown>
      </Menu>
    </Box>
  ) : (
    <Box display={{ base: 'none', md: 'block' }}>
      <Group>
        <Text>{t('products.filterBy')}</Text>
        <Button>{t('products.clearFilter')}</Button>
      </Group>
      <Accordion defaultValue="Apples">{accordionItems}</Accordion>
    </Box>
  );
};

export default ProductsFilterBy;

const RatingFilter = () => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <Stack gap="sm">
      {ratings.map(stars => (
        <Rating key={stars} value={stars} readOnly size="sm" />
      ))}
    </Stack>
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
            <Badge variant="light" color="primary">
              {n.label}
            </Badge>
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
            <Badge variant="light" color="primary">
              {n.label}
            </Badge>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};

const PriceFilter = () => {
  const [value, setValue] = useState<[number, number]>([20, 500]);

  return (
    <RangeSlider
      min={20}
      max={500}
      value={value}
      onChange={setValue}
      step={10}
    />
  );
};
