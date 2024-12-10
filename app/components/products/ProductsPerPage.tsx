import { Select } from '@mantine/core';
import { LANGUAGE_TO_LOCALE_LANGUAGE } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import useUserLocale from '~/hooks/useUserLocale';

const ProductsPerPage = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();

  const userLocale = useUserLocale(currentLanguage);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat(userLocale).format(value);

  const data = [
    { value: '10', label: formatNumber(10) },
    { value: '20', label: formatNumber(20) },
    { value: '50', label: formatNumber(50) },
    { value: '100', label: formatNumber(100) }
  ];

  return (
    <Select
      label={t('products.productsPerPage')}
      data={data}
      clearable
      allowDeselect
    />
  );
};

export default ProductsPerPage;
