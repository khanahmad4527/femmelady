import { rem } from '@mantine/core';

import { IconProps } from '~/types';

export default function IconBrandX({
  size = 25,
  color = 'var(--mantine-primary-color-7)',
  stroke = '1.5',
  style,
  ...others
}: IconProps) {
  return (
    <svg
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 50 50"
      fill={'none'}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
    </svg>
  );
}
