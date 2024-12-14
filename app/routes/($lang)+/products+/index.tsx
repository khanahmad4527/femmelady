import { Box, Grid, Group, SimpleGrid, Stack } from '@mantine/core';

import ProductCard from '~/components/products/ProductCard';
import ProductsFilterBy from '~/components/products/ProductsFilterBy';
import ProductsPerPage from '~/components/products/ProductsPerPage';
import ProductsSortBy from '~/components/products/ProductsSortBy';
import { PRODUCTS } from '~/constant';

const Products = () => {
  return (
    <Stack>
      <Box ml={{ base: 'none', md: 'auto' }}>
        <Group mt={'md'} align="flex-end">
          <ProductsFilterBy render={'mobile'} />
          <ProductsPerPage />
          <ProductsSortBy />
        </Group>
      </Box>

      <Grid>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <ProductsFilterBy />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 10 }}>
          <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
            {PRODUCTS.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Products;
