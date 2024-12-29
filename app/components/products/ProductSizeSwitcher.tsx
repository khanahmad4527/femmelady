import { Button, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { SetURLSearchParams } from 'react-router';
import { PARAMS } from '~/constant';
import useTranslation from '~/hooks/useTranslation';
import { ProductSize } from '~/types/types';

const switchSize = 40;

const ProductSizeSwitcher = ({
  sizes,
  searchParams,
  setSearchParams
}: {
  sizes: ProductSize[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  const t = useTranslation();

  const [activeSize, setActiveSize] = useState(
    searchParams.get(PARAMS.SIZE) ?? sizes?.[0]?.size
  );

  const handleActiveSize = (size: string) => {
    setActiveSize(size);

    searchParams.set(PARAMS.SIZE, size);
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <Stack gap={4}>
      <Text span>
        {t('products.productSize')}

        <Text ml={4} span>
          {activeSize?.toLocaleUpperCase()}
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
                  s.size === activeSize
                    ? '2px solid black'
                    : '2px solid transparent'
              }}
              onClick={() => handleActiveSize(s?.size as string)}
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
