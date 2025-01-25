import { Select } from '@mantine/core';
import { useOutletContext } from 'react-router';
import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_PAGE,
  FORCE_REVALIDATE_MAP,
  PARAM_KEYS
} from '~/constant';
import selectClasses from '~/styles/Select.module.scss';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import useUserLocale from '~/hooks/useUserLocale';
import { OutletContext } from '~/types';
import { formatNumber, getLimit } from '~/utils';

const ProductsPerPage = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const userLocale = useUserLocale(currentLanguage);

  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const limitValue = String(getLimit({ searchParams }));

  const data = [
    { value: '10', label: formatNumber({ userLocale, value: 10 }) },
    { value: '20', label: formatNumber({ userLocale, value: 20 }) },
    { value: '50', label: formatNumber({ userLocale, value: 50 }) },
    { value: '100', label: formatNumber({ userLocale, value: 100 }) }
  ];

  const handleFilterChange = (value: string | null) => {
    if (value !== limitValue) {
      searchParams.set(PARAM_KEYS.PAGE, String(DEFAULT_PRODUCT_PAGE)); // To reset the page to 1
      searchParams.set(
        PARAM_KEYS.LIMIT,
        value ?? String(DEFAULT_PRODUCT_LIMIT)
      );
      searchParams.set(
        PARAM_KEYS.FORCE_REVALIDATE,
        FORCE_REVALIDATE_MAP.GLOBAL
      );
      setSearchParams(searchParams, { preventScrollReset: true });
    }
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
      classNames={selectClasses}
    />
  );
};

export default ProductsPerPage;
