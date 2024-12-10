import { Box, Group, Stack } from '@mantine/core';
import ProductsFilterBy from '~/components/products/ProductsFilterBy';
import ProductsPerPage from '~/components/products/ProductsPerPage';
import ProductsSortBy from '~/components/products/ProductsSortBy';

const Products = () => {
  return (
    <Stack>
      <Box ml={{ base: 'none', md: 'auto' }}>
        <Box display={{ base: 'block', md: 'none' }}>
          <ProductsFilterBy />
        </Box>

        <Group>
          <ProductsPerPage />
          <ProductsSortBy />
        </Group>
      </Box>

      <Box display={{ base: 'none', md: 'block' }}>
        <ProductsFilterBy />
      </Box>
    </Stack>
  );
};

export default Products;
