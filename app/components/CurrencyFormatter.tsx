import { Text, TextProps } from '@mantine/core';
import { LOCALE_TO_CURRENCY } from '~/constant';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import { ElementType } from 'react';

interface CurrencyFormatterProps<C extends ElementType = 'span'>
  extends TextProps {
  value: number;
  component?: C;
}

const CurrencyFormatter = <C extends ElementType = 'span'>({
  component,
  value,
  ...props
}: CurrencyFormatterProps<C>) => {
  const headerFooterContext = useHeaderFooterContext();

  const locale = headerFooterContext.locale;
  const currency = LOCALE_TO_CURRENCY[locale] || 'USD';
  const exchangeRate = headerFooterContext.exchangeRate;

  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(currency === 'USD' ? value : value * exchangeRate);

  return (
    <Text component={component ?? ('span' as C as any)} {...props}>
      {formattedValue}
    </Text>
  );
};

export default CurrencyFormatter;
