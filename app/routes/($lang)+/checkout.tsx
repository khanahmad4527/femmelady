import { Grid, SimpleGrid, Stack, Title } from '@mantine/core';
import CheckoutCartCard from '~/components/checkout/CheckoutCartCard';
import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';

const Checkout = () => {
  const t = useTranslation();
  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Title m={'auto'}>{t('cart.shoppingBag')}</Title>
      <Grid>
        <Grid.Col span={10}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {Array.from({ length: 3 }, (_, index) => (
              <CheckoutCartCard key={index} />
            ))}
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={2}>2</Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Checkout;
