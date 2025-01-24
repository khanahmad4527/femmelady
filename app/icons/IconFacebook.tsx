import { rem } from '@mantine/core';

import { IconProps } from '~/types';

export default function IconFacebook({
  size = 25,
  color = 'var(--mantine-primary-color-7)',
  stroke = '1.5',
  style,
  ...others
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFFFFF" /* White "f" logo */
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.657-4.788 1.324 0 2.463.1 2.794.143v3.241h-1.918c-1.504 0-1.796.714-1.796 1.76v2.308h3.587l-.467 3.622h-3.12V24h6.116c.727 0 1.326-.6 1.326-1.326V1.326C24 .6 23.4 0 22.675 0z" />
    </svg>
  );
}
