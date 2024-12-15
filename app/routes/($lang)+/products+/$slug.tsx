import { Carousel } from '@mantine/carousel';
import {
  Box,
  Button,
  Grid,
  Image,
  ScrollArea,
  Stack,
  Text,
  Title
} from '@mantine/core';
import ProductCartQuantity from '~/components/products/ProductCartQuantity';
import ProductColorSwitcher from '~/components/products/ProductColorSwitcher';
import ProductReview from '~/components/products/ProductReview';
import { ProductSizeSwitcher } from '~/components/products/ProductSizeSwitcher';
import { PRODUCTS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';
import { formatCurrency } from '~/utils';

const SingleProduct = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const product = PRODUCTS[1];

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Grid>
        <Grid.Col
          display={{ base: 'none', md: 'grid' }}
          span={{ base: 12, md: 1 }}
        >
          <ScrollArea h={500}>
            <Stack gap={0} pb={2}>
              {new Array(5).fill('*').map((p, i) => (
                <Box
                  p={2}
                  style={{
                    cursor: 'pointer',
                    border: i === 0 ? '2px solid black' : '',
                    width: '100%'
                  }}
                >
                  <Image
                    w={'100%'}
                    fit={'contain'}
                    src={product.image}
                    alt={product.name}
                    loading={'lazy'}
                  />
                </Box>
              ))}
            </Stack>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box>
            <Image
              h={'100%'}
              fit={'contain'}
              src={product.image}
              alt={product.name}
              loading={'lazy'}
            />
          </Box>
          <Carousel
            display={{ base: 'block', md: 'none' }}
            mt={'md'}
            withIndicators
            height={200}
            slideGap={'md'}
            slideSize={'33.3333%'}
            dragFree={false}
            align={'start'}
            loop
          >
            {new Array(5).fill('*').map((p, i) => (
              <Carousel.Slide key={p.id}>
                <Image
                  h={'100%'}
                  fit={'contain'}
                  src={product.image}
                  alt={product.name}
                  loading={'lazy'}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Grid.Col>

        <Grid.Col component={Stack} span={{ base: 12, md: 5 }}>
          <Title aria-label="Product name">{product.name}</Title>
          <Title order={4} aria-label="Product price">
            {formatCurrency({ currentLanguage, value: 1234.56 })}
          </Title>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
            similique reiciendis corporis voluptatum, amet fugiat nobis porro,
            dicta fugit explicabo deleniti! Eligendi molestiae architecto
            dolorum nulla odio fugiat consectetur nam. Voluptate, cupiditate?
            Aperiam alias mollitia id ipsa nostrum quos ex at ullam quidem. Hic
            ipsam porro incidunt quam eaque nisi, velit iste repudiandae aperiam
            architecto voluptatibus, placeat, cum facilis sed. Magnam sit quo
            numquam aut. Doloribus, quaerat nemo. A excepturi quam, quas
            adipisci dicta veniam iure neque modi ullam. Iusto asperiores animi
            excepturi aut nesciunt voluptatem illum! Repellendus, adipisci
            tenetur.
          </Text>
          <ProductColorSwitcher colors={product.colors} />
          <ProductSizeSwitcher />
          <ProductCartQuantity />
          <Button color="black" size="md">
            {t('products.addToBag')}
          </Button>
        </Grid.Col>
      </Grid>

      <ProductReview />
    </Stack>
  );
};

export default SingleProduct;
