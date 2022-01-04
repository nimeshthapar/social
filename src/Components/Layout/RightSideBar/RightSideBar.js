import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../../store/auth-context';
import useHttp from '../../../hooks/useHttp';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import AdSlideShow from '../AdSlideShow/AdSlideShow';
import FriendList from '../FriendList/FriendList';
import classes from './RightSideBar.module.css';

const RightSideBar = (props) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const authCtx = useContext(AuthContext);

  const { token, isLoggedIn } = authCtx;

  const { id } = authCtx.userData;

  const {
    isLoading,
    error,
    sendRequest: fetchSuggestedFriends,
    clearError,
  } = useHttp();

  useEffect(() => {
    const sendReq = async () => {
      if (isLoggedIn) {
        try {
          const data = await fetchSuggestedFriends(
            `${process.env.REACT_APP_BACKEND_URL}/users/suggested/${id}`,
            'GET',
            null,
            { Authorization: `Bearer ${token}` }
          );

          setSuggestedUsers(data.suggestedUsers);
        } catch (err) {}
      }
    };

    const cleanUptimer = setTimeout(() => {
      sendReq();
    });

    return () => {
      clearTimeout(cleanUptimer);
    };
  }, [fetchSuggestedFriends, id, token, isLoggedIn]);

  const addFrndBtnHandler = async () => {
    try {
      const data = await fetchSuggestedFriends(
        `${process.env.REACT_APP_BACKEND_URL}/users/suggested/${id}`,
        'GET',
        null,
        { Authorization: `Bearer ${token}` }
      );

      setSuggestedUsers(data.suggestedUsers);
      props.refreshContact();
    } catch (err) {}
  };

  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <div className={classes.rightsidebar}>
        <div>
          <p className={classes['container-text']}>Sponsored Ads</p>
          <AdSlideShow />
        </div>
        <hr />
        <div>
          <p className={classes['container-text']}>People You May Know</p>
          <FriendList
            friends={suggestedUsers}
            isLoading={isLoading}
            suggestion={true}
            userId={id}
            onAdd={addFrndBtnHandler}
            token={token}
          />
        </div>
      </div>
    </>
  );
};

export default RightSideBar;
