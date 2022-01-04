import React from 'react';
import { NavLink } from 'react-router-dom';

import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import Button from '../../UI/Button';
import classes from './NavLinks.module.css';
import useHttp from '../../../hooks/useHttp';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

const NavLinks = (props) => {
  const {
    isLoading,
    error,
    sendRequest: sendLogoutRequest,
    clearError,
  } = useHttp();

  const navLogoutHandler = async () => {
    try {
      const data = await sendLogoutRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/logout/${props.id}`,
        'PATCH',
        JSON.stringify({ isActive: false }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        }
      );

      console.log(data);
    } catch (err) {}

    props.logout();
  };
  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} overlay onlyBack />
      )}
      <li className={classes['nav-item']}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : '')}
        >
          {!props.side && <HomeIcon />}
          {props.side && <p>Home</p>}
        </NavLink>
      </li>
      <li className={classes['nav-item']}>
        <NavLink
          to="/messages"
          className={({ isActive }) => (isActive ? classes.active : '')}
        >
          {!props.side && (
            <>
              <ChatIcon />
              <span className={classes.badge}>2</span>
            </>
          )}
          {props.side && <p>Messages</p>}
        </NavLink>
      </li>
      <li className={classes['nav-item']}>
        <NavLink
          to={`/profile/${props.id}`}
          className={({ isActive }) => (isActive ? classes.active : '')}
        >
          {!props.side && (
            <div className={classes['img-container']}>
              <img
                src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
                alt="pic"
              />
            </div>
          )}
          {props.side && <p>Profile</p>}
        </NavLink>
      </li>
      <li className={classes['nav-item']}>
        <Button
          onClick={navLogoutHandler}
          width={props.side ? '' : 'auto'}
          className={props.side ? classes['side-btn'] : ''}
          inverse
        >
          {isLoading ? 'Logging Out..' : 'Logout'}
        </Button>
      </li>
    </>
  );
};

export default NavLinks;
