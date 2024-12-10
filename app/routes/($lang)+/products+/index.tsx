import { Box, Group } from '@mantine/core';
import ProductsFilterBy from '~/components/products/ProductsFilterBy';
import ProductsPerPage from '~/components/products/ProductsPerPage';
import ProductsSortBy from '~/components/products/ProductsSortBy';

const Products = () => {
  return (
    <Box>
      <Group>
        <ProductsPerPage />
        <ProductsSortBy />
      </Group>
      <ProductsFilterBy />
    </Box>
  );
};

export default Products;
