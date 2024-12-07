export interface OutletContext {
  isLoggedIn: boolean;
}

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export type TranslationKeys = 'en' | 'ja';