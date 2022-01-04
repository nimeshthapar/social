import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import classes from './Comment.module.css';
import Modal from '../../UI/Modal/Modal';
import SendIcon from '@mui/icons-material/Send';
import Button from '../../UI/Button';
import CommentList from './CommentList/CommentList';
import Input from '../../UI/Input/Input';
import useChange from '../../../hooks/useChange';
import useHttp from '../../../hooks/useHttp';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

let sending;
const Comment = (props) => {
  const [comments, setComments] = useState([]);

  const { postId, name, image, token, updateCount } = props;

  const {
    value: commentValue,
    valueChangeHandler: commentChangeHandler,
    setValue: setCommentValue,
  } = useChange();

  const {
    isLoading,
    error,
    sendRequest: sendCommentRequest,
    clearError,
  } = useHttp();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await sendCommentRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/comments/${postId}`,
          'GET',
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (!data) {
          return;
        }

        setComments(data.comments);
      } catch (Err) {}
    };

    fetchComments();
  }, [sendCommentRequest, postId, token]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_ASSET_URL);

    socket.on('update-comment', (commentData) => {
      setComments((prev) => [...prev, commentData.comment]);
    });
    updateCount();
  }, [updateCount]);

  const submitCommentFormHandler = async (e) => {
    e.preventDefault();

    sending = true;
    try {
      await sendCommentRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/comments/`,
        'POST',
        JSON.stringify({
          name: name,
          image: image,
          postId,
          comment: commentValue,
        }),
        { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      );

      // setComments((prev) => [...prev, data.comment]);
    } catch (Err) {}
    sending = false;
    setCommentValue('');
  };
  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <Modal
        header="Comments"
        onClose={props.onClose}
        onSubmit={submitCommentFormHandler}
        footer={
          <>
            <Input
              textarea
              placeholder={`Add a Comment, ${name}`}
              rows="3"
              onChange={commentChangeHandler}
              value={commentValue}
            />
            <div className={classes['comment-actions']}>
              <Button type="submit">
                <SendIcon /> {sending && isLoading ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </>
        }
      >
        <CommentList comments={comments} />
        {isLoading && <LoadingSpinner center />}
      </Modal>
    </>
  );
};

export default Comment;
