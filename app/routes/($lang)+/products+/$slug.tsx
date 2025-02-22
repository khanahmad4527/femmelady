import { Carousel } from '@mantine/carousel';
import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  Rating,
  ScrollArea,
  Stack,
  Text,
  Title
} from '@mantine/core';
import {
  FetcherWithComponents,
  Link,
  Outlet,
  ShouldRevalidateFunction,
  useFetcher,
  useLoaderData,
  useLocation,
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
import { Route } from './+types/$slug';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentActiveImage from '~/hooks/useCurrentActiveImage';
import getStringDto from '~/dto/getStringDto';
import { FORCE_REVALIDATE_MAP, PARAM_KEYS, PATHS } from '~/constant';
import useCurrentActiveSize from '~/hooks/useCurrentActiveSize';
import { directus } from '~/server/directus';
import { createItem, withToken } from '@directus/sdk';
import { isAuthenticated } from '~/auth/auth.server';
import { addToCartSchema } from '~/schema';
import AddToCartError from '~/components/cart/AddToCartError';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useUserLocale from '~/hooks/useUserLocale';
import { getSingleProductPageMeta } from '~/meta';
import ZoomImage from '~/components/products/ZoomImage';
import { getEnv } from '~/server/env';
import {
  handleError,
  TFetcherError,
  throwLoginRequiredError
} from '~/utils/error';
import FetcherError from '~/components/error/FetcherError';

export const meta = ({ data, location }: Route.MetaArgs) => {
  const product = data?.product as Product;
  const env = data?.env;

  return getSingleProductPageMeta({
    pathname: location.pathname,
    product,
    env
  });
};

export const shouldRevalidate: ShouldRevalidateFunction = ({
  nextUrl,
  currentUrl,
  actionStatus
}) => {
  // Use shared logic
  const commonResult = shouldRevalidateLogic(nextUrl, currentUrl);

  if (commonResult) {
    return true; // If shared logic already decided to revalidate, no need to check further
  }

  const forceValidate =
    nextUrl.searchParams.get(PARAM_KEYS.FORCE_REVALIDATE) ?? '';

  if (forceValidate === FORCE_REVALIDATE_MAP.SINGLE_PRODUCT) {
    return true;
  }

  if (actionStatus === 200) {
    return true;
  }

  return false;
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { token } = await isAuthenticated(request);
  const languageCode = getLanguageCode(params);

  const productSlug = params?.slug;
  const product = await getSingleProduct({
    slug: productSlug,
    languageCode,
    token
  });

  return { product, env: getEnv() };
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

  const location = useLocation();

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

  const initialSlide = currentImageSet.findIndex(
    i => i.directus_files_id === activeImage
  );

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

  const redirectPath = utmSource && !isLoggedIn ? PATHS.login : PATHS.register;

  const redirectText =
    utmSource && !isLoggedIn ? t('login.login') : t('register.register');

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Grid>
        <Grid.Col
          display={{ base: 'none', md: 'grid' }}
          span={{ base: 12, md: 1 }}
        >
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
                  <Image
                    w={'100%'}
                    h={'100%'}
                    fit={'cover'}
                    src={getImageUrl({
                      id: getStringDto(i.directus_files_id),
                      h: 100,
                      w: 100,
                      url: env?.CDN_URL
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
          <ZoomImage
            activeImage={activeImage}
            alt={productTranslation?.title!}
          />

          <Carousel
            display={{ base: 'block', md: 'none' }}
            mt={'md'}
            withIndicators
            height={200}
            slideGap={'md'}
            slideSize={'33.3333%'}
            dragFree={false}
            align={'start'}
            initialSlide={initialSlide}
            loop
          >
            {currentImageSet?.map((i, idx) => (
              <Carousel.Slide
                key={getStringDto(i.directus_files_id) + '-' + idx}
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
                  h={'100%'}
                  fit={'contain'}
                  src={getImageUrl({
                    id: getStringDto(i.directus_files_id),
                    h: 200,
                    w: 200,
                    url: env?.CDN_URL
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
                  to={buildLocalizedLink({
                    baseUrl: env?.APP_URL!,
                    currentLanguage,
                    paths: [redirectPath],
                    queryParams: {
                      'redirect-to': location.pathname + location.search,
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
