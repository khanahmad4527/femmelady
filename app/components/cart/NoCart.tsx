import { Box, Button, Stack, Text } from '@mantine/core';
import { Link, useOutletContext } from 'react-router';
import { PATHS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useTranslation from '~/hooks/useTranslation';
import { IconDatabaseExclamation } from '~/icons';
import { OutletContext } from '~/types';
import { buildLocalizedLink } from '~/utils';

const NoCart = () => {
  const { env } = useOutletContext<OutletContext>();
  const { currentLanguage } = useCurrentLanguage();
  const t = useTranslation();

  return (
    <Stack align={'center'} gap={0}>
      <Box ta={'center'} w={{ base: 100, md: 200 }}>
        <IconDatabaseExclamation size={'100%'} />
      </Box>
      <Text ta={'center'} fz={{ base: 25, md: 50 }} fw={500} c={'primary'}>
        {t('cart.emptyCartTitle')}
      </Text>
      <Text ta={'center'} fz={{ base: 12, md: 25 }} c={'primary'}>
        {t('cart.emptyCartMessage')}
      </Text>
      <Button
        mt={'md'}
        component={Link}
        to={buildLocalizedLink({
          baseUrl: env?.APP_URL!,
          currentLanguage,
          paths: [PATHS.products]
        })}
      >
        {t('common.cartEmptyMessage')}
      </Button>
    </Stack>
  );
};

export default NoCart;
