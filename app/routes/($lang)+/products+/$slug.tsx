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
  Outlet,
  ShouldRevalidateFunction,
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
  ProductSize,
  ProductTranslation
} from '~/types/types';
import {
  formatCurrency,
  formatNumber,
  getImageUrl,
  getLanguageCode
} from '~/utils';
import { Route } from './+types/$slug';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentActiveImage from '~/hooks/useCurrentActiveImage';
import getStringDto from '~/dto/getStringDto';
import { FORCE_REVALIDATE_MAP, PARAMS } from '~/constant';

export const shouldRevalidate: ShouldRevalidateFunction = ({ nextUrl }) => {
  const forceValidate = nextUrl.searchParams.get(PARAMS.FORCE_REVALIDATE);
  if (
    forceValidate === FORCE_REVALIDATE_MAP.GLOBAL ||
    forceValidate === FORCE_REVALIDATE_MAP.SINGLE_PRODUCT
  ) {
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

const SingleProduct = () => {
  const { product } = useLoaderData<{ product: Product }>();

  const outletContext = useOutletContext<OutletContext>();

  const { searchParams, setSearchParams } = outletContext;

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
      searchParams,
      setSearchParams
    });

  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();

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
            productColors={product.colors as ProductProductColor[]}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <ProductSizeSwitcher
            sizes={product.sizes as ProductSize[]}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <ProductCartQuantity />
          <Button color="black" size="md">
            {t('products.addToBag')}
          </Button>
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
                  number: productTranslation?.review_count!
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
