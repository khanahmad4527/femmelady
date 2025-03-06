import { createItem, withToken } from '@directus/sdk';
import { Carousel } from '@mantine/carousel';
import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  Rating,
  ScrollArea,
  Stack,
  Text,
  Title,
  TypographyStylesProvider
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import {
  FetcherWithComponents,
  href,
  Link,
  Outlet,
  ShouldRevalidateFunction,
  useFetcher,
  useLoaderData,
  useOutletContext
} from 'react-router';

import { isAuthenticated } from '~/auth/auth.server';
import AddToCartError from '~/components/cart/AddToCartError';
import FetcherError from '~/components/error/FetcherError';
import ManagedImage from '~/components/ManagedImage';
import ProductCartQuantity from '~/components/products/ProductCartQuantity';
import ProductColorSwitcher from '~/components/products/ProductColorSwitcher';
import ProductSizeSwitcher from '~/components/products/ProductSizeSwitcher';
import ZoomImage from '~/components/products/ZoomImage';
import { FORCE_REVALIDATE_MAP, PARAM_KEYS } from '~/constant';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import getStringDto from '~/dto/getStringDto';
import useCurrentActiveColor from '~/hooks/useCurrentActiveColor';
import useCurrentActiveImage from '~/hooks/useCurrentActiveImage';
import useCurrentActiveSize from '~/hooks/useCurrentActiveSize';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useCurrentUrl from '~/hooks/useCurrentUrl';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useResponsivePreloadImages from '~/hooks/useResponsivePreloadImages';
import useTranslation from '~/hooks/useTranslation';
import useUserLocale from '~/hooks/useUserLocale';
import { getSingleProductPageMeta } from '~/meta';
import { addToCartSchema } from '~/schema';
import { getSingleProduct } from '~/server/api';
import { directus } from '~/server/directus';
import { getPublicEnv } from '~/server/env';
import commonClasses from '~/styles/Common.module.scss';
import {
  Cart,
  OutletContext,
  Product,
  ProductCart,
  ProductProductColor,
  ProductProductImage,
  ProductSize,
  ProductTranslation
} from '~/types';
import {
  buildLocalizedLink,
  formatCurrency,
  formatNumber,
  generateUuidv4,
  getImageUrl,
  getLanguageCode,
  shouldRevalidateLogic
} from '~/utils';
import {
  handleError,
  TFetcherError,
  throwLoginRequiredError
} from '~/utils/error';

import { Route } from './+types/$slug';
import CurrencyFormatter from '~/components/CurrencyFormatter';

export const meta = ({ data, location }: Route.MetaArgs) => {
  const product = data?.product as Product;
  const env = data?.env;

  return getSingleProductPageMeta({
    pathname: location.pathname,
    product,
    env
  });
};

// export const shouldRevalidate: ShouldRevalidateFunction = ({
//   nextUrl,
//   currentUrl,
//   actionStatus
// }) => {
//   // Use shared logic
//   const commonResult = shouldRevalidateLogic(nextUrl, currentUrl);

//   if (commonResult) {
//     return true; // If shared logic already decided to revalidate, no need to check further
//   }

//   const forceValidate =
//     nextUrl.searchParams.get(PARAM_KEYS.FORCE_REVALIDATE) ?? '';

//   if (forceValidate === FORCE_REVALIDATE_MAP.SINGLE_PRODUCT) {
//     return true;
//   }

//   if (actionStatus === 200) {
//     return true;
//   }

//   return false;
// };

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { token } = await isAuthenticated(request);
  const languageCode = getLanguageCode(params);

  const productSlug = params?.slug;
  const product = await getSingleProduct({
    slug: productSlug,
    languageCode,
    token
  });

  return { product, env: getPublicEnv() };
};

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const { token, isLoggedIn } = await isAuthenticated(request);

    if (!isLoggedIn) {
      return throwLoginRequiredError();
    }

    const formData = await request.formData();

    const {
      cartId,
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
          id: cartId,
          products: [{ product_id: productId }],
          color: colorId,
          size: sizeId,
          feature_image_1: featureImage1Id,
          feature_image_2: featureImage2Id,
          quantity
        })
      )
    );
  } catch (error) {
    return handleError({ error });
  }

  return { success: true };
};

