import { Button, Group, Stack, Text } from '@mantine/core';
import { SetURLSearchParams } from 'react-router';
import { PARAM_KEYS } from '~/constant';
import useTranslation from '~/hooks/useTranslation';
import { ProductSize } from '~/types';

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

  const handleActiveSize = (size: ProductSize) => {
    setActiveSize(size);

    searchParams.set(PARAM_KEYS.SIZE, String(size.size));
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Stack gap={4}>
      <Text span>
        {t('products.productSize')}

        <Text ml={4} span>
          {activeSize.size?.toLocaleUpperCase()}
        </Text>
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
              {s?.size?.toLocaleUpperCase()}
            </Button>
          );
        })}
      </Group>
    </Stack>
  );
};

export default ProductSizeSwitcher;
