import {
  ActionIcon,
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import useTranslation from '~/hooks/useTranslation';
import { IProductColor } from '~/types/types';

const ProductColorSwitcher = ({ colors }: { colors: IProductColor[] }) => {
  const t = useTranslation();
  const [activeColor, setActiveColor] = useState<IProductColor>(colors[0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const translation = activeColor.translations[0];

  const handleActiveColor = (id: string, index: number) => {
    if (id !== activeColor.id) {
      setActiveColor(colors[index]);
    }
  };

  const handleActiveImageSet = (imageSet: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('image-set', imageSet);
    setSearchParams(newSearchParams, { preventScrollReset: true });
  };
  return (
    <Stack gap={4}>
      <Title order={5}>{t('products.productColor')}</Title>
      <Text>{translation.name}</Text>
      <Group gap={4}>
        {colors?.map((c, index) => {
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
                handleActiveImageSet(activeColor.image_set);
              }}
            >
              {c.isTexture ? (
                <ActionIcon size="sm" radius="xl" aria-label="Settings">
                  <Avatar src={c.texture!} radius="xl" />
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
