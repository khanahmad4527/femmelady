import { Box, Button, Drawer, Stack } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';
import HeaderCartCard from './HeaderCartCard';
import { Link } from 'react-router';
import { buildLocalizedLink } from '~/utils';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';

const HeaderCart = ({
  opened,
  close
}: {
  opened: boolean;
  close: () => void;
}) => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  return (
    <Drawer
      position={'right'}
      overlayProps={{ blur: 10 }}
      opened={opened}
      onClose={() => {
        close();
      }}
      title={t('cart.shoppingBag')}
      pos={'relative'}
    >
      {Array.from({ length: 2 }, (_, index) => (
        <HeaderCartCard />
      ))}

      <Button
        component={Link}
        to={buildLocalizedLink({ currentLanguage, primaryPath: 'checkout' })}
        color="black"
        fullWidth
      >
        {t('cart.goToCheckout')}
      </Button>
    </Drawer>
  );
};

export default HeaderCart;
