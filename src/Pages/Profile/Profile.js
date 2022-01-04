import React, { useContext, useEffect, useState } from 'react';

import ProfileList from '../../Components/profile/Profile';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../Components/UI/ErrorModal/ErrorModal';
import useHttp from '../../hooks/useHttp';
import LoadingSpinner from '../../Components/UI/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../store/auth-context';

const Profile = () => {
  const { pid } = useParams();

  const [profile, setProfile] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);

  const authCtx = useContext(AuthContext);

  const { token } = authCtx;

  const {
    isLoading,
    error,
    sendRequest: sendProfileRequest,
    clearError,
  } = useHttp();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await sendProfileRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${pid}`,
          'GET',
          null,
          { Authorization: `Bearer ${token}` }
        );

        setProfile(data.user);
        setProfilePosts([...data.posts]);
      } catch (err) {}
    };

    fetchUser();
  }, [pid, sendProfileRequest, token]);

  const updateUser = () => {
    const fetchUser = async () => {
      try {
        const data = await sendProfileRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${pid}`,
          'GET',
          null,
          { Authorization: `Bearer ${token}` }
        );

        setProfile(data.user);
        setProfilePosts([...data.posts]);
      } catch (err) {}
    };

    fetchUser();
  };

  return (
    <>
      {error && (
        <ErrorModal onClose={clearError} text={error} onlyBack overlay />
      )}
      {isLoading && <LoadingSpinner center />}
      {profile && (
        <ProfileList
          profile={profile}
          profilePosts={profilePosts}
          onUpdate={updateUser}
          onAdd={updateUser}
          token={token}
          id={authCtx.userData.id}
        />
      )}
    </>
  );
};

export default Profile;
