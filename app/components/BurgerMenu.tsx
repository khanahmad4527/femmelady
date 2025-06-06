import { ActionIcon, Menu } from '@mantine/core';
import { href, Link } from 'react-router';

import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import useCurrentUrl from '~/hooks/useCurrentUrl';
import useTranslation from '~/hooks/useTranslation';
import { IconBurger, IconLogout, IconTruckDelivery, IconUser } from '~/icons';
import menuClasses from '~/styles/Menu.module.scss';
import { buildLocalizedLink } from '~/utils';

const BurgerMenu = () => {
  const t = useTranslation();
  const { currentLanguage } = useCurrentLanguage();
  const { currentUrl } = useCurrentUrl();

  return (
    <Menu trigger={'click-hover'} radius={0} classNames={menuClasses}>
      <Menu.Target>
        <ActionIcon variant="transparent" size={'xl'}>
          <IconBurger />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser />} disabled>
          {t('header.profile')}
        </Menu.Item>
        <Menu.Item
          component={Link}
          prefetch="intent"
          to={buildLocalizedLink({
            url: href('/:lang?/orders', { lang: currentLanguage })
          })}
          leftSection={<IconTruckDelivery />}
        >
          {t('header.orders')}
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout />}
          component={Link}
          prefetch="intent"
          to={buildLocalizedLink({
            url: href('/:lang?/logout', { lang: currentLanguage }),
            queryParams: {
              ...(currentUrl && { 'redirect-to': currentUrl })
            }
          })}
        >
          {t('header.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default BurgerMenu;
