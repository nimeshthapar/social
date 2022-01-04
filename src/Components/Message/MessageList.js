import React, { useEffect, useRef } from 'react';

import classes from './MessageList.module.css';
import MessageItem from './MessageItem';
import Button from '../UI/Button';

const MessageList = (props) => {
  const msgEndRef = useRef();

  const { messages } = props;

  useEffect(() => {
    if (messages) {
      msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <ul className={classes['message-list__items']}>
      {props.messages.length > 0 && props.totalPages !== props.page && (
        <div className={classes.center}>
          <Button
            inverse
            onClick={() => {
              props.onPrev();
            }}
          >
            Prev
          </Button>
        </div>
      )}

      {props.messages.length > 0 &&
        props.messages.map((m) => {
          return (
            <MessageItem
              key={m.id}
              id={m.id}
              message={m.message}
              name={m.creatorId.name}
              username={props.username}
            />
          );
        })}

      {props.messages.length === 0 && (
        <h1 className={classes['message-error__text']}>No Messages Found</h1>
      )}
      {props.messages.length > 0 && props.page > 1 && (
        <div className={classes.center}>
          <Button
            inverse
            onClick={() => {
              props.onNext();
            }}
          >
            Next
          </Button>
        </div>
      )}

      <div ref={msgEndRef}></div>
    </ul>
  );
};

export default MessageList;
