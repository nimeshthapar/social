import React, { useContext } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import classes from './TopNavigation.module.css';
import { AuthContext } from '../../../store/auth-context';
import Header from './Header';
import NavLinks from './NavLinks';

const TopNavigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header isLoggedIn={authCtx.isLoggedIn}>
        {authCtx.isLoggedIn && (
          <div className={classes.searchbar}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search name, people, photos and videos"
            />
          </div>
        )}
        {authCtx.isLoggedIn && (
          <nav className={classes.nav}>
            <ul className={classes['nav-items']}>
              <NavLinks
                id={authCtx.userData.id}
                image={authCtx.userData.image}
                logout={authCtx.logout}
                token={authCtx.token}
              />
            </ul>
          </nav>
        )}
      </Header>
    </>
  );
};

export default TopNavigation;
