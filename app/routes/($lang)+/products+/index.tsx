import {
  Box,
  Grid,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core';
import { useEffect, useRef } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';

import ProductCard from '~/components/products/ProductCard';
import ProductsFilterBy from '~/components/products/ProductsFilterBy';
import ProductsPerPage from '~/components/products/ProductsPerPage';
import ProductsSortBy from '~/components/products/ProductsSortBy';
import { PARAMS } from '~/constant';
import useTranslation from '~/hooks/useTranslation';
import { getProducts } from '~/server/api';
import commonClasses from '~/styles/Common.module.scss';

export const loader = async () => {
  const products = await getProducts();

  return { products };
};

const Products = () => {
  const { products } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsProductId = searchParams.get(PARAMS.PRODUCT_ID);
  const productCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const t = useTranslation();

  useEffect(() => {
    // Find the index of the product card that matches the productId from params
    const targetIndex = products.findIndex(
      product => product.id === paramsProductId
    );

    // If a valid product is found, scroll to the corresponding card
    if (targetIndex !== -1 && productCardRefs.current[targetIndex]) {
      productCardRefs.current[targetIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, []);

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
            {products.map((p, index) => (
              <div
                key={p.id}
                ref={el => {
                  // No return value here; just assign the element to the ref array
                  productCardRefs.current[index] = el;
                }}
              >
                <ProductCard {...p} />
              </div>
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
      <Pagination total={10} m={'auto'} color={'black'} />
    </Stack>
  );
};

export default Products;
