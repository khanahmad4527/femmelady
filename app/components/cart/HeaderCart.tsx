import { Drawer } from '@mantine/core';
import useTranslation from '~/hooks/useTranslation';
import InfiniteCartLoader from './InfiniteCartLoader';

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
      title={t('checkout.shoppingBag')}
      pos={'relative'}
    >
      <InfiniteCartLoader />
    </Drawer>
  );
};

export default HeaderCart;
