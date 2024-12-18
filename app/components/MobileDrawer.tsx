import { Button, Drawer, Stack } from '@mantine/core';
import { Link } from 'react-router';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { ValueLabel } from '~/types/types';
import LanguageSwitcher from './LanguageSwitcher';
import { IconShoppingCart } from '~/icons';

const MobileDrawer = ({
  opened,
  close,
  burgerClose,
  authLinks,
  categoryLinks,
  headerCartDrawerOpen
}: {
  opened: boolean;
  close: () => void;
  burgerClose: () => void;
  authLinks: ValueLabel[];
  categoryLinks: ValueLabel[];
  headerCartDrawerOpen: () => void;
}) => {
  const t = useTranslation();
  const context = useHeaderFooterContext();
  const { isLoggedIn } = context;
  return (
    <Drawer
      position={'right'}
      overlayProps={{ blur: 10 }}
      opened={opened}
      onClose={() => {
        close();
        burgerClose();
      }}
    >
      <Stack>
        <LanguageSwitcher />
        {!isLoggedIn &&
          authLinks.map(l => (
            <Button key={l.id} component={Link} to={l.link} color={'black'}>
              {l.label}
            </Button>
          ))}
        {isLoggedIn && (
          <>
            <Button component={Link} to={'/logout'} color={'black'}>
              {t('common.logout')}
            </Button>
            <Button
              component={Link}
              to={'/logout'}
              color={'black'}
              leftSection={<IconShoppingCart color={'white'} />}
              onClick={headerCartDrawerOpen}
            >
              {'9+'}
            </Button>
          </>
        )}
        {categoryLinks.map(l => (
          <Button key={l.id} component={Link} to={l.link} color={'black'}>
            {l.label}
          </Button>
        ))}
      </Stack>
    </Drawer>
  );
};

export default MobileDrawer;
