import React from 'react';

import classes from './CommentItem.module.css';

const CommentItem = (props) => {
  return (
    <li className={classes['comment-list__item']}>
      <div className={classes['img-container']}>
        <img
          src={`${process.env.REACT_APP_ASSET_URL}/${props.userPic}`}
          alt={props.username}
        />
        <h3>{props.username}</h3>
      </div>
      <p>{props.comment}</p>
    </li>
  );
};

export default CommentItem;
