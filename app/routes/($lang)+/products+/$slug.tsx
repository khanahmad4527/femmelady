import {
  ActionIcon,
  Avatar,
  Box,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title
} from '@mantine/core';
import ProductColorSwitcher from '~/components/products/ProductColorSwitcher';
import { PRODUCTS } from '~/constant';
import commonClasses from '~/styles/Common.module.scss';
import { formatCurrency } from '~/utils';

const SingleProduct = () => {
  const product = PRODUCTS[1];

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 1 }}>
          <ScrollArea h={500}>
            <Stack gap={0} pb={2}>
              {new Array(5).fill('*').map((p, i) => (
                <Box
                  p={2}
                  style={{
                    cursor: 'pointer',
                    border: i === 0 ? '1.5px solid black' : '',
                    width: '100%'
                  }}
                >
                  <Image
                    w={'100%'}
                    fit={'contain'}
                    src={product.image}
                    alt={product.name}
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
              src={product.image}
              alt={product.name}
              loading={'lazy'}
            />
          </Box>
        </Grid.Col>

        <Grid.Col component={Stack} span={{ base: 12, md: 5 }}>
          <Title aria-label="Product name">{product.name}</Title>
          <Title order={4} aria-label="Product price">
            {formatCurrency(1234.56)}
          </Title>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
            similique reiciendis corporis voluptatum, amet fugiat nobis porro,
            dicta fugit explicabo deleniti! Eligendi molestiae architecto
            dolorum nulla odio fugiat consectetur nam. Voluptate, cupiditate?
            Aperiam alias mollitia id ipsa nostrum quos ex at ullam quidem. Hic
            ipsam porro incidunt quam eaque nisi, velit iste repudiandae aperiam
            architecto voluptatibus, placeat, cum facilis sed. Magnam sit quo
            numquam aut. Doloribus, quaerat nemo. A excepturi quam, quas
            adipisci dicta veniam iure neque modi ullam. Iusto asperiores animi
            excepturi aut nesciunt voluptatem illum! Repellendus, adipisci
            tenetur.
          </Text>
          <ProductColorSwitcher colors={product.colors} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default SingleProduct;
