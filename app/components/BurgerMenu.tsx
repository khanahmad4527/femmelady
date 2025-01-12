import { ActionIcon, Menu } from '@mantine/core';
import { Link } from 'react-router';
import { IconBurger, IconLogout, IconTruckDelivery, IconUser } from '~/icons';
import menuClasses from '~/styles/Menu.module.scss';

const BurgerMenu = () => {
  return (
    <Menu trigger={'click-hover'} radius={0} classNames={menuClasses}>
      <Menu.Target>
        <ActionIcon variant="transparent" size={'xl'}>
          <IconBurger />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser />} disabled>
          Profile
        </Menu.Item>
        <Menu.Item leftSection={<IconTruckDelivery />} disabled>
          Orders
        </Menu.Item>
        <Menu.Item leftSection={<IconLogout />} component={Link} to={'/logout'}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default BurgerMenu;
