import { Drawer } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';
import HeaderCartCard from './HeaderCartCard';

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
      onClose={() => {
        close();
      }}
      title={t('cart.shoppingBag')}
    >
      {Array.from({ length: 10 }, (_, index) => (
        <HeaderCartCard />
      ))}
    </Drawer>
  );
};

export default HeaderCart;
