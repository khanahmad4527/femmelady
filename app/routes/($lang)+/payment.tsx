import { Stack, Group, TextInput, Select, Button } from '@mantine/core';
import { useForm } from '~/hooks/useForm';
import { paymentFormSchema } from '~/schema';
import classes from '~/styles/Payment.module.scss';
import { Route } from './+types/payment';
import { z } from 'zod';
import { calculateTotalPrice, parseZodError } from '~/utils';
import { getCartsPrice } from '~/server/api';
import { isAuthenticated } from '~/auth/auth.server';
import { Cart } from '~/types';
import { directus } from '~/server/directus';
import { createItem, withToken } from '@directus/sdk';
import getFirstObjectDto from '~/dto/getFirstObjectDto';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { token } = await isAuthenticated(request);

  const formData = await request.formData();

  try {
    paymentFormSchema.parse(Object.fromEntries(formData));

    const carts = (await getCartsPrice({
      page: 1,
      limit: 100,
      token: token!
    })) as Cart[];

    const totalPrice = calculateTotalPrice({ carts });

    await directus.request(
      withToken(
        token!,
        createItem('order', {
          paid_amount: totalPrice,
          payment_method: 'card',
          products: carts.map(c => {
            return {
              product_id: getFirstObjectDto(c?.products)?.product_id
                ?.id as string
            };
          })
        })
      )
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }

  return {};
};

const Payment = () => {
  const { Form, form } = useForm({
    schema: paymentFormSchema,
    initialValues: {
      cardNumber: '9999999999999',
      cvv: '999',
      cardHolderName: '',
      expiryMonth: 'march',
      expiryYear: '2027'
    }
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => {
    const year = currentYear + i;
    return { value: year.toString(), label: year.toString() };
  });

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(0, index); // Month 0 = January
    return {
      value: date.toLocaleString('default', { month: 'long' }).toLowerCase(),
      label: date.toLocaleString('default', { month: 'long' })
    };
  });

  return (
    <Stack w={{ base: '100%', md: 500 }}>
      <Form method="POST">
        <Stack>
          <Group wrap={'nowrap'} align={'flex-start'} grow>
            <TextInput
              label="Card Number"
              placeholder="9999 9999 9999 9999"
              type="number"
              name={'cardNumber'}
              key={form.key('cardNumber')}
              {...form.getInputProps('cardNumber')}
              withAsterisk
            />

            <TextInput
              label="Cvv"
              placeholder="999"
              type="number"
              name={'cvv'}
              key={form.key('cvv')}
              {...form.getInputProps('cvv')}
              withAsterisk
            />
          </Group>

          <Group wrap={'nowrap'} align={'flex-start'} grow>
            <Select
              label="Expiry Month"
              placeholder="January"
              data={months}
              classNames={{
                dropdown: classes.dropdown,
                option: classes.option
              }}
              name={'expiryMonth'}
              key={form.key('expiryMonth')}
              {...form.getInputProps('expiryMonth')}
              withAsterisk
            />
            <Select
              label="Expiry Year"
              placeholder="2000"
              data={years}
              classNames={{
                dropdown: classes.dropdown,
                option: classes.option
              }}
              name={'expiryYear'}
              key={form.key('expiryYear')}
              {...form.getInputProps('expiryYear')}
              withAsterisk
            />
          </Group>

          <TextInput
            label="Card Holder Name"
            placeholder="John Doe"
            name={'cardHolderName'}
            key={form.key('cardHolderName')}
            {...form.getInputProps('cardHolderName')}
          />

          <Button color={'black'} type={'submit'}>
            Pay 200
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
};

export default Payment;
