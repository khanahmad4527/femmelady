import { Box, Grid, Group, SimpleGrid, Stack } from '@mantine/core';
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

      {/* <Box display={{ base: 'none', md: 'block' }}>
        <ProductsFilterBy />
      </Box> */}

      <Grid>
        <Grid.Col span={{ base: 12, md: 2 }}>
          <ProductsFilterBy />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 10 }}>
          <SimpleGrid cols={3}>
            {new Array(20).fill('*').map((_, i) => (
              <Box bg="red" h={300}>
                {++i}
              </Box>
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Products;
