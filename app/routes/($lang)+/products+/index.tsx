import {
  Box,
  Grid,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core';

import { useLoaderData } from 'react-router';

import ProductCard from '~/components/products/ProductCard';
import ProductsFilterBy from '~/components/products/ProductsFilterBy';
import ProductsPerPage from '~/components/products/ProductsPerPage';
import ProductsSortBy from '~/components/products/ProductsSortBy';

import useScrollToProduct from '~/hooks/useScrollToProduct';
import useTranslation from '~/hooks/useTranslation';
import { getProducts } from '~/server/api';
import commonClasses from '~/styles/Common.module.scss';
import { Route } from '../+types/_index';
import { FALL_BACK_LANG, LANGUAGE_TO_LOCALE_LANGUAGE } from '~/constant';
import { getLanguageCode } from '~/utils';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const products = await getProducts({ languageCode });

  return { products };
};

const Products = () => {
  const { products } = useLoaderData<typeof loader>();

  const productCardRefs = useScrollToProduct({ products });

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
