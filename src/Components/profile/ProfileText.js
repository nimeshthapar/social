import React from 'react';

const ProfileText = (props) => {
  return (
    <p>
      <b>
        <u>{props.label}</u>
      </b>{' '}
      <span>{props.text}</span>
    </p>
  );
};

export default ProfileText;
