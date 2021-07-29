import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import { fetchToken, fetchNewToken, register, logOut } from "../../api/auth";
import getUser from "../../api/user";
import { getCart } from "../../api/cart";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [accessTokenExpiry, setAccessTokenExpiry] = useState(null);

  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
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

    initAuth();
  }, []);

  // Call cart api on login
  useEffect(() => {

    if (isAuthenticated === false) { return }

    const getUserCart = async () => {
      try {
        const response = await getCart(getToken);
        const productArray = response.data;
        setCart(productArray);
      } catch (e) {
        console.log(e.message)
      }
    };

    getUserCart();

  }, [isAuthenticated]);

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

  const refreshToken = async () => {
    setLoading(true);
    try {
      const resp = await fetchNewToken();
      const tokenData = await resp.data;
      await handleNewToken(tokenData);
      if (Object.keys(user).length === 0) {
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

  const accessTokenIsValid = () => {
    if (accessToken === "") {
      return false;
    }
    const expiryDateFromToken = new Date(accessTokenExpiry); //From epoch to date format
    console.log(`Checking token expiry: ${expiryDateFromToken}`);
    return expiryDateFromToken.getTime() > Date.now();
  };

  const handleNewToken = async (data) => {
    setAccessToken(data.access);
    const expiryInt = data.access_expires * 1000; // seconds to milliseconds
    setAccessTokenExpiry(expiryInt);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const initUser = async (token) => {
    try {
      const resp = await getUser(token);
      const user = await resp.data;
      setUser(user);
    } catch (e) { console.log(e.response.data) }
  };

  const logIn = async (username, password) => {
    const resp = await fetchToken(username, password);

    if (resp.statusText === "OK") {
      const tokenData = await resp.data;
      handleNewToken(tokenData);
      try {
        await initUser(tokenData.access);
      } catch (e) {
        console.log(e)
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
    await logOut();
    Router.push("/");
    setAccessToken("");
    setAccessTokenExpiry(null);
    setNotAuthenticated();

  };

  const signUp = async (body) => {
    const resp = await register(body)

    if (resp.statusText === "Created") {
      try {
        await logIn(body.username, body.password)
      } catch (e) { console.log(e) }
    }
  }

  const setNotAuthenticated = () => {
    setIsAuthenticated(false);
    setLoading(false);
    setCart([]);
    setUser({});
  };

  const value = {
    user,
    loading,
    cart,
    isAuthenticated,
    logIn,
    logout,
    signUp,
    getToken,
    setCart
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
