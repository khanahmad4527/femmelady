import { Select } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';

import useTranslation from '~/hooks/useTranslation';

const ProductsSortBy = () => {
  const t = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (value: string | null) => {
    const newFilter = value || null;
    const newSearchParams = new URLSearchParams(searchParams);
    if (newFilter) {
      newSearchParams.set('sort', newFilter);
    } else {
      newSearchParams.delete('sort');
    }
    setSearchParams(newSearchParams, { preventScrollReset: true });
  };

  return (
    <Select
      label={t('products.sortBy')}
      placeholder={t('products.sortBy') }
      data={[
        { value: 'popularity', label: t('products.popularity') },
        { value: 'price-low-to-high', label: t('products.priceLowToHigh') },
        { value: 'price-high-to-low', label: t('products.priceHighToLow') },
        { value: 'alphabetic-a-to-z', label: t('products.alphabeticAtoZ') },
        { value: 'alphabetic-z-to-a', label: t('products.alphabeticZtoA') }
      ]}
      onChange={handleFilterChange}
      clearable
      allowDeselect
    />
  );
};

export default ProductsSortBy;
