import { Select, Stack, Title } from '@mantine/core';
import { useOutletContext } from 'react-router';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { OutletContext } from '~/types';
import { formatNumber } from '~/utils';

const ProductCartQuantity = () => {
  const { isLoggedIn } = useOutletContext<OutletContext>();
  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();
  return (
    <Stack gap={4}>
      <Title order={5}>{t('products.cartQuantity')}</Title>
      <Select
        name={'quantity'}
        data={Array.from({ length: 10 }, (_, index) => ({
          value: (index + 1).toString(),
          label: formatNumber({ currentLanguage, number: index + 1 })
        }))}
        defaultValue={'1'}
        allowDeselect={false}
        clearable={false}
        disabled={!isLoggedIn}
        size="md"
      />
    </Stack>
  );
};

export default ProductCartQuantity;
