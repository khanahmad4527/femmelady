import { Carousel } from '@mantine/carousel';
import {
  Alert,
  Box,
  Button,
  Grid,
  Group,
  Image,
  List,
  Rating,
  ScrollArea,
  Stack,
  Text,
  Title
} from '@mantine/core';
import {
  Outlet,
  ShouldRevalidateFunction,
  useFetcher,
  useLoaderData,
  useOutletContext
} from 'react-router';
import ProductCartQuantity from '~/components/products/ProductCartQuantity';
import ProductColorSwitcher from '~/components/products/ProductColorSwitcher';
import ProductSizeSwitcher from '~/components/products/ProductSizeSwitcher';
import useCurrentActiveColor from '~/hooks/useCurrentActiveColor';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { getSingleProduct } from '~/server/api';
import commonClasses from '~/styles/Common.module.scss';
import {
  OutletContext,
  Product,
  ProductProductColor,
  ProductProductImage,
  ProductSize,
  ProductTranslation
} from '~/types';
import {
  formatCurrency,
  formatNumber,
  getImageUrl,
  getLanguageCode,
  parseZodError,
  shouldRevalidateLogic
} from '~/utils';
import { Route } from './+types/$slug';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentActiveImage from '~/hooks/useCurrentActiveImage';
import getStringDto from '~/dto/getStringDto';
import { FORCE_REVALIDATE_MAP, PARAMS } from '~/constant';
import useCurrentActiveSize from '~/hooks/useCurrentActiveSize';
import { directus } from '~/server/directus';
import { createItem, withToken } from '@directus/sdk';
import { isAuthenticated } from '~/auth/auth.server';
import { addToCartSchema } from '~/schema';
import AddToCartError from '~/components/cart/AddToCartError';
import { z } from 'zod';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  nextUrl,
  currentUrl
}) => {
  // Use shared logic
  const commonResult = shouldRevalidateLogic(nextUrl, currentUrl);

  if (commonResult) {
    return true; // If shared logic already decided to revalidate, no need to check further
  }

  const forceValidate = nextUrl.searchParams.get(PARAMS.FORCE_REVALIDATE) ?? '';

  if (forceValidate === FORCE_REVALIDATE_MAP.SINGLE_PRODUCT) {
    return true;
  }

  return false;
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const languageCode = getLanguageCode(params);

  const productSlug = params?.slug;
  const product = await getSingleProduct({ slug: productSlug, languageCode });

  return { product };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { token } = await isAuthenticated(request);
  const formData = await request.formData();

  try {
    const {
      colorId,
      productId,
      quantity,
      sizeId,
      featureImage1Id,
      featureImage2Id
    } = addToCartSchema.parse(Object.fromEntries(formData));

    await directus.request(
      withToken(
        token!,
        createItem('cart', {
          product: productId,
          color: colorId,
          size: sizeId,
          feature_image_1: featureImage1Id,
          feature_image_2: featureImage2Id,
          quantity
        })
      )
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }

  return { success: true };
};

const SingleProduct = () => {
  const { product } = useLoaderData<{ product: Product }>();

  const outletContext = useOutletContext<OutletContext>();

  const { searchParams, setSearchParams, isLoggedIn } = outletContext;

  const { setCartCount } = useHeaderFooterContext();

  const { activeSize, setActiveSize } = useCurrentActiveSize({
    product,
    searchParams
  });
  // Manage the current active color
  const { activeColor, setActiveColor } = useCurrentActiveColor({
    product,
    searchParams
  });

  // Manage the featureImages based on the active color
  const { activeImage, setActiveImage, currentImageSet } =
    useCurrentActiveImage({
      product,
      activeColor,
      searchParams
    });

  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const fetcher = useFetcher<{
    errors: Record<string, string>[];
    success: boolean;
  }>();

  const productTranslation = getFirstObjectDto(
    product?.translations
  ) as ProductTranslation;

  const handleActiveImage = (id?: string) => {
    if (id && id !== activeImage) {
      setActiveImage(id);

      searchParams.set(PARAMS.IMAGE_ID, id);
      setSearchParams(searchParams, { preventScrollReset: true });
    }
  };

  const disabledAddToBag = Boolean(
    !isLoggedIn || !activeSize.stock || !activeColor.stock
  );

  useEffect(() => {
    if (fetcher.data?.success) {
      notifications.show({
        title: t('cart.notificationTitle'),
        message: t('cart.notificationMessage')
      });
      setCartCount(prev => prev + 1);
    }
  }, [fetcher.data]);

  return (
    <Stack className={commonClasses.consistentSpacing}>
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
                  onClick={() => {
                    handleActiveImage(getStringDto(i.directus_files_id));
                  }}
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
            {currentImageSet?.map(i => (
              <Carousel.Slide key={getStringDto(i.directus_files_id)}>
                <Image
                  h={'100%'}
                  fit={'contain'}
                  src={getImageUrl({
                    id: getStringDto(i.directus_files_id),
                    h: 200,
                    w: 200
                  })}
                  alt={productTranslation?.title!}
                  loading={'lazy'}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
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
            images={product?.images as ProductProductImage[]}
            handleActiveImage={handleActiveImage}
            productColors={product.colors as ProductProductColor[]}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <ProductSizeSwitcher
            sizes={product.sizes as ProductSize[]}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <fetcher.Form method="POST">
            <Stack>
              <ProductCartQuantity />

              <input hidden name={'productId'} defaultValue={product.id} />
              <input hidden name={'sizeId'} defaultValue={activeSize.id} />
              <input hidden name={'colorId'} defaultValue={activeColor.id} />
              <input
                hidden
                name={'featureImage1Id'}
                defaultValue={getStringDto(
                  currentImageSet?.[0]?.directus_files_id
                )}
              />
              <input
                hidden
                name={'featureImage2Id'}
                defaultValue={getStringDto(
                  currentImageSet?.[1]?.directus_files_id
                )}
              />
              <Button
                type={'submit'}
                color="black"
                size="md"
                disabled={disabledAddToBag}
                loading={fetcher.state !== 'idle'}
                fullWidth
              >
                {t('products.addToBag')}
              </Button>
            </Stack>
          </fetcher.Form>
          {fetcher.data?.errors && <AddToCartError fetcher={fetcher} />}
        </Grid.Col>
      </Grid>

      <Box py={{ base: 'md', md: 'xl' }}>
        <Group>
          <Text fz={20} fw={500} span>
            {formatNumber({
              currentLanguage,
              number: product?.average_rating!
            })}
          </Text>
          <Rating
            value={product?.average_rating}
            fractions={10}
            color={'black'}
            readOnly
          />
        </Group>

        <Text>
          {t('products.reviews', {
            number: (
              <Text span>
                {formatNumber({
                  currentLanguage,
                  number: product?.review_count!
                })}
              </Text>
            )
          })}
        </Text>
      </Box>
      <Outlet
        context={{
          ...outletContext,
          totalReviewsCount: productTranslation?.review_count
        }}
      />
    </Stack>
  );
};

export default SingleProduct;
