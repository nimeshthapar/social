import React, { useCallback, useEffect, useState } from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: null,
  userData: {},
  token: null,
  login: () => {},
  logout: () => {},
});

let logoutTimer;
const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpTime, setTokenExpTime] = useState(null);

  const login = useCallback((data, token, expirationTime) => {
    setUserData({ ...data });
    setToken(token);

    const tokenExpirationTime =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpTime(tokenExpirationTime);
    setIsLoggedIn(true);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        token,
        userData: data,
        expiration: tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserData({});
    setToken(null);
    setTokenExpTime(null);

    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpTime) {
      const remainingTime = tokenExpTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpTime, logout]);

  useEffect(() => {
    const retrieveData = JSON.parse(localStorage.getItem('userData'));

    if (
      retrieveData &&
      retrieveData.token &&
      new Date(retrieveData.expiration) > new Date()
    ) {
      login(
        retrieveData.userData,
        retrieveData.token,
        new Date(retrieveData.expiration)
      );
    }
  }, [login]);

  const value = { isLoggedIn: isLoggedIn, login, logout, userData, token };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
