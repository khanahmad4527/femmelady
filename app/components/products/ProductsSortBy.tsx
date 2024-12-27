import { Select } from '@mantine/core';
import { useOutletContext } from 'react-router';
import { DEFAULT_PRODUCT_SORT } from '~/constant';

import useTranslation from '~/hooks/useTranslation';
import { OutletContext } from '~/types/types';
import { getSort } from '~/utils';

const ProductsSortBy = () => {
  const t = useTranslation();
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const handleFilterChange = (value: string | null) => {
    searchParams.set('sort', value ?? DEFAULT_PRODUCT_SORT);
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Select
      label={t('products.sortBy')}
      placeholder={t('products.sortBy')}
      defaultValue={getSort({ searchParams })}
      data={[
        { value: 'popularity', label: t('products.popularity') },
        { value: 'price-low-to-high', label: t('products.priceLowToHigh') },
        { value: 'price-high-to-low', label: t('products.priceHighToLow') },
        { value: 'alphabetic-a-to-z', label: t('products.alphabeticAtoZ') },
        { value: 'alphabetic-z-to-a', label: t('products.alphabeticZtoA') }
      ]}
      onChange={handleFilterChange}
      clearable={false}
      allowDeselect={false}
    />
  );
};

export default ProductsSortBy;
