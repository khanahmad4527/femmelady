import {
  ActionIcon,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { memo } from 'react';
import { useSearchParams } from 'react-router';
import { PARAMS } from '~/constant';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import getStringDto from '~/dto/getStringDto';
import useTranslation from '~/hooks/useTranslation';
import {
  ProductColor,
  ProductColorTranslation,
  ProductProductColor
} from '~/types/types';
import { getSingleTranslation } from '~/utils';

const ProductColorSwitcher = ({
  activeColor,
  setActiveColor,
  productColors
}: {
  activeColor: ProductColor;
  setActiveColor: React.Dispatch<React.SetStateAction<ProductColor>>;
  productColors: ProductProductColor[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsProductId = searchParams.get(PARAMS.PRODUCT_ID);
  const paramsImageSet = searchParams.get(PARAMS.IMAGE_SET);

  const t = useTranslation();

  const translation = getSingleTranslation(
    activeColor?.translations
  ) as ProductColorTranslation;

  // Set active color and the params
  const handleActiveColor = ({
    color,
    pId
  }: {
    color: ProductColor;
    pId?: string;
  }) => {
    if (pId !== paramsProductId || color?.image_set !== paramsImageSet) {
      setActiveColor(color);
      const productId = getStringDto(productColors?.[0]?.product_id);

      // searchParams.set(PARAMS.PRODUCT_ID, productId!);
      // searchParams.set(PARAMS.IMAGE_SET, getStringDto(color?.image_set)!);

      // setSearchParams(searchParams, { preventScrollReset: true });
    }
  };

  return (
    <Stack gap={4}>
      <Title order={5}>{t('products.productColor')}</Title>
      <Text tt={'capitalize'}>{translation.name}</Text>
      <Group gap={4}>
        {productColors?.map(pc => {
          const productId = getStringDto(pc?.product_id);
          const c = getFirstObjectDto(pc?.product_color_id) as ProductColor;

          return (
            <Paper
              key={c.id}
              w={30}
              h={30}
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
                <ActionIcon size="sm" radius="xl">
                  <Image src={c.texture as string} radius="xl" />
                </ActionIcon>
              ) : (
                <ActionIcon color={c.hex!} size="sm" radius="xl" />
              )}
            </Paper>
          );
        })}
      </Group>
    </Stack>
  );
};

export default memo(ProductColorSwitcher);
