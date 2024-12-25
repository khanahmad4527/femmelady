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
import { memo, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';
import ProductCartQuantity from '~/components/products/ProductCartQuantity';
import ProductColorSwitcher from '~/components/products/ProductColorSwitcher';
import ProductReview from '~/components/products/ProductReview';
import ProductSizeSwitcher from '~/components/products/ProductSizeSwitcher';
import useCurrentActiveColor from '~/hooks/useCurrentActiveColor';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { getSingleProduct } from '~/server/api';
import commonClasses from '~/styles/Common.module.scss';
import {
  Product,
  ProductProductColor,
  ProductTranslation
} from '~/types/types';
import { formatCurrency, getImageUrl } from '~/utils';
import { Route } from './+types/$slug';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentFeaturedImage from '~/hooks/useCurrentFeaturedImage';
import useCurrentActiveImage from '~/hooks/useCurrentActiveImage';
import getStringDto from '~/dto/getStringDto';
import { PARAMS } from '~/constant';

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const productId = params.slug;
  const product = await getSingleProduct(productId);

  const fullUrl = request.url;

  return { product, fullUrl };
};

const SingleProduct = () => {
  const { product, fullUrl } = useLoaderData<{
    product: Product;
    fullUrl: any;
  }>();

  const [searchParams, setSearchParams] = useSearchParams();

  // Manage the current active color
  const { activeColor, setActiveColor } = useCurrentActiveColor({ product, searchParams });

  // Manage the featureImages based on the active color
  const { activeImage, setActiveImage, currentImageSet } =
    useCurrentActiveImage({
      product,
      activeColor,
      searchParams,
      setSearchParams
    });

  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const productTranslation = getFirstObjectDto(
    product?.translations
  ) as ProductTranslation;

  const handleActiveImage = (id?: string) => {
    if (id) {
      setActiveImage(id);

      // Clone searchParams to avoid overriding
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set(PARAMS.IMAGE_ID, id);
      setSearchParams(updatedSearchParams, { preventScrollReset: true });
    }
  };

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Text fw={500}>{fullUrl}</Text>
      <Grid>
        <Grid.Col
          display={{ base: 'none', md: 'grid' }}
          span={{ base: 12, md: 1 }}
        >
          <ScrollArea h={500}>
            <Stack gap={0} pb={2}>
              {currentImageSet?.map(i => (
                <Box
                  key={getStringDto(i.directus_files_id)}
                  p={2}
                  style={{
                    cursor: 'pointer',
                    border:
                      i.directus_files_id === activeImage
                        ? '2px solid black'
                        : '2px solid transparent',
                    width: '100%'
                  }}
                  onClick={() =>
                    handleActiveImage(getStringDto(i.directus_files_id))
                  }
                >
                  <Image
                    w={'100%'}
                    fit={'contain'}
                    src={getImageUrl({
                      id: getStringDto(i.directus_files_id),
                      h: 100,
                      w: 100
                    })}
                    alt={productTranslation?.title!}
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
              src={getImageUrl({ id: activeImage, h: 800, w: 800 })}
              alt={productTranslation?.title!}
              loading={'lazy'}
            />
          </Box>
          {/* <Carousel
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
                  src={getImageUrl({ id: i.directus_files_id })}
                  alt={productTranslation?.title!}
                  loading={'lazy'}
                />
              </Carousel.Slide>
            ))}
          </Carousel> */}
        </Grid.Col>

        <Grid.Col component={Stack} span={{ base: 12, md: 5 }}>
          <Title tt={'capitalize'} aria-label="Product name">
            {productTranslation?.title}
          </Title>
          <Title order={4} aria-label="Product price">
            {formatCurrency({ currentLanguage, value: Number(product.price) })}
          </Title>
          {productTranslation?.description && (
            <Box>
              <div
                className="dangerouslySetInnerHTML"
                dangerouslySetInnerHTML={{
                  __html: productTranslation.description
                }}
              />
            </Box>
          )}
          <ProductColorSwitcher
            activeColor={activeColor}
            setActiveColor={setActiveColor}
            productColors={product.colors as ProductProductColor[]}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          {/* <ProductSizeSwitcher sizes={product.sizes} /> */}
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
