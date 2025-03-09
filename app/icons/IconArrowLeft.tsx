import { rem } from '@mantine/core';

import { IconProps } from '~/types';

export default function IconArrowLeft({
  size = 25,
  color = 'white',
  stroke = '1.5',
  style,
  ...others
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={'none'}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M5 12l4 4" />
      <path d="M5 12l4 -4" />
    </svg>
  );
}
