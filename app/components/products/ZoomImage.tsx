import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import { Box, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { getImageUrl } from '~/utils';

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
  const [isCLient, setIsCLient] = useState(false);

  useEffect(() => {
    setIsCLient(true);
  }, []);

  return (
    <Box>
      {!isCLient ? (
        <Image
          h={'100%'}
          fit={'contain'}
          src={getImageUrl({ id: activeImage, h: srcH, w: srcW })}
          alt={alt}
          loading={'lazy'}
        />
      ) : (
        <InnerImageZoom
          src={getImageUrl({ id: activeImage, h: srcH, w: srcW })}
          zoomSrc={getImageUrl({ id: activeImage, h: zoomSrcH, w: zoomSrcW })}
          imgAttributes={{ alt: '', loading: 'lazy' }}
        />
      )}
    </Box>
  );
};

export default ZoomImage;
