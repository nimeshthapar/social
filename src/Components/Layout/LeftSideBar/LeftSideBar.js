import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button';
import classes from './LeftSideBar.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

const DUMMY_FRIENDS = [
  {
    id: 'f1',
    name: 'Hinata Shoyou',
    image:
      'https://64.media.tumblr.com/7f995cfd9e651150180d87c0d37d1f5f/tumblr_pwaudjDokk1vy2tgqo2_250.png',
    isActive: true,
  },
  {
    id: 'f2',
    name: 'Kageyama Tobio',
    image:
      'https://mir-s3-cdn-cf.behance.net/projects/404/c71dd6110456837.Y3JvcCw0Mzg1LDM0MjksMCw5MzM.jpg',
    isActive: true,
  },
  {
    id: 'f3',
    name: 'Sung Jin Woo',
    image:
      'https://pbs.twimg.com/profile_images/1353849232495505408/wbrAWRBv_400x400.jpg',
    isActive: true,
  },
  {
    id: 'f4',
    name: ' Chung Myung',
    image: 'https://www.mangaupdates.com/image/i339751.jpg',
  },
];

const LeftSideBar = (props) => {
  const [showFullOptions, setShowFulOptions] = useState(false);
  const [friends, setFriends] = useState(DUMMY_FRIENDS);

  // const frndDataHandler = (frndData) => {
  //   DUMMY_FRIENDS.push(frndData);
  // };

  const { data } = props;

  useEffect(() => {
    if (data.id) {
      setFriends((prev) => [...prev, data]);
    }
  }, [data]);

  const showFullListHandler = () => {
    setShowFulOptions((prev) => !prev);
  };

  return (
    <div className={classes['left-sidebar']}>
      <Link to="/profile/me">
        <div className={classes.information}>
          <span className={classes['active-status']}></span>
          <AccountCircleIcon />
          <p>Admin</p>
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
        <FriendList friends={friends} />
      </div>
    </div>
  );
};

export default LeftSideBar;
