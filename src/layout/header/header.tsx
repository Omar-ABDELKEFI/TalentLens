import React, { useState } from 'react';
import './header.less';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { history } from '@redux/store';
import { UpOutlined, } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons/lib';



const handleSignOut = () => {
  localStorage.removeItem('token');
  history.push('/');
  window.location.reload();
};
const SubHeader = () => {
  const [isOpen,setIsOpen]=useState(false)
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <Header >
      <Menu triggerSubMenuAction="click" onOpenChange={()=>setIsOpen(!isOpen)}	 className="header__container" theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item  ><Link to="/my-tests">
          <span className="header__item">My Tests</span>
        </Link></Menu.Item>
        <Menu.Item key="2"><Link to="/candidates">
          <span className="header__item">Candidates</span>
        </Link></Menu.Item>
        <Menu.Item key="4"><span className="header__item">Questions</span></Menu.Item>
        <SubMenu   key="sub1" className="header__menu"  title={<span className="header__item">Account{isOpen?<UpOutlined className="header__up"/>:<DownOutlined className="header__up" />}</span>}
                 popupClassName="header__background">
          <Menu.Item key="6">
            <span className="header__item">Settings</span>
          </Menu.Item>
          <Menu.Divider/>
          <Menu.Item key="7" onClick={handleSignOut}>
            <span className="header__item">Sign out</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>

  );
};

export default SubHeader;
