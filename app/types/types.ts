export interface OutletContext {
  isLoggedIn: boolean;
  currentLanguage: TranslationKeys;
}

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
  color?: string;
  stroke?: string;
}

export type TranslationKeys = 'en' | 'ja';

export interface IProductCard {
  date_created: string;
  date_updated: string;
  discount: number | null;
  id: string;
  price: string;
  sort: number | null;
  status: 'published' | 'draft' | 'archived';
  user_created: string;
  user_updated: string;
  feature_image_1: string;
  feature_image_2: string;
  categories: string[];
  sizes: IProductSize;
  coupons: string[];
  translations: {
    description: string;
    id: number;
    languages_code: string;
    product_id: string;
    slug: string;
    title: string;
  }[];
  images: {
    id: string;
    product: string;
    images: {
      id: number;
      product_image_id: string;
      directus_files_id: string;
    }[];
  }[];
  colors: IProductColor[];
}

export interface IProductColor {
  id: string;
  sort: null;
  texture: null;
  isTexture: boolean;
  hex: string;
  value: string;
  stock: number;
  image_set: string;
  product: string;
  translations: {
    id: number;
    product_color_id: string;
    languages_code: string;
    name: string;
  }[];
}

export interface IProductSize {
  id: string;
  product: string;
  size: string;
  stock: number;
}

export type ValueLabel = {
  id: string;
  link: string;
  label: string;
};
