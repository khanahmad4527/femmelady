import {
  ActionIcon,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useSearchParams } from 'react-router';
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
  const t = useTranslation();

  const translation = getSingleTranslation(
    activeColor.translations
  ) as ProductColorTranslation;

  const handleActiveColor = (id: string, index: number) => {
    if (id !== activeColor.id) {
      setActiveColor(productColors[index].product_color_id as ProductColor);
    }
  };

  return (
    <Stack gap={4}>
      <Title order={5}>{t('products.productColor')}</Title>
      <Text tt={'capitalize'}>{translation.name}</Text>
      <Group gap={4}>
        {productColors?.map((pc, index) => {
          const c = pc.product_color_id as ProductColor;
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
                handleActiveColor(c.id, index);
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

export default ProductColorSwitcher;
