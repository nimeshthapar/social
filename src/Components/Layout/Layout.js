import { Fragment, useCallback, useContext, useState } from 'react';

import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import TopNavigation from './TopNavigation/TopNavigation';
import classes from './Layout.module.css';
import { AuthContext } from '../../store/auth-context';

const Layout = (props) => {
  const [refresh, setRefresh] = useState(false);
  const sendToLeftBarHandler = (FrndData) => {
    setRefresh(true);
  };

  const stopRefreshHandler = useCallback(() => {
    setRefresh(false);
  }, []);

  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <TopNavigation />
      <div className={classes.layout}>
        {authCtx.isLoggedIn && authCtx.token && (
          <LeftSideBar refresh={refresh} stopRefresh={stopRefreshHandler} />
        )}
        <div className={classes.centerbox}>{props.children}</div>
        {authCtx.isLoggedIn && authCtx.token && (
          <RightSideBar refreshContact={sendToLeftBarHandler} />
        )}
      </div>
    </Fragment>
  );
};

export default Layout;
