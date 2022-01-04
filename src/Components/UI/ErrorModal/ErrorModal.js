import React, { Fragment } from 'react';

import classes from './ErrorModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../Button';

const ErrorModal = (props) => {
  return (
    <Modal
      header={props.onlyBack ? 'OOPSIE...😔' : 'Are you Sure?'}
      footer={
        <Fragment>
          <Button onClick={props.onClose} inverse>
            Back
          </Button>
          {props.onConfirm && (
            <Button onClick={props.onConfirm} danger>
              {props.isLoading ? 'Loading...' : 'Confirm'}
            </Button>
          )}
        </Fragment>
      }
      onClose={props.onClose}
      overlay={props.overlay}
    >
      <h4 className={classes['error-text']}>{props.text}</h4>
    </Modal>
  );
};

export default ErrorModal;
