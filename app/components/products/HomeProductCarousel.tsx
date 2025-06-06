import { Carousel } from '@mantine/carousel';
import { Box, Card, Stack, Text, Title } from '@mantine/core';
import { useHover, useInViewport } from '@mantine/hooks';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useEffect, useRef } from 'react';
import { href, Link, useOutletContext } from 'react-router';

import getStringDto from '~/dto/getStringDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useResponsivePreloadImages from '~/hooks/useResponsivePreloadImages';
import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';
import { OutletContext, Product, ProductTranslation } from '~/types';
import { getImageUrl, getSingleTranslation } from '~/utils';

import ManagedImage from '../ManagedImage';
import CurrencyFormatter from '../CurrencyFormatter';

const HomeProductCarousel = ({ products }: { products: Product[] }) => {
  const t = useTranslation();
  const { currentLanguage, dir } = useCurrentLanguage();
  const { env } = useOutletContext<OutletContext>();

  const { ref, inViewport } = useInViewport();
  const autoScroll = useRef(AutoScroll({ speed: 0.5, playOnInit: false }));

  useEffect(() => {
    if (inViewport) {
      handleAction('play');
    } else {
      handleAction('stop');
    }
  }, [inViewport]);

  if (!products || !products?.length) {
    return null;
  }

  const handleAction = (action: 'stop' | 'play') => {
    autoScroll.current[action]();
  };

  const canLoop = products.length > 3;

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
        dragFree
      >
        {products?.map(p => {
          const { hovered, ref } = useHover();

          useResponsivePreloadImages({
            base: [
              getImageUrl({
                id: p?.feature_image_2 as string,
                url: env?.CDN_URL
              }),
              getImageUrl({
                id: p?.feature_image_1 as string,
                url: env?.CDN_URL
              })
            ] as string[]
          });

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
                  prefetch="intent"
                  to={href('/:lang?/products/:slug/reviews', {
                    lang: currentLanguage,
                    slug: translation?.slug ?? p?.id
                  })}
                >
                  <ManagedImage
                    h={'100%'}
                    fit={'contain'}
                    id={
                      hovered
                        ? getStringDto(p?.feature_image_2)
                        : getStringDto(p?.feature_image_1)
                    }
                    alt={translation.title!}
                    loading={'lazy'}
                  />
                </Box>

                {/* There was a problem with carousel not working when dir is set to rtl so we are
                manually setting it here */}
                <Box style={{ direction: dir }}>
                  <Text tt={'capitalize'}>{translation?.title}</Text>
                  <CurrencyFormatter value={p?.price!} />
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
