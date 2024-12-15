import {
  Box,
  Grid,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core';

import ProductCard from '~/components/products/ProductCard';
import ProductsFilterBy from '~/components/products/ProductsFilterBy';
import ProductsPerPage from '~/components/products/ProductsPerPage';
import ProductsSortBy from '~/components/products/ProductsSortBy';
import { PRODUCTS } from '~/constant';
import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';

const Products = () => {
  const t = useTranslation();
  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Group align="flex-end">
        <Text span>
          {t('products.resultsCount', {
            count: <Text span>13</Text>
          })}
        </Text>

        <Box ml={{ base: 'none', md: 'auto' }}>
          <Group align="flex-end">
            <ProductsFilterBy render={'mobile'} />
            <ProductsPerPage />
            <ProductsSortBy />
          </Group>
        </Box>
      </Group>

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
      <Pagination total={10} m={'auto'} color={'black'} />
    </Stack>
  );
};

export default Products;
