import { Select } from '@mantine/core';
import { useOutletContext } from 'react-router';

import {
  DEFAULT_PRODUCT_PAGE,
  DEFAULT_PRODUCT_SORT,
  FORCE_REVALIDATE_MAP,
  PARAM_KEYS
} from '~/constant';
import useTranslation from '~/hooks/useTranslation';
import selectClasses from '~/styles/Select.module.scss';
import { OutletContext } from '~/types';
import { getSort } from '~/utils';

const ProductsSortBy = () => {
  const t = useTranslation();
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const handleFilterChange = (value: string | null) => {
    searchParams.set(PARAM_KEYS.PAGE, String(DEFAULT_PRODUCT_PAGE)); // To reset the page to 1
    searchParams.set(PARAM_KEYS.SORT, value ?? DEFAULT_PRODUCT_SORT);
    searchParams.set(PARAM_KEYS.FORCE_REVALIDATE, FORCE_REVALIDATE_MAP.GLOBAL);
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
      classNames={selectClasses}
    />
  );
};

export default ProductsSortBy;
