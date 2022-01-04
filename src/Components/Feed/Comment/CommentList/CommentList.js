import React, { useRef, useEffect } from 'react';

import classes from './CommentList.module.css';
import CommentItem from '../CommentItem/CommentItem';

const CommentList = (props) => {
  const cmntEndRef = useRef();

  const { comments } = props;

  useEffect(() => {
    if (comments) {
      cmntEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  return (
    <ul className={classes.comments}>
      {props.comments.length > 0 &&
        props.comments.map((c) => {
          return (
            <CommentItem
              key={c.id}
              id={c.id}
              username={c.name}
              userPic={c.image}
              comment={c.comment}
            />
          );
        })}
      {props.comments.length === 0 && (
        <h1 className={classes['comment__error-text']}>No Comments</h1>
      )}
      <div ref={cmntEndRef}></div>
    </ul>
  );
};

export default CommentList;
