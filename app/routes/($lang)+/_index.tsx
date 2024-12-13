import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title
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
import heroSection1 from '@assets/images/hero-section-1.jpg';
import useTranslation from '~/hooks/useTranslation';
import { Link } from '@remix-run/react';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import ProductCard from '~/components/products/ProductCard';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ];
};

export default function Index() {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

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
      <Image src={banner.image} alt={'banner'} mah={200} fit={'contain'} />

      <Box
        bg="red"
        component={Link}
        to={`/${currentLanguage}/products`}
        pos={'relative'}
      >
        <Image src={heroSection1} h={'100%'} fit="contain" loading={'lazy'} />
        <Box
          display={{ base: 'none', xs: 'block' }}
          pos={'absolute'}
          w={{ base: '90%', md: '50%' }}
          c="white"
          left={'10%'}
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
        {heroImages.map((h, i) => {
          return (
            <Box key={i} component={Link} to={'/'} pos={'relative'}>
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

      <Paper p={{ base: 'md', md: '2xl' }} bg={'primary.1'}>
        <Stack align={'center'}>
          <Title ta={'center'} order={3}>
            {t('home.text1')}
          </Title>
          <Text ta={'center'} w={{ base: '90%', md: '60%' }}>
            {t('home.text2')}
          </Text>
        </Stack>
      </Paper>

      <Group wrap='nowrap'>
        {new Array(4).fill('*').map(v => (
          <ProductCard />
        ))}
      </Group>
    </Stack>
  );
}
