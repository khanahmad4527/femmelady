import { Image, ImageProps } from '@mantine/core';
import { forwardRef } from 'react';

import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import { getImageUrl } from '~/utils';

interface ManagedImageProps
  extends ImageProps,
    Omit<React.ComponentPropsWithoutRef<'img'>, keyof ImageProps> {
  id?: string; // Accepts an `id` directly instead of `src`
  urlHeight?: number;
  urlWidth?: number;
}

/**
 * A custom Mantine Image component that automatically resolves image URLs,
 * removing the need to pass a `url` prop manually.
 */
const ManagedImage = forwardRef<HTMLImageElement, ManagedImageProps>(
  ({ id, urlHeight = 300, urlWidth = 300, ...props }, ref) => {
    const {
      env: { CDN_URL }
    } = useHeaderFooterContext();

    const resolvedSrc = id
      ? getImageUrl({ id, h: urlHeight, w: urlWidth, url: CDN_URL })
      : null;

    if (!resolvedSrc) {
      console.warn('ManagedImage: Missing image ID or CDN URL');
      return null;
    }

    return <Image {...props} ref={ref} src={resolvedSrc} />;
  }
);

ManagedImage.displayName = 'ManagedImage';

export default ManagedImage;
