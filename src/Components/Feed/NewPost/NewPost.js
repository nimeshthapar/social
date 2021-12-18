import React, { Fragment, useRef, useState, useEffect } from 'react';

import classes from './NewPost.module.css';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button';
import useFocusNamedInputButton from '../../../hooks/FocusNamedInputButton';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ShortTextIcon from '@mui/icons-material/ShortText';

const NewPost = (props) => {
  const [captionInputValue, setCaptionInputValue] = useState(props.caption);
  const [imageInputValue, setImageInputValue] = useState('');
  const [locationInputValue, setLocationInputValue] = useState('');
  const [feelingInputValue, setFeelingInputValue] = useState('');

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
      return imageRef.current.focus();
    }

    if (locationIsClick) {
      return locationRef.current.focus();
    }

    if (feelingIsClick) {
      return feelingRef.current.focus();
    }

    if (shareIsClick) {
      return captionRef.current.focus();
    }
  }, [photoIsClick, locationIsClick, feelingIsClick, shareIsClick]);

  const captionChangeHandler = (e) => {
    setCaptionInputValue(e.target.value);
  };

  const locationChangeHandler = (e) => {
    setLocationInputValue(e.target.value);
  };

  const feelingChangeHandler = (e) => {
    setFeelingInputValue(e.target.value);
  };

  const imageChangeHandler = (e) => {
    setImageInputValue(e.target.value);
  };

  const submitPostDataHandler = (e) => {
    e.preventDefault();

    if (
      !captionRef.current &&
      !locationRef.current &&
      !imageRef.current &&
      !feelingRef.current
    ) {
      return console.log("You can't create post without attaching anything");
    }

    props.onAddPost({
      id: Math.random().toString(),
      username: 'Admin',
      userPic:
        'https://animesher.com/orig/1/117/1178/11781/animesher.com_shonen-hinata-shouyou-manga-1178122.jpg',
      caption: captionInputValue,
      location: locationInputValue,
      image: imageInputValue,
      feeling: feelingInputValue,
      time: `${new Date().getMinutes()} min ago`,
      likesCount: 0,
      commentCount: 0,
    });

    setCaptionInputValue('');
    setImageInputValue('');
    setLocationInputValue('');
    setFeelingInputValue('');
  };
  return (
    <Modal
      header="Create Post"
      footer={
        <Fragment>
          <Button onClick={props.onClose} danger>
            Close
          </Button>
          <Button type="submit" inverse>
            Create
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
              onClick={captionCloseButton.bind(null, setCaptionInputValue, '')}
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
              type="text"
              placeholder="Pick an Image"
              ref={imageRef}
              onChange={imageChangeHandler}
              value={imageInputValue}
            />
            <button
              onClick={photoCloseButton.bind(null, setImageInputValue, '')}
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
              onClick={feelingCloseButton.bind(null, setFeelingInputValue, '')}
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
              imageRef.current.focus();
            })}
          >
            <PermMediaIcon style={{ color: 'green' }} />
            <span style={{ color: 'green' }}>Photo or Video</span>
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
  );
};

export default NewPost;
