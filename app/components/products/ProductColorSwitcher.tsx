import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core';
import { memo } from 'react';
import { SetURLSearchParams } from 'react-router';

import { PARAM_KEYS } from '~/constant';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import getStringDto from '~/dto/getStringDto';
import useTranslation from '~/hooks/useTranslation';
import {
  ProductColor,
  ProductColorTranslation,
  ProductImage,
  ProductImageFile,
  ProductProductColor,
  ProductProductImage} from '~/types';
import { getSingleTranslation } from '~/utils';

import ManagedImage from '../ManagedImage';

const ProductColorSwitcher = ({
  activeColor,
  setActiveColor,
  images,
  handleActiveImage,
  productColors,
  searchParams,
  setSearchParams
}: {
  activeColor: ProductColor;
  setActiveColor: React.Dispatch<React.SetStateAction<ProductColor>>;
  images?: ProductProductImage[];
  handleActiveImage?: (id?: string) => void;
  productColors: ProductProductColor[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  const paramsProductId = searchParams.get(PARAM_KEYS.PRODUCT_ID);
  const paramsImageSet = searchParams.get(PARAM_KEYS.IMAGE_SET);

  const t = useTranslation();

  const translation = getSingleTranslation(
    activeColor?.translations
  ) as ProductColorTranslation;

  const handleActiveColor = ({
    color,
    pId
  }: {
    color: ProductColor;
    pId?: string;
  }) => {
    // Destructure params to avoid repetitive access
    const { PRODUCT_ID, IMAGE_SET } = PARAM_KEYS;
    const currentProductId = paramsProductId;
    const currentImageSet = paramsImageSet;

    // Check if the product or image set needs to be updated
    const shouldUpdate =
      pId !== currentProductId || color?.image_set !== currentImageSet;

    if (shouldUpdate) {
      // Set the active color
      setActiveColor(color);

      if (images !== undefined && handleActiveImage !== undefined) {
        // Find the image based on the color's image set
        const matchingImage = images.find(
          i => (i.product_image_id as ProductImage)?.id === color.image_set
        );

        if (matchingImage) {
          // Safely extract the active image ID
          const newImageId = (
            (matchingImage.product_image_id as ProductImage)
              ?.images?.[0] as ProductImageFile
          )?.directus_files_id;

          if (typeof newImageId === 'string') {
            handleActiveImage(newImageId);
          }
        }
      }
      // Update search params
      const productId = getStringDto(productColors?.[0]?.product_id);
      searchParams.set(PRODUCT_ID, productId || '');
      searchParams.set(IMAGE_SET, getStringDto(color?.image_set) || '');

      // Optional: Uncomment if FORCE_REVALIDATE is needed
      // searchParams.set(
      //   PARAM_KEYS.FORCE_REVALIDATE,
      //   FORCE_REVALIDATE_MAP.SINGLE_PRODUCT
      // );

      setSearchParams(searchParams, { preventScrollReset: true });
    }
  };

  return (
    <Stack gap={4}>
      <Text span>
        {t('products.productColor')}

        <Text ml={4} tt={'capitalize'} span>
          {translation.name}
        </Text>
      </Text>

      <Group gap={4}>
        {productColors?.map(pc => {
          const productId = getStringDto(pc?.product_id);
          const c = getFirstObjectDto(pc?.product_color_id) as ProductColor;

          return (
            <Paper
              key={c.id}
              w={30}
              h={30}
              bg={'primary.1'}
              radius={'xl'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'black',
                border: c.id === activeColor.id ? '2px solid black' : '',
                cursor: 'pointer'
              }}
              onClick={() => {
                handleActiveColor({ color: c, pId: productId });
              }}
            >
              {c?.isTexture ? (
                <ActionIcon size="sm" radius="xl" disabled={!c.stock}>
                  <ManagedImage
                    id={getStringDto(c?.texture)}
                    urlHeight={50}
                    urlWidth={50}
                    radius="xl"
                  />
                </ActionIcon>
              ) : (
                <ActionIcon
                  color={c.hex!}
                  size="sm"
                  radius="xl"
                  disabled={!c.stock}
                />
              )}
            </Paper>
          );
        })}
      </Group>
    </Stack>
  );
};

export default memo(ProductColorSwitcher);
