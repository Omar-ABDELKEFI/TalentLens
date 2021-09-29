import React from 'react';
import { Menu } from 'antd';
import { history } from '@redux/store';

const AccountMenu = () => {
  const handleSignOut = () => {
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload();
  };
  return (
    <Menu>
      <Menu.Item key="1">
        Settings
      </Menu.Item>
      <Menu.Item key="2" onClick={handleSignOut}>
        Sign out
      </Menu.Item>

    </Menu>
  );
};

export default AccountMenu;
