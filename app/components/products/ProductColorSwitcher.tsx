import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useState } from 'react';
import useTranslation from '~/hooks/useTranslation';
import { IProductCard } from '~/types/types';

type Color = IProductCard['colors'][number];

const ProductColorSwitcher = ({ colors }: { colors: Color[] }) => {
  const t = useTranslation();
  const [activeColor, setActiveColor] = useState<Color>(colors[0]);

  const handleActiveColor = (id: string, index: number) => {
    if (id !== activeColor.id) {
      setActiveColor(colors[index]);
    }
  };
  return (
    <Stack gap={4}>
      <Title order={5}>{t("products.productColor")}</Title>
      <Text>{activeColor.name}</Text>
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
            >
              {c.isPattern ? (
                <ActionIcon
                  size="sm"
                  radius="xl"
                  aria-label="Settings"
                  onClick={() => handleActiveColor(c.id, index)}
                >
                  <Avatar src={c.pattern_img!} radius="xl" />
                </ActionIcon>
              ) : (
                <ActionIcon
                  color={c.hex!}
                  size="sm"
                  radius="xl"
                  onClick={() => handleActiveColor(c.id, index)}
                />
              )}
            </Paper>
          );
        })}
      </Group>
    </Stack>
  );
};

export default ProductColorSwitcher;
