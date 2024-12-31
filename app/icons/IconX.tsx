import { rem } from '@mantine/core';

import { IconProps } from '~/types';

export default function IconX({
  size = 25,
  color = 'var(--mantine-primary-color-7)',
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
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path
        fill={color}
        stroke={color}
        strokeWidth={stroke}
        d="M0 0h24v24H0z"
      />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
