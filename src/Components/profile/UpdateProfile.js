import React, { Fragment } from 'react';

import classes from './UpdateProfile.module.css';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input/Input';
import useChange from '../../hooks/useChange';
import ErrorModal from '../UI/ErrorModal/ErrorModal';
import useHttp from '../../hooks/useHttp';

const UpdateProfile = (props) => {
  const { value: bioValue, valueChangeHandler: bioChangeHandler } = useChange(
    props.profile.bio
  );

  const {
    value: relationshipValue,
    valueChangeHandler: relationshipChangeHandler,
  } = useChange(props.profile.relationship);

  const { value: atValue, valueChangeHandler: atChangeHandler } = useChange(
    props.profile.at
  );

  const {
    value: occupationValue,
    valueChangeHandler: occupationChangeHandler,
  } = useChange(props.profile.occupation);

  const { value: schoolValue, valueChangeHandler: schoolChangeHandler } =
    useChange(props.profile.school);

  const { value: collegeValue, valueChangeHandler: collegeChangeHandler } =
    useChange(props.profile.college);

  const {
    isLoading,
    error,
    sendRequest: sendUpdateProfileRequest,
    clearError,
  } = useHttp();

  const submitProfileHandler = async (e) => {
    e.preventDefault();

    try {
      await sendUpdateProfileRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${props.id}`,
        'PATCH',
        JSON.stringify({
          school: schoolValue,
          college: collegeValue,
          at: atValue,
          occupation: occupationValue,
          bio: bioValue,
          relationship: relationshipValue,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        }
      );
    } catch (err) {}

    props.onUpdate();
    props.onClose();
  };

  return (
    <Modal
      header="Update Profile"
      footer={
        <Fragment>
          <Button onClick={props.onClose} danger>
            Close
          </Button>
          <Button type="submit" inverse>
            {isLoading ? 'Updating....' : 'Update'}
          </Button>
        </Fragment>
      }
      footerClass={classes.footer}
      onClose={props.onClose}
      onSubmit={submitProfileHandler}
    >
      <>
        {error && (
          <ErrorModal onClose={clearError} text={error} onlyBack overlay />
        )}
        <Input
          for="bio"
          label="Bio"
          value={bioValue}
          onChange={bioChangeHandler}
        />
        <Input
          dual
          label="Education"
          forOne="school"
          labelOne="School"
          valueOne={schoolValue}
          onChangeOne={schoolChangeHandler}
          forTwo="college"
          labelTwo="College"
          valueTwo={collegeValue}
          onChangeTwo={collegeChangeHandler}
        />
        <Input
          dual
          label="Work"
          forOne="occupation"
          labelOne="Occupation"
          valueOne={occupationValue}
          onChangeOne={occupationChangeHandler}
          forTwo="at"
          labelTwo="At"
          valueTwo={atValue}
          onChangeTwo={atChangeHandler}
        />
        <Input
          for="relationship"
          label="Relationship"
          value={relationshipValue}
          onChange={relationshipChangeHandler}
        />
      </>
    </Modal>
  );
};

export default UpdateProfile;
