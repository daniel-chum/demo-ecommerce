import React, { useState, useEffect, useContext } from "react";
import { fetchToken, fetchNewToken, logOut } from "../../api/auth";
import getUser from "../../api/user";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [accessTokenExpiry, setAccessTokenExpiry] = useState(null);

  useEffect(() => {
    initAuth();
  }, []);

  const accessTokenIsValid = () => {
    if (accessToken === "") {
      return false;
    }
    const expiryDateFromToken = new Date(accessTokenExpiry); //From epoch to date format
    console.log(`Checking token expiry: ${expiryDateFromToken}`);
    return expiryDateFromToken.getTime() > Date.now();
  };

  const setNotAuthenticated = () => {
    setIsAuthenticated(false);
    setLoading(false);
    setUser({});
  };

  const handleNewToken = (data) => {
    setAccessToken(data.access);
    const expiryInt = data.access_expires * 1000; // seconds to milliseconds
    setAccessTokenExpiry(expiryInt);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const refreshToken = async () => {
    setLoading(true);
    try {
      const resp = await fetchNewToken();
      const tokenData = await resp.data;
      handleNewToken(tokenData);
      if (user === null) {
        console.log("No user loaded so loading from refreshed token");
        await initUser(tokenData.access);
      }
      return tokenData.access;
    } catch (e) {
      console.log("User must be logged in succesfully.");
      setNotAuthenticated();
      return;
    }
  };

  const initAuth = async () => {
    setLoading(true);
    if (!accessTokenIsValid()) {
      console.log("Invalid access token. Refetching..");
      await refreshToken();
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  const initUser = async (token) => {
    const resp = await getUser(token);
    const user = await resp.json();
    setUser(user);
  };

  const getToken = async () => {
    // Returns an access token if there's one or refetches a new one
    console.log("Getting access token..");
    if (accessTokenIsValid()) {
      console.log("Existing token still valid");
      return Promise.resolve(accessToken);
    } else if (loading) {
      while (loading) {
        setInterval(
          () => console.log("Waiting for token to be refreshed"),
          3000
        );
      }
      // Assume this means the token is in the middle of refreshing
      return Promise.resolve(accessToken);
    } else {
      console.log("Getting a new token");
      const token = await refreshToken();
      return token;
    }
  };

  const login = async (username, password) => {
    const resp = await fetchToken(username, password);
    if (resp.statusText === "OK") {
      const tokenData = await resp.data;
      handleNewToken(tokenData);
      try {
        await initUser(tokenData.access);
      } catch (e) {
        console.log("Cannot get user information.");
      }
    } else {
      setIsAuthenticated(false);
      setLoading(true);
      // Let the page handle the error
    }
    return resp;
  };

  const logout = async () => {
    setAccessToken("");
    setAccessTokenExpiry(null);
    setNotAuthenticated();
    await logOut();
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
