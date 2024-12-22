import { Center, Group, Stack, Title } from '@mantine/core';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import useTranslation from '~/hooks/useTranslation';
import { IProductSize } from '~/types/types';

const switchSize = 40;

const ProductSizeSwitcher = ({ sizes }: { sizes: IProductSize[] }) => {
  const t = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeSize, setActiveSize] = useState(
    searchParams.get('size') ?? sizes[0].size
  );

  const handleActiveSize = (size: string) => {
    setActiveSize(size);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('size', size);

    setSearchParams(newSearchParams, {
      preventScrollReset: true
    });
  };

  return (
    <Stack gap={4}>
      <Title order={5}>{t('products.productSize')}</Title>
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
            onClick={() => handleActiveSize(s.size)}
          >
            {s.size.toLocaleUpperCase()}
          </Center>
        ))}
      </Group>
    </Stack>
  );
};

export default ProductSizeSwitcher;
