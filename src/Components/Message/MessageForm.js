import React from 'react';

import classes from './MessageForm.module.css';
import Button from '../UI/Button';
import Input from '../UI/Input/Input';
import useChange from '../../hooks/useChange';
import useHttp from '../../hooks/useHttp';
import ErrorModal from '../UI/ErrorModal/ErrorModal';

const MessageForm = (props) => {
  const {
    value: msgValue,
    valueChangeHandler: msgChangeHandler,
    setValue: setMsgValue,
  } = useChange();

  const {
    isLoading,
    error,
    sendRequest: sendMessageFormRequest,
    clearError,
  } = useHttp();

  const messageFormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await sendMessageFormRequest(
        `${process.env.REACT_APP_BACKEND_URL}/messages`,
        'POST',
        JSON.stringify({
          creatorId: props.userData.id,
          message: msgValue,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        }
      );

      props.onAddMessage({
        ...data.message,
      });
    } catch (Err) {}

    setMsgValue('');
  };

  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <form onSubmit={messageFormSubmitHandler}>
        <Input
          textarea
          placeholder={`Write a message, ${props.userData.name}`}
          rows="5"
          onChange={msgChangeHandler}
          value={msgValue}
          msg
        />
        <div className={classes['message-form__actions']}>
          <Button type="submit">
            {isLoading ? 'Sending' : 'Send Message'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default MessageForm;
