import { Carousel } from '@mantine/carousel';
import { Box, Card, Image, Stack, Text, Title } from '@mantine/core';
import { useHover, useInViewport } from '@mantine/hooks';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router';
import { PATHS } from '~/constant';
import getStringDto from '~/dto/getStringDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';

import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';
import { OutletContext, Product, ProductTranslation } from '~/types';
import {
  buildLocalizedLink,
  formatCurrency,
  getImageUrl,
  getSingleTranslation
} from '~/utils';

const HomeProductCarousel = ({ products }: { products: Product[] }) => {
  if (!products || !products?.length) {
    return null;
  }

  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const { env } = useOutletContext<OutletContext>();

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
        align={'start'}
        style={{ cursor: 'grab' }}
        dragFree
      >
        {products?.map(p => {
          const { hovered, ref } = useHover();

          const translation = getSingleTranslation(
            p.translations
          ) as ProductTranslation;

          return (
            <Carousel.Slide key={p.id}>
              <Card
                pos={'relative'}
                component={Stack}
                shadow="sm"
                padding={'md'}
                withBorder
              >
                <Box
                  ref={ref as any}
                  h={300}
                  component={Link}
                  to={buildLocalizedLink({
                    baseUrl: env?.APP_URL!,
                    currentLanguage,
                    paths: [
                      PATHS.products,
                      translation?.slug ?? p?.id,
                      PATHS.reviews
                    ]
                  })}
                >
                  <Image
                    h={'100%'}
                    fit={'contain'}
                    src={getImageUrl({
                      id: hovered
                        ? getStringDto(p?.feature_image_2)
                        : getStringDto(p?.feature_image_1),
                      DIRECTUS_URL: env?.DIRECTUS_URL
                    })}
                    alt={translation.title!}
                    loading={'lazy'}
                  />
                </Box>
                <Box>
                  <Text tt={'capitalize'}>{translation?.title}</Text>
                  <Text>
                    {formatCurrency({
                      currentLanguage,
                      value: p?.price as number
                    })}
                  </Text>
                </Box>
              </Card>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Stack>
  );
};

export default HomeProductCarousel;
