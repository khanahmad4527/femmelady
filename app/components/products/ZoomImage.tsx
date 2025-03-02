import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { useOutletContext } from 'react-router';

import { OutletContext } from '~/types';
import { getImageUrl } from '~/utils';

import ManagedImage from '../ManagedImage';

// InnerImageZoom doesn't support SSR, so we render it only on the client side.

const ZoomImage = ({
  activeImage,
  alt,
  srcH = 800,
  srcW = 800,
  zoomSrcH = 3000,
  zoomSrcW = 3000
}: {
  activeImage: string;
  alt?: string;
  srcH?: number;
  srcW?: number;
  zoomSrcH?: number;
  zoomSrcW?: number;
}) => {
  const { env } = useOutletContext<OutletContext>();
  const [isCLient, setIsCLient] = useState(false);

  useEffect(() => {
    setIsCLient(true);
  }, []);

  return (
    <Box key={activeImage} visibleFrom="lg">
      {!isCLient ? (
        <ManagedImage
          fit={'contain'}
          id={activeImage}
          urlHeight={srcH}
          urlWidth={srcW}
          alt={alt}
          loading={'eager'}
        />
      ) : (
        <InnerImageZoom
          src={
            getImageUrl({
              id: activeImage,
              h: srcH,
              w: srcW,
              url: env?.CDN_URL
            })!
          }
          zoomSrc={
            getImageUrl({
              id: activeImage,
              h: zoomSrcH,
              w: zoomSrcW,
              url: env?.CDN_URL
            })!
          }
          imgAttributes={{ alt: '', loading: 'eager' }}
        />
      )}
    </Box>
  );
};

export default ZoomImage;
