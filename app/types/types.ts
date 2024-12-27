import { SetURLSearchParams } from 'react-router';
import { components } from './collections';

export type Env = { DIRECTUS_URL?: String };
export interface OutletContext {
  isLoggedIn: boolean;
  currentLanguage: TranslationKeys;
  env: Env;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
  color?: string;
  stroke?: string;
}

export type TranslationKeys = 'en' | 'ja';

export type ValueLabel = {
  id: string;
  link: string;
  label: string;
};

export type Page = 'home' | 'products';

export type GetParam = {
  request?: Request;
  searchParams?: URLSearchParams;
};

export type Product = components['schemas']['ItemsProduct'];

export type ProductProductColor =
  components['schemas']['ItemsProductProductColor'];
export type ProductColor = components['schemas']['ItemsProductColor'];

export type ProductSize = components['schemas']['ItemsProductSize'];

export type ProductTranslation =
  components['schemas']['ItemsProductTranslations'];

export type ProductColorTranslation =
  components['schemas']['ItemsProductColorTranslations'];

export type ProductProductImage =
  components['schemas']['ItemsProductProductImage'];

export type ProductImage = components['schemas']['ItemsProductImage'];

export type ProductImageFile = components['schemas']['ItemsProductImageFiles'];
