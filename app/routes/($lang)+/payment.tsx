import { createItem, deleteItems, withToken } from '@directus/sdk';
import { Alert, Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { href, Link, redirect, useLoaderData } from 'react-router';

import { isAuthenticated } from '~/auth/auth.server';
import NoCart from '~/components/cart/NoCart';
import FetcherError from '~/components/error/FetcherError';
import getFirstObjectDto from '~/dto/getFirstObjectDto';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { useForm } from '~/hooks/useForm';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { paymentFormSchema } from '~/schema';
import { getCartsPrice } from '~/server/api';
import { directus } from '~/server/directus';
import classes from '~/styles/Payment.module.scss';
import { Cart } from '~/types';
import {
  buildLocalizedLink,
  calculateTotalPrice,
  formatCurrency,
  formatNumber,
  getLocalizedMonth
} from '~/utils';
import { handleActionError, throwLoginRequiredError } from '~/utils/error';

import { Route } from './+types/payment';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { token } = await isAuthenticated(request);

  const carts = (await getCartsPrice({
    page: 1,
    limit: 100,
    token: token!
  })) as Cart[];

  const totalPrice = calculateTotalPrice({ carts });

  return { totalPrice, carts };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  try {
    const { token, isLoggedIn } = await isAuthenticated(request);

    if (!isLoggedIn) {
      return throwLoginRequiredError();
    }

    const formData = await request.formData();

    paymentFormSchema.parse(Object.fromEntries(formData));

    const carts = (await getCartsPrice({
      page: 1,
      limit: 100,
      token: token!
    })) as Cart[];

    const totalPrice = calculateTotalPrice({ carts });

    return {};
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

    return redirect(href('/:lang?/thank-you', { lang: params.lang }));

    // return { success: true };
  } catch (error) {
    return handleActionError({ error });
  }
};

const Payment = () => {
  const { totalPrice, carts } = useLoaderData<typeof loader>();
  const { currentLanguage, userLocale } = useCurrentLanguage();
  const t = useTranslation();
  const { setCarts, setCartCount, exchangeRate } = useHeaderFooterContext();
  const { Form, form, state, fetcher } = useForm({
    schema: paymentFormSchema,
    initialValues: {}
  });

  const amount = formatCurrency({
    currentLanguage,
    value: totalPrice,
    exchangeRate
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
      <Stack maw={500}>
        <Alert
          variant="filled"
          color="green"
          radius={0}
          title={t('payment.orderPlaced')}
        >
          {t('payment.orderPlacedSuccess')}
        </Alert>
        <Button
          component={Link}
          prefetch="intent"
          to={buildLocalizedLink({
            url: href('/:lang?/products', { lang: currentLanguage }),
            queryParams: {
              'force-validate': 'global'
            }
          })}
        >
          {t('common.cartEmptyMessage')}
        </Button>
      </Stack>
    );
  }

  if (!carts?.length) {
    return <NoCart />;
  }

  return (
    <Stack w={{ base: '100%', md: 500 }}>
      <Form method="POST">
        <Stack>
          {/* Billing Information */}
          <TextInput
            label={t('payment.fullName')}
            name="fullName"
            placeholder="John Doe"
            key={form.key('fullName')}
            {...form.getInputProps('fullName')}
            withAsterisk
          />

          <TextInput
            label={t('payment.email')}
            name="email"
            type="email"
            placeholder="john@example.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
            withAsterisk
          />

          <TextInput
            label={t('payment.phoneNumber')}
            name="phoneNumber"
            type="tel"
            inputMode="tel"
            placeholder="+1 234 567 8901"
            key={form.key('phoneNumber')}
            {...form.getInputProps('phoneNumber')}
            withAsterisk
          />

          <TextInput
            label={t('payment.address')}
            name="address"
            placeholder="1234 Main St"
            key={form.key('address')}
            {...form.getInputProps('address')}
            withAsterisk
          />

          <Group wrap="nowrap" align="flex-start" grow>
            <TextInput
              label={t('payment.city')}
              name="city"
              placeholder="New York"
              key={form.key('city')}
              {...form.getInputProps('city')}
              withAsterisk
            />
            <TextInput
              label={t('payment.state')}
              name="state"
              placeholder="NY"
              key={form.key('state')}
              {...form.getInputProps('state')}
              withAsterisk
            />
            <TextInput
              label={t('payment.zipCode')}
              name="zipCode"
              placeholder="10001"
              pattern="\d{5}"
              inputMode="numeric"
              maxLength={5}
              key={form.key('zipCode')}
              {...form.getInputProps('zipCode')}
              withAsterisk
            />
          </Group>

          {/* Card Information */}
          <Group wrap="nowrap" align="flex-start" grow>
            <TextInput
              label={t('payment.cardNumber')}
              placeholder="•••• •••• •••• ••••"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              pattern="\d{16}"
              maxLength={16}
              key={form.key('cardNumber')}
              {...form.getInputProps('cardNumber')}
              withAsterisk
            />

            <TextInput
              label={t('payment.cvv')}
              placeholder="•••"
              name="cvv"
              type="text"
              inputMode="numeric"
              pattern="^\d{3}$"
              maxLength={3}
              key={form.key('cvv')}
              {...form.getInputProps('cvv')}
              withAsterisk
            />
          </Group>

          <Group wrap="nowrap" align="flex-start" grow>
            <Select
              label={t('payment.expiryMonth')}
              placeholder={getLocalizedMonth({ userLocale, monthIndex: 0 })}
              data={months}
              classNames={{
                dropdown: classes.dropdown,
                option: classes.option
              }}
              name="expiryMonth"
              key={form.key('expiryMonth')}
              {...form.getInputProps('expiryMonth')}
              withAsterisk
            />
            <Select
              label={t('payment.expiryYear')}
              placeholder={formatNumber({ userLocale, value: 2000 })}
              data={years}
              classNames={{
                dropdown: classes.dropdown,
                option: classes.option
              }}
              name="expiryYear"
              key={form.key('expiryYear')}
              {...form.getInputProps('expiryYear')}
              withAsterisk
            />
          </Group>

          <TextInput
            label={t('payment.cardHolderName')}
            placeholder="John Doe"
            name="cardHolderName"
            key={form.key('cardHolderName')}
            {...form.getInputProps('cardHolderName')}
          />

          <Button loading={state !== 'idle'} color="black" type="submit">
            {t('payment.payAmount', { amount })}
          </Button>
        </Stack>
      </Form>

      <FetcherError fetcher={fetcher} />
    </Stack>
  );
};

export default Payment;
