import React, { Fragment } from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  const classname = `${props.link ? classes.link : classes.button} ${
    props.className
  } ${props.inverse ? classes.inverse : ''} ${
    props.danger ? classes.danger : ''
  }`;

  let button = (
    <button
      className={classname}
      style={{ width: props.width, height: props.height }}
      onClick={props.onClick}
      type={props.type || 'button'}
    >
      {props.children}
    </button>
  );
  if (props.link) {
    button = (
      <a className={classname} href={props.to}>
        {props.children}
      </a>
    );
  }

  return <Fragment>{button}</Fragment>;
};

export default Button;
