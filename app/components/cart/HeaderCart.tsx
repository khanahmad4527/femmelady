import { Box, Button, Drawer, Stack, Text } from '@mantine/core';
import { href, Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { IconDatabaseExclamation } from '~/icons';
import { buildLocalizedLink } from '~/utils';

import InfiniteCartLoader from './InfiniteCartLoader';

const HeaderCart = ({
  opened,
  close
}: {
  opened: boolean;
  close: () => void;
}) => {
  const t = useTranslation();
  const { cartCount } = useHeaderFooterContext();
  const { currentLanguage } = useCurrentLanguage();

  return (
    <Drawer
      position={'right'}
      overlayProps={{ blur: 10 }}
      opened={opened}
      onClose={() => {
        close();
      }}
      title={t('checkout.shoppingBag')}
      pos={'relative'}
    >
      {!cartCount ? (
        <Stack align={'center'} gap={0}>
          <Box ta={'center'} w={{ base: 50, md: 100 }}>
            <IconDatabaseExclamation size={'100%'} />
          </Box>
          <Text ta={'center'} fz={25} fw={500} c={'primary'}>
            {t('cart.emptyCartTitle')}
          </Text>
          <Text ta={'center'} fz={16} c={'primary'}>
            {t('cart.emptyCartMessage')}
          </Text>
          <Button
            mt={'md'}
            component={Link}
            prefetch="intent"
            to={buildLocalizedLink({
              url: href('/:lang?/products', { lang: currentLanguage }),
              queryParams: {
                'force-validate': 'global'
              }
            })}
            onClick={close}
          >
            {t('common.cartEmptyMessage')}
          </Button>
        </Stack>
      ) : (
        <InfiniteCartLoader close={close} />
      )}
    </Drawer>
  );
};

export default HeaderCart;
