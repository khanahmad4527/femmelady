import { readItem, readItems, Query } from '@directus/sdk';
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
  page,
  languageCode,
  priceRange
}: {
  page: Page;
  languageCode: string;
  priceRange?: [number, number];
}) => {
  // Define fields based on the page
  const pageFields: Record<Page, Query<Schema, Product>['fields']> = {
    home: [
      'feature_image_1',
      'feature_image_2',
      'price',
      { translations: ['*'] }
    ],
    products: [
      '*',
      { sizes: ['*'] },
      { translations: ['*'] },
      { images: ['*', { product_image_id: ['*', { images: ['*'] }] }] },
      { colors: ['*', { product_color_id: ['*', { translations: ['*'] }] }] }
    ]
  };

  // Define deep options based on the page
  const pageDeep: Record<Page, Query<Schema, Product>['deep']> = {
    home: {
      translations: {
        _filter: {
          languages_code: languageCode
        }
      }
    },
    products: {
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
      } as any
    }
  };

  // Build the query dynamically based on the page
  const query: Query<Schema, Product> = {
    filter: {
      price: {
        _between: priceRange
      }
    },
    fields: pageFields[page],
    deep: pageDeep[page]
  };

  const products = await directus.request(readItems('product', query));
  return products;
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
