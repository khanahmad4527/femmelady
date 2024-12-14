import { rem } from '@mantine/core';

import { IconProps } from '~/types/types';

export default function IconCheck({
  size = 25,
  color,
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
        stroke={color}
        strokeWidth={stroke}
        d="M0 0h24v24H0z"
        fill={color}
      />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}
