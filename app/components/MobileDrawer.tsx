import { Button, Drawer, Stack } from '@mantine/core';
import { href, Link, useLocation } from 'react-router';
import useHeaderFooterContext from '~/hooks/useHeaderFooterContext';
import useTranslation from '~/hooks/useTranslation';
import { ValueLabel } from '~/types';
import LanguageSwitcher from './LanguageSwitcher';
import { IconShoppingCart } from '~/icons';
import CartCount from './cart/CartCount';
import { buildLocalizedLink } from '~/utils';
import { PATHS } from '~/constant';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { useEffect } from 'react';

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
  const location = useLocation();
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const context = useHeaderFooterContext();
  const { isLoggedIn, cartCount, locale, env } = context;

  useEffect(() => {
    close();
    burgerClose();
  }, [location]);

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
            <Button
              key={l.id}
              component={Link}
              prefetch="intent"
              to={l.link}
              color={'black'}
              onClick={close}
            >
              {l.label}
            </Button>
          ))}
        {isLoggedIn && (
          <>
            <Button
              component={Link}
              prefetch="intent"
              to={href('/:lang?/logout', { lang: currentLanguage })}
              color={'black'}
            >
              {t('common.logout')}
            </Button>
            <Button
              component={Link}
              prefetch="intent"
              to={buildLocalizedLink({
                baseUrl: href('/:lang?/checkout', { lang: currentLanguage }),
                queryParams: {
                  'force-validate': 'global'
                }
              })}
              color={'black'}
              leftSection={<IconShoppingCart color={'white'} />}
              // onClick={headerCartDrawerOpen}
            >
              <CartCount cartCount={cartCount} locale={locale} />
            </Button>
          </>
        )}
        {categoryLinks.map(l => (
          <Button
            key={l.id}
            component={Link}
            prefetch="intent"
            to={l.link}
            color={'black'}
          >
            {l.label}
          </Button>
        ))}
      </Stack>
    </Drawer>
  );
};

export default MobileDrawer;
