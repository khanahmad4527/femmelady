import { Box, Button, Stack, Text } from '@mantine/core';
import { href, Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconDatabaseExclamation } from '~/icons';

const NoOrder = () => {
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();

  return (
    <Stack align={'center'} gap={0}>
      <Box ta={'center'} w={{ base: 100, md: 200 }}>
        <IconDatabaseExclamation size={'100%'} />
      </Box>
      <Text ta={'center'} fz={{ base: 25, md: 50 }} fw={500} c={'primary'}>
        {t('orders.noOrders')}
      </Text>
      <Text ta={'center'} fz={{ base: 12, md: 25 }} c={'primary'}>
        {t('orders.noOrdersSubtitle')}
      </Text>
      <Button
        mt={'md'}
        component={Link}
        prefetch="intent"
        to={href('/:lang?/products', { lang: currentLanguage })}
      >
        {t('orders.browseProducts')}
      </Button>
    </Stack>
  );
};

export default NoOrder;
