import React from 'react';
import './header.less'

const Header = () => {
    return (
        <div className="header__container">
            <div className="header__element  header__first-element">
                <span>My Tests</span>
                <span>My Candidates</span>
            </div>
            <div className="header__element header__second-element">
                <span>Tests</span>
                <span>Questions</span>
                <div className="header__dropdown">
                    <div className="header__dropdown-btn">
                        <span>My Account :</span>
                        <span className="header__caret"/>
                    </div>
                    <div className="header__dropdown-content">
                        <span>Settings</span>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;