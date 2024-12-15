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
  id: string;
  name: string;
  image: string;
  colors: {
    id: string;
    name: string;
    value?: string | null;
    hex: null | string;
    isPattern: boolean | null;
    pattern_img: null | string;
  }[];
}

export type ValueLabel = {
  link: string;
  label: string;
};
