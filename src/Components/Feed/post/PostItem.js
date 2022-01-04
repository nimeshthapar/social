import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { io } from 'socket.io-client';

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
import Comment from '../Comment/Comment';
import useHttp from '../../../hooks/useHttp';
import { AuthContext } from '../../../store/auth-context';

const likeStateReducer = (state, action) => {
  if (action.type === 'LIKED') {
    if (state.isLiked) {
      return { isLiked: !state.isLiked, likesCount: state.likesCount - 1 };
    }
    return { isLiked: !state.isLiked, likesCount: state.likesCount + 1 };
  }

  if (action.type === 'IS_LIKED') {
    return { isLiked: action.isLiked, likesCount: action.likesCount };
  }

  return state;
};

const PostItem = (props) => {
  const [initialLikeState, dispatchLikeState] = useReducer(likeStateReducer, {
    isLiked: props.isLiked,
    likesCount: props.likesCount,
  });

  const authCtx = useContext(AuthContext);

  const { id } = props;

  const {
    isLoading,
    error,
    sendRequest: sendPostItemRequest,
    clearError,
  } = useHttp();

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [commentCount, setCommentCount] = useState(props.commentsCount);

  const likedClickHandler = async () => {
    try {
      await sendPostItemRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/likes/${props.id}`,
        'PATCH',
        JSON.stringify({ userId: authCtx.userData.id }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
    } catch (err) {}

    dispatchLikeState({ type: 'LIKED' });
  };

  const deleteClickHandler = () => {
    setShowConfirmDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setShowConfirmDeleteModal(false);
  };

  const confirmDeleteHandler = async () => {
    try {
      const data = await sendPostItemRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${props.id}`,
        'DELETE',
        null,
        { Authorization: `Bearer ${authCtx.token}` }
      );

      console.log(data);
    } catch (err) {}

    setShowConfirmDeleteModal(false);

    props.onUpdate(true);
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_ASSET_URL);

    socket.on('delete', (deletedId) => {
      setOnDelete(deletedId === id);
    });
  }, [id]);

  const openUpdatePostHandler = () => {
    setShowUpdatePostModal(true);
  };

  const closeUpdatePostModalHandler = () => {
    setShowUpdatePostModal(false);
  };

  const openShowComment = () => {
    setShowComment(true);
  };

  const closeShowComment = () => {
    setShowComment(false);
  };

  const updateCountaHandler = useCallback(() => {
    setCommentCount((prev) => prev + 1);
  }, []);

  return (
    <Fragment>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      {showConfirmDeleteModal && (
        <ErrorModal
          onConfirm={confirmDeleteHandler}
          onClose={closeDeleteModalHandler}
          text={"This Post will be deleted and cant't be restored"}
          overlay
          isLoading={isLoading}
        />
      )}
      {showUpdatePostModal && (
        <UpdatePost
          id={props.id}
          token={authCtx.token}
          onClose={closeUpdatePostModalHandler}
          onUpdate={props.onUpdate}
        />
      )}
      {showComment && (
        <Comment
          postId={props.id}
          name={authCtx.userData.name}
          image={authCtx.userData.image}
          token={authCtx.token}
          updateCount={updateCountaHandler}
          onClose={closeShowComment}
        />
      )}
      <Card>
        <li>
          <div className={classes['img-container']}>
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.userPic}`}
              alt="profile_pic"
            />
            <h3>{props.username}</h3>
          </div>
          <div className={classes['time-and-location__info']}>
            <p>
              <HistoryIcon />
              {props.time}
            </p>
            {props.feeling && <p>{props.feeling}</p>}
            {props.location && (
              <p>
                <LocationOnIcon />
                {props.location}
              </p>
            )}
          </div>
          <hr />
          <div className={classes['post-caption-and-data__info']}>
            <p>
              <i>{props.caption}</i>
            </p>
            {props.image && !props.image.includes('undefined') && (
              <div className={classes['post-img__container']}>
                <img
                  src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
                  alt={props.username}
                />
              </div>
            )}
          </div>
          <hr />
          {onDelete && (
            <h4 className={classes['delete-text']}>This Post Got Deleted</h4>
          )}
          {!onDelete && (
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
                <span>{commentCount}</span>
                <button onClick={openShowComment}>
                  <CommentIcon />
                  Comment
                </button>
              </div>
              {props.userId === authCtx.userData.id && (
                <div className={classes['post-actions__edit']}>
                  <button onClick={openUpdatePostHandler}>
                    <EditIcon />
                    Edit
                  </button>
                </div>
              )}
              {props.userId === authCtx.userData.id && (
                <div className={classes['post-actions__delete']}>
                  <button onClick={deleteClickHandler}>
                    <DeleteIcon />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </li>
      </Card>
    </Fragment>
  );
};

export default PostItem;
