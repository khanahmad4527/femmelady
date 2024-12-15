import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';

import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';
import { IProductCard } from '~/types/types';
import ProductColorSwitcher from './ProductColorSwitcher';
import { buildLocalizedLink } from '~/utils';

const HomeProductCarousel = ({ products }: { products: IProductCard[] }) => {
  if (!products || !products?.length) {
    return null;
  }

  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const { ref, inViewport } = useInViewport();

  const autoScroll = useRef(AutoScroll({ speed: 0.5, playOnInit: false }));

  const handleAction = (action: 'stop' | 'play') => {
    autoScroll.current[action]();
  };

  const canLoop = products.length > 3;

  useEffect(() => {
    if (inViewport) {
      handleAction('play');
    } else {
      handleAction('stop');
    }
  }, [inViewport]);

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Title ta={'center'}>{t('home.shopNow')}</Title>
      <Carousel
        ref={ref}
        plugins={[autoScroll.current]}
        onMouseEnter={() => handleAction('stop')}
        onMouseLeave={() => handleAction('play')}
        withIndicators={false}
        withControls={false}
        slideGap={'md'}
        slideSize={{ base: '100%', xs: '50%', md: '25%' }}
        loop={canLoop}
        dragFree
        style={{ cursor: 'grab' }}
      >
        {products?.map(p => (
          <Carousel.Slide key={p.id}>
            <Card
              pos={'relative'}
              component={Stack}
              shadow="sm"
              padding={'md'}
              withBorder
            >
              <Box
                h={300}
                component={Link}
                to={buildLocalizedLink({
                  currentLanguage,
                  primaryPath: 'products',
                  secondaryPath: '123'
                })}
              >
                <Image
                  h={'100%'}
                  fit={'contain'}
                  src={p.image}
                  alt={p.name}
                  loading={'lazy'}
                />
              </Box>

              <ProductColorSwitcher colors={p.colors} />
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
};

export default HomeProductCarousel;
