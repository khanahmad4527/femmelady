export interface OutletContext {
  isLoggedIn: boolean;
}

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}
