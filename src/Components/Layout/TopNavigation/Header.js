import React, { useState } from 'react';

import SideNav from './SideNav';
import classes from './Header.module.css';

const Header = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideNav = () => {
    setShowSideBar((prev) => !prev);
  };
  return (
    <>
      {showSideBar && <SideNav onClose={toggleSideNav} />}
      <header className={classes.header}>
        {props.isLoggedIn && (
          <button onClick={toggleSideNav} className={classes.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
        <h3 className={classes.logo}>MERN-BOOK</h3>
        {props.children}
      </header>
    </>
  );
};

export default Header;
