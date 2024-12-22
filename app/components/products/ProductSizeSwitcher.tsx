import { Center, Group, Stack, Title } from '@mantine/core';
import { memo } from 'react';
import { useSearchParams } from 'react-router';
import useTranslation from '~/hooks/useTranslation';
import { IProductSize } from '~/types/types';

const switchSize = 40;

const ProductSizeSwitcher = ({ sizes }: { sizes: IProductSize[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const t = useTranslation();

  const activeSize = searchParams.get('size');

  const handleActiveSize = (imageSet: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('size', imageSet);
    setSearchParams(newSearchParams, { preventScrollReset: true });
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
                s.size === activeSize ? '2px solid black' : '',
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

export default memo(ProductSizeSwitcher);
