import { components } from './collections';

export type Env = { DIRECTUS_URL: String };
export interface OutletContext {
  isLoggedIn: boolean;
  currentLanguage: TranslationKeys;
  env: Env;
}

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
  color?: string;
  stroke?: string;
}

export type TranslationKeys = 'en' | 'ja';

export type Product = components['schemas']['ItemsProduct'];

export type ProductProductColor = components['schemas']['ItemsProductProductColor'];
export type ProductColor = components['schemas']['ItemsProductColor'];

export type ProductSize = components['schemas']['ItemsProductSize'];

export type ProductTranslation =
  components['schemas']['ItemsProductTranslations'];

export type ProductColorTranslation =
  components['schemas']['ItemsProductColorTranslations'];

export type ValueLabel = {
  id: string;
  link: string;
  label: string;
};
