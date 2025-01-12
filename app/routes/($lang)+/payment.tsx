import { Stack, Group, TextInput, Select, Button, Alert } from '@mantine/core';
import { useForm } from '~/hooks/useForm';
import { paymentFormSchema } from '~/schema';
import classes from '~/styles/Payment.module.scss';
import { Route } from './+types/payment';
import { z } from 'zod';
import {
  calculateTotalPrice,
  formatCurrency,
  formatNumber,
  getLocalizedMonth,
  parseZodError
} from '~/utils';
import { getCartsPrice } from '~/server/api';
import { isAuthenticated } from '~/auth/auth.server';
import { Cart } from '~/types';
import { directus } from '~/server/directus';
import { createItem, deleteItems, withToken } from '@directus/sdk';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import { useLoaderData } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import useUserLocale from '~/hooks/useUserLocale';
import { useEffect } from 'react';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { token } = await isAuthenticated(request);

  const carts = (await getCartsPrice({
    page: 1,
    limit: 100,
    token: token!
  })) as Cart[];

  const totalPrice = calculateTotalPrice({ carts });

  return { totalPrice };
};

export const action = async ({ request }: Route.ActionArgs) => {
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

    const cartIds = carts.map(c => c.id);

    await directus.request(withToken(token!, deleteItems('cart', cartIds)));

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return parseZodError(error);
    }
    throw error;
  }
};

const Payment = () => {
  const { totalPrice } = useLoaderData<typeof loader>();
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();
  const userLocale = useUserLocale(currentLanguage);
  const { setCarts, setCartCount } = useHeaderFooterContext();
  const { Form, form, state, fetcher } = useForm({
    schema: paymentFormSchema,
    initialValues: {
      cardNumber: '9999999999999',
      cvv: '999',
      cardHolderName: '',
      expiryMonth: 'march',
      expiryYear: '2027'
    }
  });

  const amount = formatCurrency({
    currentLanguage,
    value: totalPrice
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

  // Effect to clear cart and cart count
  useEffect(() => {
    if (fetcher.data?.success) {
      setCarts([]);
      setCartCount(0);
    }
  }, [fetcher.data?.success]);

  if (fetcher.data?.success) {
    return (
      <Alert
        variant="filled"
        color="green"
        radius={0}
        title={t('payment.orderPlaced')}
      >
        {t('payment.orderPlacedSuccess')}
      </Alert>
    );
  }

  return (
    <Stack w={{ base: '100%', md: 500 }}>
      <Form method="POST">
        <Stack>
          <Group wrap={'nowrap'} align={'flex-start'} grow>
            <TextInput
              label={t('payment.cardNumber')}
              placeholder={formatNumber({
                userLocale,
                value: 9999999999999
              })}
              type="number"
              name={'cardNumber'}
              key={form.key('cardNumber')}
              {...form.getInputProps('cardNumber')}
              withAsterisk
            />

            <TextInput
              label={t('payment.cvv')}
              placeholder={formatNumber({
                userLocale,
                value: 999
              })}
              type="number"
              name={'cvv'}
              key={form.key('cvv')}
              {...form.getInputProps('cvv')}
              withAsterisk
            />
          </Group>

          <Group wrap={'nowrap'} align={'flex-start'} grow>
            <Select
              label={t('payment.expiryMonth')}
              placeholder={getLocalizedMonth({ userLocale, monthIndex: 0 })}
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
              label={t('payment.expiryYear')}
              placeholder={formatNumber({
                userLocale,
                value: 2000
              })}
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
            label={t('payment.cardHolderName')}
            placeholder="John Doe"
            name={'cardHolderName'}
            key={form.key('cardHolderName')}
            {...form.getInputProps('cardHolderName')}
          />

          <Button loading={state !== 'idle'} color={'black'} type={'submit'}>
            {t('payment.payAmount', {
              amount
            })}
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
};

export default Payment;
