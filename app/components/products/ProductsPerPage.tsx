import { Select } from '@mantine/core';
import { useOutletContext } from 'react-router';
import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_PAGE,
  PARAMS
} from '~/constant';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import useUserLocale from '~/hooks/useUserLocale';
import { OutletContext } from '~/types';
import { getLimit } from '~/utils';

const ProductsPerPage = () => {
  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const userLocale = useUserLocale(currentLanguage);

  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const formatNumber = (value: number) => value.toLocaleString(userLocale);

  const limitValue = String(getLimit({ searchParams }));

  const data = [
    { value: '10', label: formatNumber(10) },
    { value: '20', label: formatNumber(20) },
    { value: '50', label: formatNumber(50) },
    { value: '100', label: formatNumber(100) }
  ];

  const handleFilterChange = (value: string | null) => {
    searchParams.set(PARAMS.PAGE, String(DEFAULT_PRODUCT_PAGE));
    searchParams.set(PARAMS.LIMIT, value ?? String(DEFAULT_PRODUCT_LIMIT));
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Select
      value={limitValue}
      onChange={handleFilterChange}
      label={t('products.productsPerPage')}
      placeholder={t('products.productsPerPage')}
      data={data}
      clearable={false}
      allowDeselect={false}
    />
  );
};

export default ProductsPerPage;
