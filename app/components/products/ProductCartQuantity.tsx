import { Select, Stack, Title } from '@mantine/core';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import useUserLocale from '~/hooks/useUserLocale';
import selectClasses from '~/styles/Select.module.scss';
import { formatNumber } from '~/utils';

const ProductCartQuantity = ({
  disabled,
  quantity,
  setQuantity
}: {
  disabled: boolean;
  quantity: string | null;
  setQuantity: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const userLocale = useUserLocale(currentLanguage);

  return (
    <Stack gap={4}>
      <Title order={5}>{t('products.cartQuantity')}</Title>
      <Select
        name={'quantity'}
        data={Array.from({ length: 10 }, (_, index) => ({
          value: (index + 1).toString(),
          label: formatNumber({ userLocale, value: index + 1 })
        }))}
        value={quantity}
        onChange={setQuantity}
        allowDeselect={false}
        clearable={false}
        disabled={disabled}
        classNames={selectClasses}
        size="md"
      />
    </Stack>
  );
};

export default ProductCartQuantity;
