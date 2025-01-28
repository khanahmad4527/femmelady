import { SetURLSearchParams } from 'react-router';
import { components } from './collections';

export type Env = {
  DIRECTUS_URL?: string;
  APP_URL?: string;
  TURNSTILE_SITE_KEY?: string;
};
export interface OutletContext {
  isLoggedIn: boolean;
  currentLanguage: TranslationKeys;
  env: Env;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  exchangeRate: number;
  locale: string;
  token?: string;
  user?: User;
  utmSource?: string;
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

export type Page =
  | 'home'
  | 'products'
  | 'about-us'
  | 'contact-us'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'blog'
  | 'faq';

export type GetParam = {
  request?: Request;
  searchParams?: URLSearchParams;
};

export type User = components['schemas']['Users'];

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

export type Review = components['schemas']['ItemsReview'];

export type ReviewTranslation =
  components['schemas']['ItemsReviewTranslations'];

export type GenericSingleton = components['schemas']['ItemsAboutUs'];

export type GenericTranslation =
  components['schemas']['ItemsAboutUsTranslations'];

// Define the extended type for `content`
export interface GenericContent {
  title: string;
  content: string;
  is_featured: boolean;
}

export type ExtendedGenericTranslation = Omit<
  GenericTranslation,
  'contents'
> & {
  contents: GenericContent[];
};

export type FAQ = components['schemas']['ItemsFAQ'];

export type FAQTranslation = components['schemas']['ItemsFAQTranslations'];

export interface Faqs {
  title: string;
  faqs: { question: string; answer: string; is_featured: boolean }[];
}

export type ExtendedFAQTranslation = Omit<FAQTranslation, 'faqs'> & {
  faqs: Faqs[];
};

export type Cart = components['schemas']['ItemsCart'];

export type ProductCart = components['schemas']['ItemsProductCart'];

export type Translation = (
  key: string,
  replacements?: Record<string, React.ReactNode>
) => string;
