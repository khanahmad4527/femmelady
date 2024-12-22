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
import { i } from 'node_modules/@react-router/dev/dist/routes-DHIOx0R9';
import { useLoaderData, useSearchParams } from 'react-router';
import ProductCartQuantity from '~/components/products/ProductCartQuantity';
import ProductColorSwitcher from '~/components/products/ProductColorSwitcher';
import ProductReview from '~/components/products/ProductReview';
import ProductSizeSwitcher from '~/components/products/ProductSizeSwitcher';
import { PRODUCTS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';
import { formatCurrency } from '~/utils';

export const shouldRevalidate = () => false;

export const loader = async () => {
  const product = {
    date_created: '2024-12-20T02:56:09.289Z',
    date_updated: '2024-12-22T02:12:24.222Z',
    discount: null,
    id: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
    price: '123.00000',
    sort: null,
    status: 'published',
    user_created: '686218f3-c2e8-45c3-9530-3752ae9e2801',
    user_updated: '686218f3-c2e8-45c3-9530-3752ae9e2801',
    feature_image_1: 'bf763d2e-ecda-48f1-bb02-948c15071482',
    feature_image_2: 'bf38a51b-b6a8-47cc-b74c-ffa19984c6bf',
    categories: [],
    sizes: [
      {
        id: '0636e0bb-abd6-44b3-8d6a-b04803534eb8',
        product: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
        size: 'l',
        stock: 78
      },
      {
        id: '45e591a5-2534-4b3b-8373-61d2ea0622fc',
        product: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
        size: 'xs',
        stock: 100
      },
      {
        id: '6d6b3871-1cf0-4385-91bf-69679cd9adc7',
        product: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
        size: 'md',
        stock: 120
      },
      {
        id: 'd40ad376-9dc6-4612-93df-8aa3bb7edca0',
        product: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
        size: 'xl',
        stock: 45
      },
      {
        id: 'd5ed7b1f-7f84-48aa-8514-7438b44f6b1d',
        product: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
        size: 's',
        stock: 45
      }
    ],
    coupons: [],
    translations: [
      {
        description:
          '\u003Cp\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\u003C/p\u003E',
        id: 3,
        languages_code: 'ja-JA',
        product_id: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
        slug: 'chinese-red-wedding-dress-ja',
        title: 'Red wedding dress'
      }
    ],
    images: [
      {
        id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
        product: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
        images: [
          {
            id: 1,
            product_image_id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
            directus_files_id: 'bf763d2e-ecda-48f1-bb02-948c15071482'
          },
          {
            id: 2,
            product_image_id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
            directus_files_id: '67a3af67-a9c6-43cf-b989-079d230020aa'
          },
          {
            id: 3,
            product_image_id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
            directus_files_id: '1ac3109a-79bf-45de-a433-780623989b22'
          },
          {
            id: 4,
            product_image_id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
            directus_files_id: '4ec99f65-d5f9-4120-b64f-af1b6b5162c0'
          },
          {
            id: 5,
            product_image_id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
            directus_files_id: '25e10b03-c366-4b45-8c69-65751e1f2ec0'
          },
          {
            id: 6,
            product_image_id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
            directus_files_id: 'a5639ce3-1857-4d50-b566-6043ef2ad778'
          },
          {
            id: 7,
            product_image_id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
            directus_files_id: '2e55414a-2fa1-4d00-9aa7-c34855efc5ce'
          },
          {
            id: 8,
            product_image_id: '59011c31-aaf1-4523-8547-0297f40e6c0e',
            directus_files_id: 'bf38a51b-b6a8-47cc-b74c-ffa19984c6bf'
          }
        ]
      }
    ],
    colors: [
      {
        id: '043d4e53-4114-4b7f-8a66-59cc096170e1',
        sort: null,
        texture: null,
        isTexture: false,
        hex: '#FF0000',
        value: '#FF0000',
        stock: 65,
        image_set: '59011c31-aaf1-4523-8547-0297f40e6c0e',
        product: 'ef994f56-13d2-4195-b289-25bf3ec5a49c',
        translations: [
          {
            id: 1,
            product_color_id: '043d4e53-4114-4b7f-8a66-59cc096170e1',
            languages_code: 'en-US',
            name: 'Red'
          }
        ]
      }
    ]
  };

  return product;
};

const SingleProduct = () => {
  const product = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const imageSet = searchParams.get('image-set');

  const activeImageSet =
    product.images.find(i => i.id === imageSet) ?? product.images[0];

  const activeImageId =
    searchParams.get('image-id') ?? activeImageSet.images[0].directus_files_id;

  const productTranslation = product.translations[0];

  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  // const product = PRODUCTS[1];

  const handleActiveImageId = (imageId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('image-id', imageId);
    setSearchParams(newSearchParams, { preventScrollReset: true });
  };

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Grid>
        <Grid.Col
          display={{ base: 'none', md: 'grid' }}
          span={{ base: 12, md: 1 }}
        >
          <ScrollArea h={500}>
            <Stack gap={0} pb={2}>
              {activeImageSet.images.map(i => (
                <Box
                  key={i.directus_files_id}
                  p={2}
                  style={{
                    cursor: 'pointer',
                    border:
                      i.directus_files_id === activeImageId
                        ? '2px solid black'
                        : '',
                    width: '100%'
                  }}
                  onClick={() => handleActiveImageId(i.directus_files_id)}
                >
                  <Image
                    w={'100%'}
                    fit={'contain'}
                    src={`http://localhost:8055/assets/${i.directus_files_id}`}
                    alt={productTranslation.title}
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
              src={`http://localhost:8055/assets/${activeImageId}`}
              alt={productTranslation.title}
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
            {activeImageSet.images.map(i => (
              <Carousel.Slide key={i.directus_files_id}>
                <Image
                  h={'100%'}
                  fit={'contain'}
                  src={`http://localhost:8055/assets/${i.directus_files_id}`}
                  alt={productTranslation.title}
                  loading={'lazy'}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Grid.Col>

        <Grid.Col component={Stack} span={{ base: 12, md: 5 }}>
          <Title tt={'capitalize'} aria-label="Product name">
            {productTranslation.title}
          </Title>
          <Title order={4} aria-label="Product price">
            {formatCurrency({ currentLanguage, value: Number(product.price) })}
          </Title>
          <Box>
            <div
              className="dangerouslySetInnerHTML"
              dangerouslySetInnerHTML={{
                __html: productTranslation.description
              }}
            />
          </Box>
          <ProductColorSwitcher colors={product.colors} />
          <ProductSizeSwitcher sizes={product.sizes} />
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