const SingleProduct = () => {
  const { product } = useLoaderData<{ product: Product }>();

  const outletContext = useOutletContext<OutletContext>();

  const { searchParams, setSearchParams, isLoggedIn, user, env, utmSource } =
    outletContext;

  const { currentUrl } = useCurrentUrl();

  const { setCartCount, setCarts } = useHeaderFooterContext();
  const [quantity, setQuantity] = useState<string | null>('1');
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

  // This value should not changes after first render
  // To avoid the shift of highlighted image on smaller view
  const [initialSlide] = useState(
    currentImageSet.findIndex(i => i.directus_files_id === activeImage)
  );

  useResponsivePreloadImages({
    base: currentImageSet?.map(i =>
      getImageUrl({
        id: getStringDto(i.directus_files_id),
        h: 800,
        w: 800,
        url: env?.CDN_URL
      })
    ) as string[],
    above1200: [
      ...currentImageSet?.map(i =>
        getImageUrl({
          id: getStringDto(i.directus_files_id),
          h: 100,
          w: 100,
          url: env?.CDN_URL
        })
      ),
      ...currentImageSet?.map(i =>
        getImageUrl({
          id: getStringDto(i.directus_files_id),
          h: 3000,
          w: 3000,
          url: env?.CDN_URL
        })
      )
    ] as string[],
    below1200: currentImageSet?.map(i =>
      getImageUrl({
        id: getStringDto(i.directus_files_id),
        h: 200,
        w: 200,
        url: env?.CDN_URL
      })
    ) as string[]
  });

  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const userLocale = useUserLocale(currentLanguage);
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

      searchParams.set(PARAM_KEYS.IMAGE_ID, id);
      setSearchParams(searchParams, { preventScrollReset: true });
    }
  };

  // this return the cart object if the product is already in user's cart
  // Helps to make the add to cart button disable
  const inCart = (getFirstObjectDto(product?.carts) as ProductCart)
    ?.cart_id as Cart;

  const disabledAddToBag = Boolean(
    !isLoggedIn ||
      !activeSize.stock ||
      !activeColor.stock ||
      (inCart?.size === activeSize.id && inCart?.color === activeColor?.id)
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

  // These are getting used in the add to bag, form
  // To show the item in the cart drawer, we need these values
  const [cartId] = useState(generateUuidv4()); // To maintain a single value
  const productId = product.id;
  const colorId = activeColor.id;
  const sizeId = activeSize.id;
  const featureImage1Id = getStringDto(currentImageSet?.[0]?.directus_files_id);
  const featureImage2Id = getStringDto(currentImageSet?.[1]?.directus_files_id);

  const url =
    utmSource && !isLoggedIn
      ? href('/:lang?/login', { lang: currentLanguage })
      : href('/:lang?/register', { lang: currentLanguage });

  const redirectText =
    utmSource && !isLoggedIn ? t('login.login') : t('register.register');

  const slideSize = currentImageSet?.length > 3 ? '30%' : '33.33%';

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Grid>
        {/* This render product images in larger view */}
        <Grid.Col visibleFrom="lg" span={{ base: 12, lg: 1 }}>
          <ScrollArea h={500} w={100}>
            <Stack gap={0} pb={2}>
              {currentImageSet?.map((i, idx) => (
                <Box
                  h={100}
                  key={getStringDto(i.directus_files_id) + '-' + idx}
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
                  <ManagedImage
                    w={'100%'}
                    h={'100%'}
                    fit={'cover'}
                    id={getStringDto(i.directus_files_id)!}
                    urlHeight={100}
                    urlWidth={100}
                    alt={productTranslation?.title!}
                    loading={'lazy'}
                  />
                </Box>
              ))}
            </Stack>
          </ScrollArea>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          {/* This render product images in smaller view */}
          <Center hiddenFrom="lg" h={{ base: 288, xxs: 460, sm: 800, lg: 650 }}>
            <ManagedImage
              w={'100%'}
              h={'100%'}
              fit={'cover'}
              id={activeImage}
              urlWidth={800}
              urlHeight={800}
              alt={productTranslation?.title!}
              loading={'eager'}
            />
          </Center>

          <Carousel
            hiddenFrom="lg"
            mt={'md'}
            withIndicators={false}
            withControls={false}
            slideGap={'xs'}
            slideSize={slideSize}
            align={'start'}
            initialSlide={initialSlide}
            style={{ cursor: 'grab', direction: 'ltr' }} // There was a problem with rtl so we set it to ltr to avid any problem
            dragFree
            draggable
            loop
          >
            {currentImageSet?.map((i, idx) => (
              <Carousel.Slide
                key={getStringDto(i.directus_files_id) + '-' + idx}
                onClick={() => {
                  handleActiveImage(getStringDto(i.directus_files_id));
                }}
              >
                <Box
                  h={{ base: 100, xxs: 150, xs: 200, sm: 250, md: 300 }}
                  w={'100%'}
                  style={{
                    cursor: 'pointer',
                    border:
                      i.directus_files_id === activeImage
                        ? '2px solid black'
                        : '2px solid transparent'
                  }}
                >
                  <ManagedImage
                    w={'100%'}
                    h={'100%'}
                    fit={'cover'}
                    id={getStringDto(i.directus_files_id)}
                    urlHeight={200}
                    urlWidth={200}
                    alt={productTranslation?.title!}
                    loading={'lazy'}
                  />
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>

          {/* This render product images in larger view */}
          <ZoomImage
            activeImage={activeImage}
            alt={productTranslation?.title!}
          />
        </Grid.Col>

        {/* This render product title and description */}
        <Grid.Col component={Stack} span={{ base: 12, lg: 5 }}>
          <Title tt={'capitalize'} aria-label="Product name">
            {productTranslation?.title}
          </Title>

          <Title order={4} aria-label="Product price">
            <CurrencyFormatter value={Number(product.price)} />
          </Title>

          {productTranslation?.description && (
            <TypographyStylesProvider>
              <div
                dangerouslySetInnerHTML={{
                  __html: productTranslation.description
                }}
              />
            </TypographyStylesProvider>
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
              <ProductCartQuantity
                disabled={disabledAddToBag}
                quantity={quantity}
                setQuantity={setQuantity}
              />

              <input hidden name={'cartId'} defaultValue={cartId} />
              <input hidden name={'productId'} defaultValue={productId} />
              <input hidden name={'sizeId'} defaultValue={sizeId} />
              <input hidden name={'colorId'} defaultValue={colorId} />
              <input
                hidden
                name={'featureImage1Id'}
                defaultValue={featureImage1Id}
              />
              <input
                hidden
                name={'featureImage2Id'}
                defaultValue={featureImage2Id}
              />

              {/* If user is not logged in then redirect them to login/register page */}
              {isLoggedIn ? (
                <Button
                  type={'submit'}
                  color={'black'}
                  size={'md'}
                  disabled={disabledAddToBag}
                  loading={fetcher.state !== 'idle'}
                  onClick={() => {
                    const data = {
                      date_created: new Date().toISOString(),
                      id: cartId,
                      quantity: Number(quantity),
                      sort: null,
                      user: user?.id,
                      feature_image_1: featureImage1Id,
                      feature_image_2: featureImage2Id,
                      products: [
                        {
                          product_id: {
                            id: productId,
                            price: product?.price,
                            translations: product?.translations
                          }
                        }
                      ],

                      color: {
                        translations: activeColor?.translations
                      },
                      size: activeSize
                    } as Cart;
                    setCarts(prev => [data, ...prev]);
                  }}
                  fullWidth
                >
                  {t('products.addToBag')}
                </Button>
              ) : (
                <Button
                  color={'black'}
                  size={'md'}
                  component={Link}
                  prefetch="intent"
                  to={buildLocalizedLink({
                    url,
                    queryParams: {
                      'redirect-to': currentUrl!,
                      utm_source: utmSource!
                    }
                  })}
                >
                  {redirectText}
                </Button>
              )}
            </Stack>
          </fetcher.Form>

          {fetcher.data?.errors && <AddToCartError fetcher={fetcher} />}

          <FetcherError
            fetcher={fetcher as FetcherWithComponents<TFetcherError>}
          />
        </Grid.Col>
      </Grid>

      {/* This renders average rating */}
      <Box py={{ base: 'md', md: 'xl' }}>
        <Group>
          <Text fz={20} fw={500} span>
            {formatNumber({
              userLocale,
              value: product?.average_rating!
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
              <Text key={'products.reviews'} span>
                {formatNumber({
                  userLocale,
                  value: product?.review_count!
                })}
              </Text>
            )
          })}
        </Text>
      </Box>

      {/* // This is to render the reviews */}
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
