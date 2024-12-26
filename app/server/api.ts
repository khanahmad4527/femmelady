import { readItem, readItems, Query } from '@directus/sdk';
import { directus } from './directus';
import { Schema } from '~/types/collections';
import { Product } from '~/types/types';
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
  languageCode
}: {
  languageCode: string;
}) => {
  const products = await directus.request(
    readItems('product', {
      fields: [
        '*',
        { sizes: ['*'] },
        { translations: ['*'] },
        { images: ['*', { product_image_id: ['*', { images: ['*'] }] }] },
        { colors: ['*', { product_color_id: ['*', { translations: ['*'] }] }] }
      ],
      deep: productTranslationBaseQuery(languageCode)
    })
  );

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
