import {
  Box,
  Button,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core';
import { useEffect } from 'react';
import {
href,  Link,
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext
 } from 'react-router';

import LocalizedPagination from '~/components/LocalizedPagination';
import NoData from '~/components/NoData';
import ProductCard from '~/components/products/ProductCard';
import ProductsFilterBy from '~/components/products/ProductsFilterBy';
import ProductsPerPage from '~/components/products/ProductsPerPage';
import ProductsSortBy from '~/components/products/ProductsSortBy';
import { FORCE_REVALIDATE_MAP, PARAM_KEYS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useResponsivePreloadImages from '~/hooks/useResponsivePreloadImages';
import useScrollToProduct from '~/hooks/useScrollToProduct';
import useTranslation from '~/hooks/useTranslation';
import { getProducts } from '~/server/api';
import commonClasses from '~/styles/Common.module.scss';
import { OutletContext, Product } from '~/types';
import {
  buildAndCompareFilter,
  buildLocalizedLink,
  formatNumber,
  getAverageRatingRange,
  getBrandsId,
  getCategoriesId,
  getImageUrl,
  getLanguageCode,
  getLimit,
  getPage,
  getPriceRange,
  getRating,
  getSort,
  shouldRevalidateLogic
} from '~/utils';

import { Route } from '../+types/_index';

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

  const args = {
    priceRange,
    averageRatingRange,
    categoriesId,
    brandsId
  };

  // Aim of this function is to save the query made to the get the count of total product
  //If the filter is same
  const { isSame, productCount } = buildAndCompareFilter(args, request.url);

  const { products, totalProductCount } = await getProducts({
    route: 'products',
    isSame,
    productCount,
    languageCode,
    priceRange,
    averageRatingRange,
    productsPerPage,
    currentPage,
    productSort,
    categoriesId,
    brandsId
  });

  return {
    products,
    totalProductCount,
    filter: {
      price: priceRange,
      rating: averageRatingRange,
      category: categoriesId,
      brand: brandsId
    }
  };
};

const Products = () => {
  const { products, totalProductCount, filter } = useLoaderData<{
    products: Product[];
    totalProductCount: number;
    filter: {
      price: [number, number] | undefined;
      rating: [number, number] | undefined;
      category: string[] | undefined;
      brand: string[] | undefined;
    };
  }>();

  const { searchParams, setSearchParams, env } =
    useOutletContext<OutletContext>();
  const { currentLanguage, userLocale } = useCurrentLanguage();
  const productCardRefs = useScrollToProduct({ products });

  const t = useTranslation();

  const productPerPage = getLimit({ searchParams });
  const currentPage = getPage({ searchParams });

  const totalPaginationButtons = Math.ceil(totalProductCount / productPerPage);

  useResponsivePreloadImages({
    base: [
      ...products?.map(p =>
        getImageUrl({
          id: p.feature_image_1 as string,
          url: env?.CDN_URL
        })
      ),
      ...products?.map(p =>
        getImageUrl({
          id: p.feature_image_2 as string,
          url: env?.CDN_URL
        })
      )
    ] as string[]
  });

  const handlePagination = (value: number) => {
    searchParams.set(PARAM_KEYS.PAGE, String(value));
    if (value !== currentPage) {
      searchParams.set(
        PARAM_KEYS.FORCE_REVALIDATE,
        FORCE_REVALIDATE_MAP.GLOBAL
      );
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    searchParams.set(PARAM_KEYS.FILTER, JSON.stringify(filter));
    searchParams.set(PARAM_KEYS.COUNT, String(totalProductCount));
    setSearchParams(searchParams, { preventScrollReset: true });
  }, [products]);

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Group align="flex-end">
        <Text span>
          {t('products.resultsCount', {
            count: (
              <Text key={'products.resultsCount'} span>
                {formatNumber({ userLocale, value: totalProductCount })}
              </Text>
            )
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
          {!products?.length && (
            <NoData
              button={
                <Button
                  mt={'md'}
                  component={Link}
                  prefetch="intent"
                  to={buildLocalizedLink({
                    url: href('/:lang?/products', {
                      lang: currentLanguage
                    }),
                    queryParams: {
                      'force-validate': 'global'
                    }
                  })}
                >
                  {t('common.cartEmptyMessage')}
                </Button>
              }
            />
          )}
          {!!products?.length && (
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
          )}
        </Grid.Col>
      </Grid>

      {totalPaginationButtons > 1 && (
        <LocalizedPagination
          currentPage={currentPage}
          totalPaginationButtons={totalPaginationButtons}
          handlePagination={handlePagination}
        />
      )}
    </Stack>
  );
};

export default Products;
