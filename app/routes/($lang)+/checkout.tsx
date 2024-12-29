import {
  Button,
  Grid,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Title
} from '@mantine/core';
import CheckoutCartCard from '~/components/checkout/CheckoutCartCard';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import commonClasses from '~/styles/Common.module.scss';
import { formatCurrency } from '~/utils';

const Checkout = () => {
  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();

  return (
    <Stack className={commonClasses.consistentSpacing}>
      <Title m={'auto'}>{t('checkout.shoppingBag')}</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {Array.from({ length: 4 }, (_, index) => (
              <CheckoutCartCard key={index} />
            ))}
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Stack>
            <Paper withBorder p={'md'} ta={'center'} fw={500}>
              {t('checkout.summary')}
            </Paper>
            <Table variant="vertical" withTableBorder>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th w={160}>{t('checkout.subTotal')}</Table.Th>
                  <Table.Td>
                    {formatCurrency({ currentLanguage, value: 1234.56 })}
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th>{t('checkout.total')}</Table.Th>
                  <Table.Td>
                    {formatCurrency({ currentLanguage, value: 1234.56 })}
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <Button color={'black'}>{t('checkout.pay')}</Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Checkout;
