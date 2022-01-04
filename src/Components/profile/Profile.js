import React, { Fragment, useContext, useEffect, useState } from 'react';

import classes from './Profile.module.css';
import PostList from '../Feed/post/PostList';
import Button from '../UI/Button';
import UpdateProfile from './UpdateProfile';
import ProfileText from './ProfileText';
import { AuthContext } from '../../store/auth-context';
import useHttp from '../../hooks/useHttp';
import ErrorModal from '../UI/ErrorModal/ErrorModal';

const ProfileList = (props) => {
  const [posts, setPosts] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [showUpdateProfileModal, setUpdateProfileModal] = useState(false);

  const authCtx = useContext(AuthContext);

  const { profile, profilePosts, token, id } = props;

  useEffect(() => {
    if (profilePosts) {
      setPosts(
        profilePosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  }, [profilePosts]);

  const showProfileInfo = () => {
    setShowPosts(false);
    setShowInfo(true);
  };

  const openPosts = () => {
    setShowInfo(false);
    setShowPosts(true);
  };

  const openUpdateProfileModal = () => {
    setUpdateProfileModal(true);
  };

  const closeUpdateProfileModal = () => {
    setUpdateProfileModal(false);
  };
  const {
    isLoading,
    error,
    sendRequest: sendAddFriendRequest,
    clearError,
  } = useHttp();

  const unFrndBtnHandler = async (e) => {
    try {
      const data = await sendAddFriendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/friends/add/${id}`,
        'PATCH',
        JSON.stringify({ friendId: props.profile._id.toString() }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(data);
      props.onAdd();
    } catch (err) {}
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      {showUpdateProfileModal && (
        <UpdateProfile
          onClose={closeUpdateProfileModal}
          id={profile.id}
          profile={profile}
          onUpdate={props.onUpdate}
          token={token}
        />
      )}
      {props.profile.image && (
        <div className={classes['profile-pic__img-container']}>
          {!showPosts && (
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.profile.image}`}
              alt={`${props.profile.name}_pic`}
            />
          )}
          <h2>{props.profile.name}</h2>
          {props.profile.bio && (
            <p>
              <i>{props.profile.bio}</i>
            </p>
          )}
          <Button
            className={`${classes['show-detail__btn']} ${
              showInfo && classes.active
            }`}
            inverse
            onClick={showProfileInfo}
          >
            Show Profile Info
          </Button>
          <Button
            className={`${classes['show-detail__btn']} ${
              showPosts && classes.active
            }`}
            inverse
            onClick={openPosts}
          >
            Posts
          </Button>
        </div>
      )}
      <hr />
      {showInfo && (
        <div className={classes['profile-info__container']}>
          <h1>Profile Info</h1>
          <ProfileText
            label="School:"
            text={profile.school ? profile.school : 'N.A.'}
          />
          <ProfileText
            label="College:"
            text={profile.college ? profile.college : 'N.A.'}
          />
          <ProfileText
            label="Work:"
            text={
              profile.occupation || profile.at
                ? `${profile.occupation} ${profile.at && 'at'} ${profile.at}`
                : 'N.A.'
            }
          />
          <ProfileText
            label="Relationship:"
            text={profile.relationship ? profile.relationship : 'N.A.'}
          />
          <ProfileText
            label="Friends:"
            text={
              profile.friends.includes(authCtx.userData.id)
                ? profile.friends.length > 1
                  ? `have You and ${profile.friends.length - 1} more friends`
                  : 'You are friends with him'
                : `have ${profile.friends.length} Friends`
            }
          />
        </div>
      )}
      {showInfo && (
        <div className={classes['profile-info__container-action']}>
          {authCtx.userData.id === profile.id && (
            <Button onClick={openUpdateProfileModal}>Update Profile</Button>
          )}
          {authCtx.userData.id !== profile.id && (
            <Button onClick={unFrndBtnHandler}>
              {profile.friends.includes(authCtx.userData.id)
                ? isLoading
                  ? 'Unfriending...'
                  : 'Unfriend'
                : 'Add Friend'}
            </Button>
          )}
        </div>
      )}

      {props.profile.image && showPosts && (
        <PostList posts={posts} onUpdate={props.onUpdate} />
      )}
    </Fragment>
  );
};

export default ProfileList;
