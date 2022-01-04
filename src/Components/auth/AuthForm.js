import React, { useContext, useState } from 'react';

import classes from './AuthForm.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { AuthContext } from '../../store/auth-context';
import Input from '../UI/Input/Input';
import useHttp from '../../hooks/useHttp';
import useChange from '../../hooks/useChange';
import ErrorModal from '../UI/ErrorModal/ErrorModal';
import ImageUpload from '../UI/ImageUpload/ImageUpload';

const AuthForm = () => {
  const [switchSignUpMode, setSwitchSignUpMode] = useState(true);
  // const [isActive, setIsActive] = useState(true);
  const [imageValue, setImageValue] = useState(null);

  const authCtx = useContext(AuthContext);

  const {
    isLoading,
    error,
    sendRequest: sendAuthRequest,
    clearError,
  } = useHttp();

  const { value: emailValue, valueChangeHandler: emailChangeHandler } =
    useChange();
  const { value: passwordValue, valueChangeHandler: passwordChangeHandler } =
    useChange();
  const { value: nameValue, valueChangeHandler: nameChangeHandler } =
    useChange();
  const { value: schoolValue, valueChangeHandler: schoolChangeHandler } =
    useChange();
  const { value: collegeValue, valueChangeHandler: collegeChangeHandler } =
    useChange();
  const {
    value: occupationValue,
    valueChangeHandler: occupationChangeHandler,
  } = useChange();
  const { value: atValue, valueChangeHandler: atChangeHandler } = useChange();
  const { value: bioValue, valueChangeHandler: bioChangeHandler } = useChange();
  const {
    value: relationshipValue,
    valueChangeHandler: relationshipChangeHandler,
  } = useChange();

  const switchModeHandler = () => {
    setSwitchSignUpMode((prev) => !prev);
  };

  const addFileHandler = (file) => {
    console.log(file);
    setImageValue(file);
  };

  const submitAuthFormHandler = async (e) => {
    e.preventDefault();

    try {
      if (switchSignUpMode) {
        const data = await sendAuthRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
          { 'Content-Type': 'application/json' }
        );

        authCtx.login(
          {
            ...data.userData,
          },
          data.token
        );
      } else {
        const signUpFormData = new FormData();

        signUpFormData.append('email', emailValue);
        signUpFormData.append('password', passwordValue);
        signUpFormData.append('name', nameValue ? nameValue : undefined);
        signUpFormData.append('school', schoolValue ? schoolValue : undefined);
        signUpFormData.append('image', imageValue ? imageValue : undefined);
        signUpFormData.append(
          'college',
          collegeValue ? collegeValue : undefined
        );
        signUpFormData.append(
          'occupation',
          occupationValue ? occupationValue : undefined
        );
        signUpFormData.append('at', atValue ? atValue : undefined);
        signUpFormData.append('bio', bioValue ? bioValue : undefined);
        signUpFormData.append(
          'relationship',
          relationshipValue ? relationshipValue : undefined
        );

        const data = await sendAuthRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          signUpFormData
        );
        authCtx.login({ ...data.userData });
      }
    } catch (err) {}
  };

  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      <div className={classes['form-container']}>
        <Card>
          <h1>{switchSignUpMode ? 'Login' : 'Signup'}</h1>
          <form onSubmit={submitAuthFormHandler}>
            <Input
              for="Email"
              label="E-mail"
              type="email"
              value={emailValue}
              onChange={emailChangeHandler}
            />
            <Input
              for="Password"
              label="Password"
              type="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
            />
            {!switchSignUpMode && (
              <Input
                for="name"
                label="Name"
                value={nameValue}
                onChange={nameChangeHandler}
              />
            )}
            {!switchSignUpMode && (
              // <Input
              //   for="image"
              //   label="Image"
              //   value={imageValue}
              //   onChange={imageChangeHandler}
              // />
              <div className={classes.center}>
                <ImageUpload center id={'image'} onAdd={addFileHandler} />
              </div>
            )}
            {!switchSignUpMode && (
              <Input
                for="bio"
                label="Bio"
                value={bioValue}
                onChange={bioChangeHandler}
              />
            )}
            {!switchSignUpMode && (
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
            )}
            {!switchSignUpMode && (
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
            )}
            {!switchSignUpMode && (
              <Input
                for="relationship"
                label="Relationship"
                value={relationshipValue}
                onChange={relationshipChangeHandler}
              />
            )}
            <div className={classes['form-actions']}>
              <Button type="submit">
                {isLoading
                  ? 'Loading...'
                  : switchSignUpMode
                  ? 'Login'
                  : 'Signup'}
              </Button>
              <p onClick={switchModeHandler}>
                {switchSignUpMode
                  ? "Don't have account no problem click to signup"
                  : 'Already having account click to login'}
              </p>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AuthForm;
