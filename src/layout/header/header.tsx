import React from 'react';
import './header.less'
import {  Menu, Dropdown, Button, message, Space, Tooltip  } from "antd";
import { DownOutlined } from '@ant-design/icons';
import AccountMenu from "@components/menu/AccountMenu";
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <div className="header__container">
            <div className="header__element  header__first-element">
                <Link to="/my-tests" className="header__menu">
                    <span style={{color:"white"}}>My Tests</span>
                </Link>
                <span>My Candidates</span>
            </div>
            <div className="header__element header__second-element">
                <span>Tests</span>
                <span>Questions</span>
                <div className="header__dropdown">
                    <div className="header__dropdown-btn">
                        <Dropdown overlay={AccountMenu}>
                            <Button style={{background: "rgba(0,0,0,0)",borderColor:"rgba(0,0,0,0)",color:"white"}} className="header__menu">
                                Account <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
