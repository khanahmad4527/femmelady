import { readItem, readItems, Query, aggregate } from '@directus/sdk';
import { directus } from './directus';
import { Schema } from '~/types/collections';
import { Page, Product } from '~/types/types';
import { validateUUID } from '~/utils';

const productTranslationBaseQuery = (languageCode: string) => {
  return {
    translations: {
      _filter: {
        languages_code: languageCode
      }
    },
    colors: {
      product_color_id: {
        translations: {
          _filter: {
            languages_code: languageCode
          }
        }
      }
    }
  } as Query<Schema, Product>['deep'];
};

export const getProducts = async ({
  route,
  languageCode,
  priceRange,
  averageRatingRange,
  productsPerPage,
  currentPage
}: {
  route: Page;
  languageCode: string;
  priceRange?: [number, number];
  averageRatingRange?: [number, number];
  productsPerPage?: number;
  currentPage?: number;
}): Promise<{ products: Product[]; totalProductCount: number }> => {
  // Common filters
  const filters = {
    price: priceRange ? { _between: priceRange } : undefined,
    average_rating: averageRatingRange
      ? { _between: averageRatingRange }
      : undefined
  };

  // Common fields and deep options based on the route
  const routeConfig: Record<
    Page,
    {
      fields: Query<Schema, Product>['fields'];
      deep: Query<Schema, Product>['deep'];
    }
  > = {
    home: {
      fields: [
        'feature_image_1',
        'feature_image_2',
        'price',
        { translations: ['*'] }
      ],
      deep: {
        translations: {
          _filter: { languages_code: languageCode }
        }
      }
    },
    products: {
      fields: [
        '*',
        { sizes: ['*'] },
        { translations: ['*'] },
        { images: ['*', { product_image_id: ['*', { images: ['*'] }] }] },
        { colors: ['*', { product_color_id: ['*', { translations: ['*'] }] }] }
      ],
      deep: {
        translations: {
          _filter: { languages_code: languageCode }
        },
        colors: {
          product_color_id: {
            translations: {
              _filter: { languages_code: languageCode }
            }
          }
        } as any
      }
    }
  };

  const { fields, deep } = routeConfig[route];

  // Build the query dynamically
  const baseQuery: Query<Schema, Product> = {
    filter: filters,
    fields,
    deep
  };

  // Query for products
  const productQuery: Query<Schema, Product> = {
    ...baseQuery,
    limit: productsPerPage,
    page: currentPage
  };

  if (route === 'home') {
    const products = await directus.request(readItems('product', productQuery));
    return { products, totalProductCount: 0 };
  }

  if (route === 'products') {
    // Aggregate query for product count
    const [productCount] = await directus.request(
      aggregate('product', {
        aggregate: { count: '*' },
        query: baseQuery
      })
    );

    // Fetch products
    const products = await directus.request(readItems('product', productQuery));
    return { products, totalProductCount: Number(productCount?.count) };
  }

  // Default case for unsupported routes
  return { products: [], totalProductCount: 0 };
};

export const getSingleProduct = async ({
  slug,
  languageCode
}: {
  slug: string;
  languageCode: string;
}) => {
  const isUUID = validateUUID(slug);
  const fields = [
    '*',
    { sizes: ['*'] },
    { translations: ['*'] },
    { images: ['*', { product_image_id: ['*', { images: ['*'] }] }] },
    { colors: ['*', { product_color_id: ['*', { translations: ['*'] }] }] }
  ] as Query<Schema, Product>['fields'];

  const query: Query<Schema, Product> = {
    fields,
    deep: productTranslationBaseQuery(languageCode)
  };

  if (isUUID) {
    const product = await directus.request(readItem('product', slug, query));
    return product;
  } else {
    const [product] = await directus.request(
      readItems('product', {
        filter: { translations: { slug } },
        ...query
      })
    );
    return product;
  }
};
