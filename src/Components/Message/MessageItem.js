import React from 'react';

import classes from './MessageItem.module.css';

const MessageItem = (props) => {
  const { name } = props;

  const classname =
    name !== props.username
      ? `${classes['msg-list__item-container']}`
      : `${classes['msg-list__item-container']} ${classes.own}`;

  return (
    <li className={classes['msg-list__item']}>
      <div className={classname}>
        <h4>{props.name}</h4>
        <p>{props.message}</p>
      </div>
    </li>
  );
};

export default MessageItem;
