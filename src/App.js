import { Fragment, useContext, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import LoadingSpinner from './Components/UI/LoadingSpinner/LoadingSpinner';
import { AuthContext } from './store/auth-context';

const Auth = lazy(() => import('./Pages/Auth/Auth'));
const Feed = lazy(() => import('./Pages/Feed/Feed'));
const Message = lazy(() => import('./Pages/Message/Message'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));

function App() {
  const authCtx = useContext(AuthContext);

  let routes;

  if (authCtx.isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:pid" element={<Profile />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={<Navigate replace to="/auth" />} />
      </Routes>
    );
  }

  return (
    <Fragment>
      <Layout>
        <Suspense fallback={<LoadingSpinner center />}>{routes}</Suspense>
      </Layout>
    </Fragment>
  );
}

export default App;
