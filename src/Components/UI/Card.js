import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div
      className={`${classes.card} ${props.className ? props.className : ''}`}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
};

export default Card;
