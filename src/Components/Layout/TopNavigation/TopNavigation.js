import React from 'react';
import { NavLink } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import classes from './TopNavigation.module.css';

const TopNavigation = () => {
  return (
    <header className={classes.header}>
      <h3 className={classes.logo}>MERN-BOOK</h3>
      <div className={classes.searchbar}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search name, people, photos and videos"
        />
      </div>
      <nav className={classes.nav}>
        <ul className={classes['nav-items']}>
          <li className={classes['nav-item']}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              <HomeIcon />
            </NavLink>
          </li>
          <li className={classes['nav-item']}>
            <NavLink
              to="/messages"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              <ChatIcon />
              <span className={classes.badge}>2</span>
            </NavLink>
          </li>
          <li className={classes['nav-item']}>
            <NavLink
              to="/notifications"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              <NotificationsIcon />
              <span className={classes.badge}>2</span>
            </NavLink>
          </li>
          <li className={classes['nav-item']}>
            <NavLink
              to={`/profile/${'me'}`}
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              <div className={classes['img-container']}>
                <img
                  src={
                    'https://animesher.com/orig/1/117/1178/11781/animesher.com_shonen-hinata-shouyou-manga-1178122.jpg'
                  }
                  alt="profile_pic"
                />
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TopNavigation;
