import React, { Fragment, useReducer, useState } from 'react';

import HistoryIcon from '@mui/icons-material/History';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '../../UI/Card';
import classes from './PostItem.module.css';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import UpdatePost from '../UpdatePost/UpdatePost';

const likeStateReducer = (state, action) => {
  if (action.type === 'LIKED') {
    if (state.isLiked) {
      return { isLiked: !state.isLiked, likesCount: state.likesCount - 1 };
    }
    return { isLiked: !state.isLiked, likesCount: state.likesCount + 1 };
  }

  return state;
};

const PostItem = (props) => {
  const [initialLikeState, dispatchLikeState] = useReducer(likeStateReducer, {
    isLiked: false,
    likesCount: props.likesCount,
  });

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

  const likedClickHandler = () => {
    dispatchLikeState({ type: 'LIKED' });
  };

  const deleteClickHandler = () => {
    setShowConfirmDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setShowConfirmDeleteModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log('DELETING..');
    setShowConfirmDeleteModal(false);
  };

  const openUpdatePostHandler = () => {
    setShowUpdatePostModal(true);
  };

  const closeUpdatePostModalHandler = () => {
    setShowUpdatePostModal(false);
  };

  return (
    <Fragment>
      {showConfirmDeleteModal && (
        <ErrorModal
          onConfirm={confirmDeleteHandler}
          onClose={closeDeleteModalHandler}
          text={"This Post will be deleted and cant't be restored"}
        />
      )}
      {showUpdatePostModal && (
        <UpdatePost id={props.id} onClose={closeUpdatePostModalHandler} />
      )}
      <Card>
        <div className={classes['img-container']}>
          <img src={props.userPic} alt="profile_pic" />
          <h3>{props.username}</h3>
        </div>
        <div className={classes['time-and-location__info']}>
          <p>
            <HistoryIcon />
            {props.time}
          </p>
          <p>{props.feeling}</p>
          <p>
            <LocationOnIcon />
            {props.location}
          </p>
        </div>
        <hr />
        <div className={classes['post-caption-and-data__info']}>
          <p>
            <i>{props.caption}</i>
          </p>
          {props.image && (
            <div className={classes['post-img__container']}>
              <img src={props.image} alt={props.username} />
            </div>
          )}
        </div>
        <hr />
        <div className={classes['post-actions']}>
          <div className={classes['post-actions__like']}>
            <span
              className={`${
                classes[`${initialLikeState.isLiked && 'active'}`]
              } ${classes[`${initialLikeState.isLiked && 'bump'}`]}`}
            >
              {initialLikeState.likesCount}
            </span>
            <button
              className={classes[`${initialLikeState.isLiked && 'active'}`]}
              onClick={likedClickHandler}
            >
              <FavoriteBorderIcon />
              Like
            </button>
          </div>
          <div className={classes['post-actions__comment']}>
            <span>{props.commentsCount}</span>
            <button>
              <CommentIcon />
              Comment
            </button>
          </div>
          <div className={classes['post-actions__edit']}>
            <button onClick={openUpdatePostHandler}>
              <EditIcon />
              Edit
            </button>
          </div>
          <div className={classes['post-actions__delete']}>
            <button onClick={deleteClickHandler}>
              <DeleteIcon />
              Delete
            </button>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default PostItem;
