import {
  Box,
  Grid,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core';

import {
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext
} from 'react-router';

import ProductCard from '~/components/products/ProductCard';
import ProductsFilterBy from '~/components/products/ProductsFilterBy';
import ProductsPerPage from '~/components/products/ProductsPerPage';
import ProductsSortBy from '~/components/products/ProductsSortBy';

import useScrollToProduct from '~/hooks/useScrollToProduct';
import useTranslation from '~/hooks/useTranslation';
import { getProducts } from '~/server/api';
import commonClasses from '~/styles/Common.module.scss';
import { Route } from '../+types/_index';
import {
  getAverageRatingRange,
  getBrandsId,
  getCategoriesId,
  getLanguageCode,
  getLimit,
  getPage,
  getPriceRange,
  getRating,
  getSort,
  shouldRevalidateLogic
} from '~/utils';
import { OutletContext } from '~/types';
import { FORCE_REVALIDATE_MAP, PARAMS } from '~/constant';
import { useEffect, useState } from 'react';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl
}) => {
  // Use shared logic
  const commonResult = shouldRevalidateLogic(nextUrl, currentUrl);

  if (commonResult) {
    return true; // If shared logic already decided to revalidate, no need to check further
  }

  return false;
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const priceRange = getPriceRange({ request });

  const averageRatingRange = getAverageRatingRange(getRating({ request }));

  const categoriesId = getCategoriesId({ request });

  const brandsId = getBrandsId({ request });

  const productsPerPage = getLimit({ request });

  const currentPage = getPage({ request });

  const productSort = getSort({ request });

  const { products, totalProductCount } = await getProducts({
    route: 'products',
    languageCode,
    priceRange,
    averageRatingRange,
    productsPerPage,
    currentPage,
    productSort,
    categoriesId,
    brandsId
  });

  return { products, totalProductCount };
};

const Products = () => {
  const { products, totalProductCount } = useLoaderData<typeof loader>();

  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const productCardRefs = useScrollToProduct({ products });

  const t = useTranslation();

  const productPerPage = getLimit({ searchParams });
  const currentPage = getPage({ searchParams });

  const totalPaginationButtons = Math.ceil(totalProductCount / productPerPage);

  const handlePagination = (value: number) => {
    searchParams.set(PARAMS.PAGE, String(value));
    if (value !== currentPage) {
      searchParams.set(PARAMS.FORCE_REVALIDATE, FORCE_REVALIDATE_MAP.GLOBAL);
    }
    setSearchParams(searchParams);
  };

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Group align="flex-end">
        <Text span>
          {t('products.resultsCount', {
            count: <Text span>{totalProductCount}</Text>
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
      <Pagination
        value={currentPage}
        total={totalPaginationButtons}
        onChange={handlePagination}
        m={'auto'}
        color={'black'}
      />
    </Stack>
  );
};

export default Products;
