import React, { Fragment, useRef, useEffect, useState } from 'react';

import classes from './NewPost.module.css';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button';
import useFocusNamedInputButton from '../../../hooks/FocusNamedInputButton';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ShortTextIcon from '@mui/icons-material/ShortText';
import useChange from '../../../hooks/useChange';
import useHttp from '../../../hooks/useHttp';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

const NewPost = (props) => {
  const {
    value: captionInputValue,
    valueChangeHandler: captionChangeHandler,
    setValue: setCaptionInputValue,
  } = useChange(props.caption);
  const {
    value: locationInputValue,
    valueChangeHandler: locationChangeHandler,
    setValue: setLocationInputValue,
  } = useChange();
  const {
    value: feelingInputValue,
    valueChangeHandler: feelingChangeHandler,
    setValue: setFeelingInputValue,
  } = useChange();

  const {
    isLoading,
    error,
    sendRequest: sendNewPostRequest,
    clearError,
  } = useHttp();

  const { photoIsClick, locationIsClick, feelingIsClick, shareIsClick } = props;

  const {
    buttonIsClicked: captionIsClicked,
    openNewPostBtnHandler: openNewPostCaptionBtnHandler,
    closeFocusInputButton: captionCloseButton,
  } = useFocusNamedInputButton(props.shareIsClick);
  const {
    buttonIsClicked: photoIsClicked,
    openNewPostBtnHandler: openNewPostPhotoBtnHandler,
    closeFocusInputButton: photoCloseButton,
  } = useFocusNamedInputButton(props.photoIsClick);
  const {
    buttonIsClicked: locationIsClicked,
    openNewPostBtnHandler: openNewPostLocationBtnHandler,
    closeFocusInputButton: locationCloseButton,
  } = useFocusNamedInputButton(props.locationIsClick);
  const {
    buttonIsClicked: feelingIsClicked,
    openNewPostBtnHandler: openNewPostFeelingBtnHandler,
    closeFocusInputButton: feelingCloseButton,
  } = useFocusNamedInputButton(props.feelingIsClick);

  const captionRef = useRef();
  const locationRef = useRef();
  const imageRef = useRef();
  const feelingRef = useRef();

  useEffect(() => {
    if (photoIsClick) {
      return imageRef.current.click();
    }

    if (locationIsClick) {
      return locationRef.current.focus();
    }

    if (feelingIsClick) {
      return feelingRef.current.focus();
    }

    if (shareIsClick && captionRef) {
      return captionRef.current.focus();
    }
  }, [photoIsClick, locationIsClick, feelingIsClick, shareIsClick, captionRef]);

  const [previewUrl, setPreviewUrl] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const imageChangeHandler = (e) => {
    let pickedFile;
    if (e.target.files || e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
    }
  };

  const submitPostDataHandler = async (e) => {
    e.preventDefault();

    if (
      !captionRef.current &&
      !locationRef.current &&
      !imageRef.current &&
      !feelingRef.current
    ) {
      return console.log("You can't create post without attaching anything");
    }

    let data;
    try {
      const postFormData = new FormData();

      postFormData.append('caption', captionInputValue);
      postFormData.append('location', locationInputValue);
      postFormData.append('image', file);
      postFormData.append('feeling', feelingInputValue);
      postFormData.append('userId', props.id);

      data = await sendNewPostRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/`,
        'POST',
        postFormData,
        { Authorization: `Bearer ${props.token}` }
      );
    } catch (err) {}

    if (!data) {
      return;
    }

    setCaptionInputValue('');
    setFeelingInputValue('');
    setFile();
    setLocationInputValue('');

    props.onAddPost();
    props.closeModal();
  };
  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <Modal
        header="Create Post"
        footer={
          <Fragment>
            <Button onClick={props.onClose} danger>
              Close
            </Button>
            <Button type="submit" inverse>
              {isLoading ? 'Creating....' : 'Create'}
            </Button>
          </Fragment>
        }
        onClose={props.onClose}
        onSubmit={submitPostDataHandler}
      >
        <div className={classes['form-items__container']}>
          {captionIsClicked && (
            <div className={classes['form-items__input-container']}>
              <label htmlFor="caption">Caption</label>
              <textarea
                rows="3"
                placeholder="Write a Caption Text"
                onChange={captionChangeHandler}
                value={captionInputValue}
                ref={captionRef}
              />
              <button
                onClick={captionCloseButton.bind(
                  null,
                  setCaptionInputValue,
                  ''
                )}
                className={classes['close-btn']}
              >
                X
              </button>
            </div>
          )}
          {photoIsClicked && (
            <div className={classes['form-items__input-container']}>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                style={{ display: 'none' }}
                accept=".jpg,.jpeg,.png"
                placeholder="Pick an Image"
                ref={imageRef}
                onChange={imageChangeHandler}
              />
              <div className={classes['image-upload__preview']}>
                {previewUrl && <img src={previewUrl} alt="preveiw" />}
                {!previewUrl && <p>Please Pick an Image</p>}
              </div>
              <button
                onClick={photoCloseButton.bind(null, setPreviewUrl, '')}
                className={classes['close-btn']}
              >
                X
              </button>
            </div>
          )}
          {locationIsClicked && (
            <div className={classes['form-items__input-container']}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                placeholder="Write your Location"
                ref={locationRef}
                onChange={locationChangeHandler}
                value={locationInputValue}
              />
              <button
                onClick={locationCloseButton.bind(
                  null,
                  setLocationInputValue,
                  ''
                )}
                className={classes['close-btn']}
              >
                X
              </button>
            </div>
          )}
          {feelingIsClicked && (
            <div className={classes['form-items__input-container']}>
              <label htmlFor="feeling">Feeling</label>
              <select
                title="feelings"
                ref={feelingRef}
                onChange={feelingChangeHandler}
                value={feelingInputValue}
              >
                <option defaultValue>--Select an Option--</option>
                <option>😊 Happy</option>
                <option>🙁 Sad</option>
                <option>🔥 Lit</option>
                <option>😨 Scared</option>
                <option>😷 Unwell</option>
                <option>😍 In Love</option>
                <option>😡 Angry</option>
                <option>😄 Excited</option>
                <option>🙏 Thankful</option>
                <option>🤪 Crazy</option>
                <option>😇 Blessed</option>
                <option>😬 Awkward</option>
              </select>
              <button
                onClick={feelingCloseButton.bind(
                  null,
                  setFeelingInputValue,
                  ''
                )}
                className={classes['close-btn']}
              >
                X
              </button>
            </div>
          )}
          <div className={classes.actions}>
            <button
              type="button"
              className={classes['share-actions__action']}
              onClick={openNewPostCaptionBtnHandler.bind(null, () => {
                captionRef.current.focus();
              })}
            >
              <ShortTextIcon style={{ color: 'rgb(110,55,27)' }} />
              <span style={{ color: 'rgb(110,55,27)' }}>Caption</span>
            </button>
            <button
              type="button"
              className={classes['share-actions__action']}
              onClick={openNewPostPhotoBtnHandler.bind(null, () => {
                imageRef.current.click();
              })}
            >
              <PermMediaIcon style={{ color: 'green' }} />
              <span style={{ color: 'green' }}>Photo</span>
            </button>
            <button
              type="button"
              className={classes['share-actions__action']}
              onClick={openNewPostLocationBtnHandler.bind(null, () => {
                locationRef.current.focus();
              })}
            >
              <RoomIcon />
              <span>Location</span>
            </button>
            <button
              type="button"
              className={classes['share-actions__action']}
              onClick={openNewPostFeelingBtnHandler.bind(null, () => {
                feelingRef.current.focus();
              })}
            >
              <EmojiEmotionsIcon style={{ color: 'darkgoldenrod' }} />
              <span style={{ color: 'darkgoldenrod' }}>Feeling</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewPost;
