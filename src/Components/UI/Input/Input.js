import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  let input = (
    <>
      <label htmlFor={props.for}>{props.label}</label>
      <input
        type={props.type || 'text'}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </>
  );

  if (props.textarea) {
    input = (
      <>
        <label htmlFor={props.for}>{props.label}</label>
        <textarea
          type={props.type || 'text'}
          rows={props.rows || 3}
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
        />
      </>
    );
  }

  if (props.dual) {
    input = (
      <>
        <div className={classes['input-container__dual-div']}>
          <label htmlFor={props.forOne}>{props.labelOne}</label>
          <input
            type={props.typeOne || 'text'}
            onChange={props.onChangeOne}
            value={props.valueOne}
            placeholder={props.placeholder}
          />
        </div>
        <div className={classes['input-container__dual-div']}>
          <label htmlFor={props.forTwo}>{props.labelTwo}</label>
          <input
            type={props.typeTwo || 'text'}
            onChange={props.onChangeTwo}
            value={props.valueTwo}
            placeholder={props.placeholder}
          />
        </div>
      </>
    );
  }

  return (
    <div
      className={
        props.dual
          ? classes['input-container__dual']
          : `${classes['input-container']} ${props.msg && classes.msg}`
      }
    >
      {input}
    </div>
  );
};

export default Input;
