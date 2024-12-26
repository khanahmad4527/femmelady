import { Center, Group, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { SetURLSearchParams } from 'react-router';
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
    searchParams.get('size') ?? sizes?.[0]?.size
  );

  const handleActiveSize = (size: string) => {
    setActiveSize(size);

    searchParams.set('size', size);
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
        {sizes.map(s => (
          <Center
            w={switchSize}
            h={switchSize}
            key={s.id}
            p={'sm'}
            style={{
              border:
                s.size === activeSize
                  ? '2px solid black'
                  : '2px solid transparent',
              cursor: 'pointer'
            }}
            onClick={() => handleActiveSize(s.size as string)}
          >
            {s.size?.toLocaleUpperCase()}
          </Center>
        ))}
      </Group>
    </Stack>
  );
};

export default ProductSizeSwitcher;
