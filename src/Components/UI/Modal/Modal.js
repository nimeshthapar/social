import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import BackDrop from '../BackDrop/BackDrop';
import classes from './Modal.module.css';

const ModalOverlay = (props) => {
  const content = (
    <div className={`${classes.modal} ${props.overlay && classes.overlay}`}>
      <div className={classes['modal-content']}>
        <header className={`${classes.header} ${props.headerClass}`}>
          <h3>{props.header}</h3>
        </header>
        <form
          onSubmit={
            props.onSubmit
              ? props.onSubmit
              : (e) => {
                  e.preventDefault();
                }
          }
        >
          <div className={`${classes.content} ${props.mainClass}`}>
            {props.children}
          </div>
          <footer className={`${classes.footer} ${props.footerClass}`}>
            {props.footer}
          </footer>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('overlays-root')
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      <BackDrop onClose={props.onClose} asOverlay={props.overlay} />
      <ModalOverlay {...props}>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
