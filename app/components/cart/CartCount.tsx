import { Text } from '@mantine/core';

const CartCount = ({
  cartCount,
  locale
}: {
  cartCount: number;
  locale: string;
}) => {
  return (
    <div>
      {cartCount > 0 && (
        <Text fw={500} fz={'md'} c={'white'}>
          {cartCount === 100
            ? `${new Intl.NumberFormat(locale).format(99)}+`
            : new Intl.NumberFormat(locale).format(cartCount)}
        </Text>
      )}
    </div>
  );
};

export default CartCount;
