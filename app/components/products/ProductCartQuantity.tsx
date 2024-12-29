import { Select, Stack, Title } from '@mantine/core';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { formatNumber } from '~/utils';

const ProductCartQuantity = () => {
  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();
  return (
    <Stack gap={4}>
      <Title order={5}>{t('products.cartQuantity')}</Title>
      <Select
        data={Array.from({ length: 10 }, (_, index) => ({
          value: (index + 1).toString(),
          label: formatNumber({ currentLanguage, number: index + 1 })
        }))}
        defaultValue={'1'}
        allowDeselect={false}
        clearable={false}
        size="md"
      />
    </Stack>
  );
};

export default ProductCartQuantity;
