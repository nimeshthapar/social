import React from 'react';

import classes from './FriendList.module.css';
import FriendItem from './FriendItem';

const FriendList = (props) => {
  return (
    <ul className={classes['friend-list__items']}>
      {props.friends.length > 0 &&
        props.friends.map((f) => {
          return (
            <FriendItem
              key={f.id}
              isActive={f.isActive}
              id={f.id}
              img={f.image}
              name={f.name}
              suggestion={props.suggestion}
              onAdd={props.onAdd}
            />
          );
        })}
      {props.friends.length === 0 && (
        <p className={classes['empty-list']}>
          {props.suggestion ? 'No Suggestions.' : 'No Friends in Contact List'}
        </p>
      )}
    </ul>
  );
};

export default FriendList;
