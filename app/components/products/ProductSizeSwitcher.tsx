import { Button, Group, Stack, Text } from '@mantine/core';
import { SetURLSearchParams } from 'react-router';
import { PARAM_KEYS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { ProductSize } from '~/types';
import { formatNumber } from '~/utils';

const switchSize = 40;

const ProductSizeSwitcher = ({
  sizes,
  activeSize,
  setActiveSize,
  searchParams,
  setSearchParams
}: {
  sizes: ProductSize[];
  activeSize: ProductSize;
  setActiveSize: React.Dispatch<React.SetStateAction<ProductSize>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  const t = useTranslation();
  const { userLocale } = useCurrentLanguage();

  const handleActiveSize = (size: ProductSize) => {
    setActiveSize(size);

    searchParams.set(PARAM_KEYS.SIZE, String(size.size));
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Stack gap={4}>
      <Text span>
        {t('products.productSize')}

        {activeSize.size && (
          <Text ml={4} span>
            {isNaN(+activeSize.size)
              ? activeSize.size?.toLocaleUpperCase()
              : formatNumber({ userLocale, value: +activeSize.size })}
          </Text>
        )}
      </Text>
      <Group>
        {sizes.map(s => {
          const isStockLeft = !Boolean(s.stock);
          return (
            <Button
              key={s.id}
              variant="transparent"
              p={0}
              w={switchSize}
              h={switchSize}
              style={{
                border:
                  s.size === activeSize.size
                    ? '2px solid black'
                    : '2px solid transparent'
              }}
              onClick={() => handleActiveSize(s)}
              disabled={isStockLeft}
            >
              {isNaN(+s.size!)
                ? s.size?.toLocaleUpperCase()
                : formatNumber({ userLocale, value: +s.size! })}
            </Button>
          );
        })}
      </Group>
    </Stack>
  );
};

export default ProductSizeSwitcher;
