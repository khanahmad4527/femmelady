import {
  Box,
  Center,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import wedding from '@assets/images/wedding.jpg';
import candle from '@assets/images/candle.jpg';
import jewelry from '@assets/images/jewelry.jpeg';
import dress from '@assets/images/dress.jpeg';
import bag from '@assets/images/bag.jpg';
import shoe from '@assets/images/shoe.jpg';
import perfume from '@assets/images/perfume.jpg';
import watch from '@assets/images/watch.jpg';
import useTranslation from '~/hooks/useTranslation';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ];
};

export default function Index() {
  const t = useTranslation();
  const banner = {
    image:
      'https://images.ctfassets.net/5de70he6op10/6xJLuqOrwqZVNW4759T9UO/5f34c105c942c8dd336a80ed704cf0bd/686903480-120424_giftingpromo_secondaryhpgbanner_ls_et.jpg?w=2882&q=80&fm=webp'
  };

  const heroImages = [
    {
      title: t('home.weddings'),
      image: wedding
    },
    {
      title: t('home.candles'),
      image: candle
    },
    {
      title: t('home.dresses'),
      image: dress
    },
    {
      title: t('home.jewelry'),
      image: jewelry
    },
    {
      title: t('home.bags'),
      image: bag
    },
    {
      title: t('home.perfumes'),
      image: perfume
    },
    {
      title: t('home.watches'),
      image: watch
    },
    {
      title: t('home.shoes'),
      image: shoe
    }
  ];

  return (
    <Stack>
      <Image src={banner.image} mah={200} fit={'contain'} />
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {heroImages.map(h => {
          return (
            <Box component={Link} to={'/'} pos={'relative'}>
              <Image src={h.image} h={500} />
              <Paper
                radius={0}
                pos={'absolute'}
                bottom={0}
                w={'min-content'}
                py={5}
                px={'sm'}
                bg="white"
                withBorder
              >
                {h.title}
              </Paper>
            </Box>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
