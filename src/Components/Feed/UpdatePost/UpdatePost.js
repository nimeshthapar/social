import React, { Fragment, useEffect } from 'react';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button';
import Input from '../../UI/Input/Input';
import classes from './UpdatePost.module.css';
import useChange from '../../../hooks/useChange';
import useHttp from '../../../hooks/useHttp';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

const UpdatePost = (props) => {
  const {
    value: captionInput,
    valueChangeHandler: captionChangeHandler,
    setValue: setCaptionInput,
  } = useChange();
  const {
    value: locationInput,
    valueChangeHandler: locationChangeHandler,
    setValue: setLocationInput,
  } = useChange();

  const {
    isLoading,
    error,
    sendRequest: sendUpdatePostRequest,
    clearError,
  } = useHttp();

  const { id, token } = props;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await sendUpdatePostRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
          'GET',
          null,
          { Authorization: `Bearer ${token}` }
        );

        setCaptionInput(data.post.caption);
        setLocationInput(data.post.location);
      } catch (err) {}
    };

    fetchPost();
  }, [id, sendUpdatePostRequest, setCaptionInput, setLocationInput, token]);

  const updatePostSubmitHandler = async (e) => {
    e.preventDefault();

    let data;
    try {
      data = await sendUpdatePostRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${props.id}`,
        'PATCH',
        JSON.stringify({ caption: captionInput, location: locationInput }),
        { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      );
    } catch (err) {}

    if (!data) {
      return;
    }

    props.onUpdate(true);
    props.onClose();
  };

  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <Modal
        header="Update Post"
        footer={
          <Fragment>
            <Button onClick={props.onClose} danger>
              Close
            </Button>
            <Button type="submit" inverse>
              Update
            </Button>
          </Fragment>
        }
        footerClass={classes.footer}
        onClose={props.onClose}
        onSubmit={updatePostSubmitHandler}
        mainClass={isLoading ? classes.main : ''}
      >
        {isLoading && <LoadingSpinner center />}
        {!isLoading && (
          <>
            <Input
              for="caption"
              label="Caption"
              textarea
              onChange={captionChangeHandler}
              value={captionInput}
            />
            <Input
              for="location"
              label="Location"
              onChange={locationChangeHandler}
              value={locationInput}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default UpdatePost;
