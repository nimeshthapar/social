import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FriendItem.module.css';
import Button from '../..//UI/Button';
import useHttp from '../../../hooks/useHttp';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

const FriendItem = (props) => {
  const {
    isLoading,
    error,
    sendRequest: sendAddFriendRequest,
    clearError,
  } = useHttp();

  const addFrndBtnHandler = async (e) => {
    try {
      const data = await sendAddFriendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/friends/add/${props.userId}`,
        'PATCH',
        JSON.stringify({ friendId: props.id }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        }
      );

      console.log(data);
      props.onAdd();
    } catch (err) {}
  };

  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <li className={classes['friend-list__item']}>
        <Link to={`/profile/${props.id}`}>
          <div className={classes['img-container']}>
            {props.isActive && (
              <span className={classes['active-status']}></span>
            )}
            <img src={props.img} alt={`${props.name}`} />
          </div>
          <p>{props.name}</p>
        </Link>
        {props.suggestion && (
          <Button
            onClick={addFrndBtnHandler}
            className={classes['add-friend__btn']}
            inverse
          >
            {isLoading ? 'Adding...' : 'Add Friend'}
          </Button>
        )}
      </li>
    </>
  );
};

export default FriendItem;
