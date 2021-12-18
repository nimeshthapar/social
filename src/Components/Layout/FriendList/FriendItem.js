import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FriendItem.module.css';
import Button from '../..//UI/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const FriendItem = (props) => {
  const addFrndBtnHandler = (e) => {
    props.onAdd(props.id);
  };
  return (
    <li className={classes['friend-list__item']}>
      <Link to={`/profile/${props.id}`}>
        <div className={classes['img-container']}>
          {props.isActive && <span className={classes['active-status']}></span>}
          <img src={props.img} alt={`${props.name}.jpg`} />
        </div>
        <p>{props.name}</p>
      </Link>
      {props.suggestion && (
        <Button
          onClick={addFrndBtnHandler}
          className={classes['add-friend__btn']}
          inverse
        >
          <PersonAddIcon /> Add
        </Button>
      )}
    </li>
  );
};

export default FriendItem;
