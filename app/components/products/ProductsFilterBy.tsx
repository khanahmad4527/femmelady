import { Accordion, Box, Button, Group, Text } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';

const ProductsFilterBy = () => {
  const t = useTranslation();
  
  const productsFilterByAccordionData = [
    {
      value: 'category',
      label: t('products.category')
    },
    {
      value: 'price',
      label: t('products.price')
    },
    {
      value: 'brand',
      label: t('products.brand')
    },
    {
      value: 'rating',
      label: t('products.rating')
    }
  ];

  const items = productsFilterByAccordionData.map(item => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.label}</Accordion.Control>
      <Accordion.Panel>Hi</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box>
      <Group>
        <Text>{t('products.filterBy')}</Text>
        <Button>{t('products.clearFilter')}</Button>
      </Group>
      <Accordion defaultValue="Apples">{items}</Accordion>
    </Box>
  );
};

export default ProductsFilterBy;
