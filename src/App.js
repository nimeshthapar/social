import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Auth from './Pages/Auth/Auth';
import Feed from './Pages/Feed/Feed';
import Message from './Pages/Message/Message';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <Fragment>
      <Layout>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile/:pid" element={<Profile />} />
          <Route path="/messages" element={<Message />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
