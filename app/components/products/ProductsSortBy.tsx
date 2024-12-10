import { Select } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';

const ProductsSortBy = () => {
  const t = useTranslation();
  return (
    <Select
      label={t('products.sortBy')}
      data={[
        { value: 'popularity', label: t('products.popularity') },
        { value: 'price-low-to-high', label: t('products.priceLowToHigh') },
        { value: 'price-high-to-low', label: t('products.priceHighToLow') },
        { value: 'alphabetic-a-to-z', label: t('products.alphabeticAtoZ') },
        { value: 'alphabetic-z-to-a', label: t('products.alphabeticZtoA') }
      ]}
      clearable
      allowDeselect
    />
  );
};

export default ProductsSortBy;
