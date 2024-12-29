import { Box, Button, Drawer, Stack } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';
import HeaderCartCard from './HeaderCartCard';
import { Link } from 'react-router';
import { buildLocalizedLink, formatCurrency } from '~/utils';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';

const HeaderCart = ({
  opened,
  close
}: {
  opened: boolean;
  close: () => void;
}) => {
  const t = useTranslation();
  const currentLanguage = useCurrentLanguage();
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
      {Array.from({ length: 2 }, (_, index) => (
        <HeaderCartCard key={index} />
      ))}

      <Button
        component={Link}
        to={buildLocalizedLink({ currentLanguage, paths: ['checkout'] })}
        color="black"
        fullWidth
        onClick={close}
      >
        {t('checkout.goToCheckout')}{' '}
        {formatCurrency({ currentLanguage, value: 1234.56 })}
      </Button>
    </Drawer>
  );
};

export default HeaderCart;
