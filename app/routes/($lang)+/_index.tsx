import bag from '@assets/images/bag.jpg';
import candle from '@assets/images/candle.jpg';
import dress from '@assets/images/dress.jpeg';
import heroSection1 from '@assets/images/hero-section-1.jpg';
import jewelry from '@assets/images/jewelry.jpeg';
import perfume from '@assets/images/perfume.jpg';
import shoe from '@assets/images/shoe.jpg';
import watch from '@assets/images/watch.jpg';
import wedding from '@assets/images/wedding.jpg';
import {
  Box,
  Button,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { href, Link, useLoaderData } from 'react-router';

import HomeProductCarousel from '~/components/products/HomeProductCarousel';
import { CATEGORIES_WITH_ID_MAP } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { getProducts } from '~/server/api';
import commonClasses from '~/styles/Common.module.scss';
import { Product } from '~/types';
import { buildLocalizedLink, getLanguageCode } from '~/utils';

import { Route } from './+types/_index';

// Preload the hero images
export function links() {
  const heroImages = [
    heroSection1,
    wedding,
    candle,
    dress,
    jewelry,
    bag,
    perfume,
    watch,
    shoe
  ];

  return heroImages.map(i => ({
    rel: 'preload',
    href: i,
    as: 'image'
  }));
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const { products } = await getProducts({ languageCode, route: 'home' });

  return { products };
};

export default function Index() {
  const { products } = useLoaderData<typeof loader>();

  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const banner = {
    image: ''
  };

  const heroImages = [
    {
      id: 'e8b1f3d7-6f8c-4b7d-89a3-c25f75d1a462',
      title: t('home.weddings'),
      image: wedding,
      link: buildLocalizedLink({
        url: href('/:lang?/products', { lang: currentLanguage }),
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP['wedding-dresses'].key,
          'force-validate': 'global'
        }
      })
    },
    {
      id: 'c7a5e4f1-b2d8-4d7f-a6b1-89f3d42c7e75',
      title: t('home.candles'),
      image: candle,
      link: buildLocalizedLink({
        url: href('/:lang?/products', { lang: currentLanguage }),
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.candles.key,
          'force-validate': 'global'
        }
      })
    },
    {
      id: 'a2c4d7b9-85f3-41d6-b7e2-f47c8a1b925d',
      title: t('home.dresses'),
      image: dress,
      link: buildLocalizedLink({
        url: href('/:lang?/products', { lang: currentLanguage }),
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.dresses.key,
          'force-validate': 'global'
        }
      })
    },
    {
      id: 'fbd8e7a1-0193-488b-bbc8-f5f23a5e34fc',
      title: t('home.jewelry'),
      image: jewelry,
      link: buildLocalizedLink({
        url: href('/:lang?/products', { lang: currentLanguage }),
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.jewelry.key,
          'force-validate': 'global'
        }
      })
    },
    {
      id: '3be2c5d7-9677-470f-b3ec-24d6eaa08f1a',
      title: t('home.bags'),
      image: bag,
      link: buildLocalizedLink({
        url: href('/:lang?/products', { lang: currentLanguage }),
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.bags.key,
          'force-validate': 'global'
        }
      })
    },
    {
      id: '9263c8ad-f0bc-423f-b2e7-cd74a6a31534',
      title: t('home.perfumes'),
      image: perfume,
      link: buildLocalizedLink({
        url: href('/:lang?/products', { lang: currentLanguage }),
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.perfumes.key,
          'force-validate': 'global'
        }
      })
    },
    {
      id: 'a59376ba-d431-4e6d-a06f-0bce86ab31db',
      title: t('home.watches'),
      image: watch,
      link: buildLocalizedLink({
        url: href('/:lang?/products', { lang: currentLanguage }),
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.watches.key,
          'force-validate': 'global'
        }
      })
    },
    {
      id: '75a254d3-f31b-4785-9b36-8d676df6fca5',
      title: t('home.shoes'),
      image: shoe,
      link: buildLocalizedLink({
        url: href('/:lang?/products', { lang: currentLanguage }),
        queryParams: {
          categories: CATEGORIES_WITH_ID_MAP.shoes.key,
          'force-validate': 'global'
        }
      })
    }
  ];

  return (
    <Stack className={commonClasses.consistentSpacing}>
      {/* <Image src={banner.image} alt={'banner'} mah={200} fit={'contain'} /> */}

      <Box
        component={Link}
        prefetch="intent"
        to={href('/:lang?/products', { lang: currentLanguage })}
        pos={'relative'}
        h={{ base: 180, xs: 600 }}
      >
        <Image
          src={heroSection1}
          w={'100%'}
          h={'100%'}
          fit="cover"
          loading={'lazy'}
        />
        <Box
          visibleFrom="xs"
          pos={'absolute'}
          c="white"
          w={'inherit'}
          left={'10%'}
          right={'10%'}
          bottom={'10%'}
        >
          <Title>{t('home.heroSecText1')}</Title>
          <Text>{t('home.heroSecText2')}</Text>
          <Button mt={'md'} variant="white" radius={0}>
            {t('home.shopNow')}
          </Button>
        </Box>
      </Box>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {heroImages.map(h => {
          return (
            <Box
              key={h.id}
              component={Link}
              prefetch="intent"
              to={h.link}
              pos={'relative'}
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <Image alt={'product'} src={h.image} h={500} />
              <Paper
                radius={0}
                pos={'absolute'}
                bottom={0}
                w={'max-content'}
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

      <HomeProductCarousel products={products as Product[]} />
    </Stack>
  );
}
