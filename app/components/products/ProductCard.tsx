import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Group,
  Image,
  Paper,
  Stack,
  Text
} from '@mantine/core';
import { useState } from 'react';
import { IconHeart, IconPlus } from '~/icons';

type TProductCard = {
  id: string;
  name: string;
  image: string;
  colors: {
    id: string;
    name: string;
    value?: string | null;
    hex: null | string;
    isPattern: boolean | null;
    pattern_img: null | string;
  }[];
};

const ProductCard = (props: TProductCard) => {
  const { name, colors, image } = props;

  const [activeColor, setActiveColor] = useState<
    TProductCard['colors'][number]
  >(colors[0]);

  const value = 1234.56;
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

  const handleActiveColor = (id: string, index: number) => {
    if (id !== activeColor.id) {
      setActiveColor(colors[index]);
    }
  };

  return (
    <Card
      pos={'relative'}
      component={Stack}
      shadow="sm"
      padding={'md'}
      withBorder
    >
      <ActionIcon
        pos={'absolute'}
        top={2}
        right={2}
        variant="transparent"
        aria-label="mark as favorite"
      >
        <IconHeart />
      </ActionIcon>

      <Box h={300}>
        <Image
          h={'100%'}
          fit={'contain'}
          src={image}
          alt={name}
          loading={'lazy'}
        />
      </Box>

      <Card.Section bg="primary.1" inheritPadding py={'md'}>
        <Group align={'flex-end'}>
          <Box mr={'auto'}>
            <Text mb={4}>{activeColor.name}</Text>
            <Group gap={4}>
              {colors?.map((c, index) => {
                return (
                  <Paper
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
          </Box>
          <Box ml={'auto'}>
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              aria-label="add to cart"
            >
              <IconPlus />
            </ActionIcon>
          </Box>
        </Group>
      </Card.Section>

      <Box>
        <Text>{name}</Text>
        <Text>{formattedValue}</Text>
      </Box>
    </Card>
  );
};

export default ProductCard;
