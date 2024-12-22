import { authentication, createDirectus, rest } from '@directus/sdk';
import { Schema } from '~/types/collections';

export const directus = createDirectus<Schema>(process.env?.DIRECTUS_URL ?? '')
  .with(rest())
  .with(authentication());
