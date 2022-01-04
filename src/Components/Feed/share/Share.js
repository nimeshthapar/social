import React, { Fragment, useContext, useRef, useState } from 'react';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import classes from './Share.module.css';
import NewPost from '../NewPost/NewPost';
import useFocusNamedInputButton from '../../../hooks/FocusNamedInputButton';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import { AuthContext } from '../../../store/auth-context';

const Share = (props) => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showErrorPromptModal, setErrorPromptModal] = useState(false);

  const authCtx = useContext(AuthContext);

  const {
    buttonIsClicked: photoIsClicked,
    openNewPostBtnHandler: openNewPostPhotoBtnHandler,
    resetButtonClicked: photoClickReset,
  } = useFocusNamedInputButton();
  const {
    buttonIsClicked: shareIsClicked,
    openNewPostBtnHandler: openNewPostShareBtnHandler,
    resetButtonClicked: shareClickReset,
  } = useFocusNamedInputButton();
  const {
    buttonIsClicked: locationIsClicked,
    openNewPostBtnHandler: openNewPostLocationBtnHandler,
    resetButtonClicked: locationClickReset,
  } = useFocusNamedInputButton();
  const {
    buttonIsClicked: feelingIsClicked,
    openNewPostBtnHandler: openNewPostFeelingBtnHandler,
    resetButtonClicked: feelingClickReset,
  } = useFocusNamedInputButton();

  const captionRef = useRef();

  const closeNewPostHandler = () => {
    setShowCreatePostModal(false);
    setErrorPromptModal(false);
    photoClickReset();
    locationClickReset();
    feelingClickReset();
    shareClickReset();
  };

  const openErrorPromptModal = () => {
    setErrorPromptModal(true);
  };

  const closeErrorPromptModal = () => {
    setErrorPromptModal(false);
  };

  const createModalCloseHanler = () => {
    setShowCreatePostModal(false);
  };

  const submitCaptionHandler = (e) => {
    e.preventDefault();

    openNewPostShareBtnHandler(setShowCreatePostModal, true);
  };

  return (
    <Fragment>
      {showErrorPromptModal && (
        <ErrorModal
          onConfirm={closeNewPostHandler}
          onClose={closeErrorPromptModal}
          text={"All input you enter will delete and cant't be restored"}
          overlay
        />
      )}
      {showCreatePostModal && (
        <NewPost
          onAddPost={props.onAdd}
          onClose={openErrorPromptModal}
          caption={captionRef.current.value}
          photoIsClick={photoIsClicked}
          locationIsClick={locationIsClicked}
          feelingIsClick={feelingIsClicked}
          shareIsClick={shareIsClicked}
          closeModal={createModalCloseHanler}
          id={authCtx.userData.id}
          token={authCtx.token}
        />
      )}
      <Card>
        <div className={classes['share-container']}>
          <div className={classes['img-container']}>
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${authCtx.userData.image}`}
              alt={authCtx.userData.name}
            />
          </div>
          <form onSubmit={submitCaptionHandler}>
            <div className={classes['input-container']}>
              <textarea
                rows="3"
                placeholder={`What's on your mind, ${authCtx.userData.name}?`}
                ref={captionRef}
              />
            </div>
            <div className={classes['share-actions']}>
              <button
                type="button"
                className={classes['share-actions__action']}
                onClick={openNewPostPhotoBtnHandler.bind(
                  null,
                  setShowCreatePostModal,
                  true
                )}
              >
                <PermMediaIcon style={{ color: 'green' }} />
                <span style={{ color: 'green' }}>Photo</span>
              </button>
              <button
                type="button"
                className={classes['share-actions__action']}
                onClick={openNewPostLocationBtnHandler.bind(
                  null,
                  setShowCreatePostModal,
                  true
                )}
              >
                <RoomIcon />
                <span>Location</span>
              </button>
              <button
                type="button"
                className={classes['share-actions__action']}
                onClick={openNewPostFeelingBtnHandler.bind(
                  null,
                  setShowCreatePostModal,
                  true
                )}
              >
                <EmojiEmotionsIcon style={{ color: 'darkgoldenrod' }} />
                <span style={{ color: 'darkgoldenrod' }}>Feeling</span>
              </button>
              <Button className={classes['ui-button']} type={'submit'}>
                <SendIcon />
                <span>Share</span>
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Fragment>
  );
};

export default Share;
