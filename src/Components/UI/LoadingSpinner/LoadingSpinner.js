import React from 'react';

import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  return (
    <div className={props.center && classes.center}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default LoadingSpinner;
