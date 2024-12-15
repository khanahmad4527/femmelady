import { Center, Group, Stack, Title } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';

const sizeChart = [
  { label: 'XS', value: 'xs' },
  { label: 'S', value: 's' },
  { label: 'MD', value: 'md' },
  { label: 'L', value: 'l' },
  { label: 'XL', value: 'xl' }
];

export const ProductSizeSwitcher = () => {
  const t = useTranslation();
  const switchSize = 40;
  return (
    <Stack gap={4}>
      <Title order={5}>{t('products.productSize')}</Title>
      <Group>
        {sizeChart.map((s, i) => (
          <Center
            w={switchSize}
            h={switchSize}
            key={s.value}
            p={'sm'}
            style={{
              border: i === 0 ? '2px solid black' : '2px solid gray',
              cursor: 'pointer'
            }}
          >
            {s.label}
          </Center>
        ))}
      </Group>
    </Stack>
  );
};
