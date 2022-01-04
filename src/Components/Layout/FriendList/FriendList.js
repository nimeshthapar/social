import React from 'react';

import classes from './FriendList.module.css';
import FriendItem from './FriendItem';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

const FriendList = (props) => {
  return (
    <ul className={classes['friend-list__items']}>
      {props.isLoading && <LoadingSpinner center />}
      {props.friends.length > 0 &&
        props.friends.map((f) => {
          return (
            <FriendItem
              key={f._id.toString()}
              isActive={f.isActive}
              id={f._id.toString()}
              img={`${process.env.REACT_APP_ASSET_URL}/${f.image}`}
              name={f.name}
              userId={props.userId}
              suggestion={props.suggestion}
              onAdd={props.onAdd}
              token={props.token}
            />
          );
        })}
      {!props.isLoading && props.friends.length === 0 && (
        <p className={classes['empty-list']}>
          {props.suggestion ? 'No Suggestions.' : 'No Friends'}
        </p>
      )}
    </ul>
  );
};

export default FriendList;
