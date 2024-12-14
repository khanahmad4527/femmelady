import { Carousel } from '@mantine/carousel';
import { useInViewport } from '@mantine/hooks';
import { useRef } from 'react';
import AutoScroll from 'embla-carousel-auto-scroll';
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
import { IProductCard } from '~/types/types';
import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';

const HomeProductCarousel = ({ products }: { products: IProductCard[] }) => {
  if (!products || !products?.length) {
    return null;
  }

  const t = useTranslation();
  const { ref, inViewport } = useInViewport();

  const autoScroll = useRef(AutoScroll({ speed: 0.5, playOnInit: false }));

  const handleAction = (action: 'stop' | 'play') => {
    autoScroll.current[action]();
  };

  if (inViewport) {
    handleAction('play');
  } else {
    handleAction('stop');
  }

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
              <Box h={300}>
                <Image
                  h={'100%'}
                  fit={'contain'}
                  src={p.image}
                  alt={p.name}
                  loading={'lazy'}
                />
              </Box>

              <Box>
                <Text>{p.name}</Text>
                <Group gap={4}>
                  {p.colors?.map(c => {
                    return (
                      <Paper
                        key={c.id}
                        w={30}
                        h={30}
                        radius={'xl'}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {c.isPattern ? (
                          <ActionIcon
                            size="sm"
                            radius="xl"
                            aria-label="Settings"
                          >
                            <Avatar src={c.pattern_img!} radius="xl" />
                          </ActionIcon>
                        ) : (
                          <ActionIcon color={c.hex!} size="sm" radius="xl" />
                        )}
                      </Paper>
                    );
                  })}
                </Group>
              </Box>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
};

export default HomeProductCarousel;
