import { readItem, readItems } from '@directus/sdk';
import { directus } from './directus';

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
      deep: {
        translations: {
          _filter: {
            languages_code: languageCode
          }
        }
      }
    })
  );

  return products;
};

export const getSingleProduct = async (id: string) => {
  const products = await directus.request(
    readItem('product', id, {
      fields: [
        '*',
        { sizes: ['*'] },
        { translations: ['*'] },
        { images: ['*', { product_image_id: ['*', { images: ['*'] }] }] },
        { colors: ['*', { product_color_id: ['*', { translations: ['*'] }] }] }
      ]
    })
  );

  return products;
};
