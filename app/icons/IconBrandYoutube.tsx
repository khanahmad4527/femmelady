import { rem } from '@mantine/core';
import { IconProps } from '~/types/types';

export const IconBrandYoutube = ({
  size = 25,
  color = 'var(--mantine-primary-color-7)',
  stroke = '1.5',
  style,
  ...others
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
      <path d="M10 9l5 3l-5 3z" />
    </svg>
  );
};

export default IconBrandYoutube;
