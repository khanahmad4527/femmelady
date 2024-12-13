import {
  ActionIcon,
  Box,
  Card,
  Center,
  ColorSwatch,
  Group,
  Image,
  Paper,
  Stack,
  Text
} from '@mantine/core';
import { IconHeartFilled, IconPlus } from '~/icons';

const ProductCard = () => {
  const value = 1234.56;
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

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
        <IconHeartFilled />
      </ActionIcon>

      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        height={300}
        alt="Norway"
      />

      <Card.Section component={Group} wrap="nowrap" bg="red" inheritPadding>
        <Box w={'50%'} display={'inline'}>
          <Text>Black</Text>
          <Group gap={4}>
            {new Array(3).fill('*').map(c => {
              return (
                <Paper
                  w={30}
                  h={30}
                  p={4}
                  withBorder
                  radius={'xl'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'black'
                  }}
                >
                  <Paper w={'100%'} h={'100%'} bg="#009790" radius={'xl'} />
                </Paper>
              );
            })}
          </Group>
        </Box>
        <Box display={'inline'}>
          <ActionIcon
            ml={'auto'}
            variant="light"
            size="lg"
            radius="xl"
            aria-label="add to cart"
          >
            <IconPlus />
          </ActionIcon>
        </Box>
      </Card.Section>

      <Box>
        <Text>Classic Pant</Text>
        <Text>{formattedValue}</Text>
      </Box>
    </Card>
  );
};

export default ProductCard;
