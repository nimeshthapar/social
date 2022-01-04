import { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';

import BackDrop from '../../UI/BackDrop/BackDrop';
import classes from './SideNav.module.css';
import { AuthContext } from '../../../store/auth-context';
import NavLinks from './NavLinks';

const Overlay = (props) => {
  const authCtx = useContext(AuthContext);

  const content = (
    <>
      <aside className={classes['side-drawer']} onClick={props.onClose}>
        <ul className={classes['side-drawer__items']}>
          <NavLinks
            id={authCtx.userData.id}
            image={authCtx.userData.image}
            logout={authCtx.logout}
            side
          />
        </ul>
      </aside>
    </>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('overlays-root')
  );
};

const SideNav = (props) => {
  return (
    <Fragment>
      <BackDrop onClose={props.onClose} />
      <Overlay {...props}>{props.children}</Overlay>
    </Fragment>
  );
};

export default SideNav;
