import { readItems } from '@directus/sdk';
import { directus } from './directus';

export const getProducts = async () => {
  const products = await directus.request(
    readItems('product', {
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
