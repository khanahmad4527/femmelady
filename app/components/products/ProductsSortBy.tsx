import { Select } from '@mantine/core';
import { useOutletContext } from 'react-router';
import { DEFAULT_PRODUCT_PAGE, DEFAULT_PRODUCT_SORT, PARAMS } from '~/constant';

import useTranslation from '~/hooks/useTranslation';
import { OutletContext } from '~/types/types';
import { getSort } from '~/utils';

const ProductsSortBy = () => {
  const t = useTranslation();
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const handleFilterChange = (value: string | null) => {
    searchParams.set(PARAMS.PAGE, String(DEFAULT_PRODUCT_PAGE));
    searchParams.set(PARAMS.SORT, value ?? DEFAULT_PRODUCT_SORT);
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Select
      label={t('products.sortBy')}
      placeholder={t('products.sortBy')}
      value={getSort({ searchParams })}
      data={[
        { value: '-viewed_count', label: t('products.popularity') },
        { value: 'price', label: t('products.priceLowToHigh') },
        { value: '-price', label: t('products.priceHighToLow') },
        { value: 'translations.title', label: t('products.alphabeticAtoZ') },
        { value: '-translations.title', label: t('products.alphabeticZtoA') }
      ]}
      onChange={handleFilterChange}
      clearable={false}
      allowDeselect={false}
    />
  );
};

export default ProductsSortBy;
