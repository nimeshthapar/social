import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button';
import classes from './LeftSideBar.module.css';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GroupIcon from '@mui/icons-material/Group';
import MasksIcon from '@mui/icons-material/Masks';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EventIcon from '@mui/icons-material/Event';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SchoolIcon from '@mui/icons-material/School';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import FriendList from '../FriendList/FriendList.js';
import { AuthContext } from '../../../store/auth-context';
import useHttp from '../../../hooks/useHttp';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

const LeftSideBar = (props) => {
  const [showFullOptions, setShowFulOptions] = useState(false);
  const [friends, setFriends] = useState([]);

  const authCtx = useContext(AuthContext);

  const { token, isLoggedIn } = authCtx;

  const { id } = authCtx.userData;

  const { isLoading, error, sendRequest: fetchFriends, clearError } = useHttp();

  useEffect(() => {
    const sendReq = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchFriends(
            `${process.env.REACT_APP_BACKEND_URL}/users/friends/${id}`,
            'GET',
            null,
            { Authorization: `Bearer ${token}` }
          );

          setFriends(data.friends);
        } catch (err) {}
      }
    };

    sendReq();
  }, [fetchFriends, id, token, isLoggedIn]);

  const { refresh, stopRefresh } = props;
  useEffect(() => {
    if (refresh && isLoggedIn) {
      const sendReq = async () => {
        try {
          const data = await fetchFriends(
            `${process.env.REACT_APP_BACKEND_URL}/users/friends/${id}`,
            'GET',
            null,
            { Authorization: `Bearer ${token}` }
          );
          setFriends(data.friends);
        } catch (err) {}
      };

      const cleanUptimer = setTimeout(() => {
        sendReq();
        stopRefresh();
      });

      return () => {
        clearTimeout(cleanUptimer);
      };
    }
  }, [refresh, stopRefresh, fetchFriends, id, token, isLoggedIn]);

  const showFullListHandler = () => {
    setShowFulOptions((prev) => !prev);
  };

  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <div className={classes['left-sidebar']}>
        <Link to={`/profile/${authCtx.userData.id}`}>
          <div className={classes.information}>
            {authCtx.userData.isActive && (
              <span className={classes['active-status']}></span>
            )}
            <p>{authCtx.userData.name}</p>
          </div>
          <hr />
        </Link>
        <ul className={classes['sidebar-options']}>
          <li>
            <Link to="/">
              <RssFeedIcon />
              <p>Feed</p>
            </Link>
          </li>
          <li>
            <Link to="/messages">
              <ChatBubbleIcon />
              <p>Chats</p>
            </Link>
          </li>
          <li>
            <Link to="/messages">
              <GroupIcon />
              <p>Groups</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <BookmarkIcon />
              <p>Saved</p>
            </Link>
          </li>
          {showFullOptions && (
            <li>
              <Link to="/">
                <EventIcon />
                <p>Events</p>
              </Link>
            </li>
          )}
          {showFullOptions && (
            <li>
              <Link to="/">
                <MasksIcon />
                <p>Covid Info Center</p>
              </Link>
            </li>
          )}
          {showFullOptions && (
            <li>
              <Link to="/">
                <SchoolIcon />
                <p>Courses</p>
              </Link>
            </li>
          )}
          {showFullOptions && (
            <li>
              <Link to="/faqs">
                <LiveHelpIcon />
                <p>FAQ</p>
              </Link>
            </li>
          )}
        </ul>
        <div className={classes['options-action']}>
          <Button onClick={showFullListHandler} inverse>
            <span>
              {showFullOptions ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </span>
            {showFullOptions ? 'Show Less' : 'Show More'}
          </Button>
        </div>
        <hr />
        <div className={classes['friends-list']}>
          <span>Contacts</span>
          <FriendList friends={friends} isLoading={isLoading} token={token} />
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
