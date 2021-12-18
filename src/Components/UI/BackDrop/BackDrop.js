import ReactDOM from 'react-dom';
import classes from './BackDrop.module.css';

const BackDrop = (props) => {
  const backdropElement = (
    <div
      className={`${props.asOverlay ? classes.overlay : classes.backdrop}`}
      onClick={props.onClose}
    ></div>
  );
  return ReactDOM.createPortal(
    backdropElement,
    document.getElementById('backdrop-root')
  );
};

export default BackDrop;
