import { Select } from '@mantine/core';
import { useSearchParams } from '@remix-run/react';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import useUserLocale from '~/hooks/useUserLocale';

const ProductsPerPage = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const userLocale = useUserLocale(currentLanguage);
  const [searchParams, setSearchParams] = useSearchParams();

  const formatNumber = (value: number) => value.toLocaleString(userLocale);

  const limitValue = searchParams.get('limit') ?? '10';

  const data = [
    { value: '10', label: formatNumber(10) },
    { value: '20', label: formatNumber(20) },
    { value: '50', label: formatNumber(50) },
    { value: '100', label: formatNumber(100) }
  ];

  const handleFilterChange = (value: string | null) => {
    const newFilter = value || null;
    const newSearchParams = new URLSearchParams(searchParams);
    if (newFilter) {
      newSearchParams.set('limit', newFilter);
    } else {
      newSearchParams.delete('limit');
    }
    setSearchParams(newSearchParams, { preventScrollReset: true });
  };

  return (
    <Select
      label={t('products.productsPerPage')}
      placeholder={t('products.productsPerPage')}
      defaultValue={limitValue}
      data={data}
      onChange={handleFilterChange}
      clearable
      allowDeselect
    />
  );
};

export default ProductsPerPage;
