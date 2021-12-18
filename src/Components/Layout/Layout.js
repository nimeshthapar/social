import { Fragment, useState } from 'react';

import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import TopNavigation from './TopNavigation/TopNavigation';
import classes from './Layout.module.css';

const Layout = (props) => {
  const [data, setData] = useState({});
  const sendToLeftBarHandler = (FrndData) => {
    setData(FrndData);
  };
  return (
    <Fragment>
      <TopNavigation />
      <div className={classes.layout}>
        <LeftSideBar data={data} />
        <div className={classes.centerbox}>{props.children}</div>
        <RightSideBar onAdd={sendToLeftBarHandler} />
      </div>
    </Fragment>
  );
};

export default Layout;
