import { Drawer } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';

const HeaderCart = ({
  opened,
  close
}: {
  opened: boolean;
  close: () => void;
}) => {
  const t = useTranslation();
  return (
    <Drawer
      position={'right'}
      overlayProps={{ blur: 10 }}
      opened={opened}
      onClose={close}
      title={t('cart.shoppingBag')}
    >
      {/* Drawer content */}
    </Drawer>
  );
};

export default HeaderCart;
