import { tokenApi, refreshTokenApi, registerApi, logOutApi } from "./uri";

const axios = require("axios");

const fetchToken = (username, password) => {
  return axios({
    method: "post",
    url: tokenApi,
    data: {
      username: username,
      password: password,
    },
  });
};

const fetchNewToken = () => {
  return axios({
    method: "post",
    url: refreshTokenApi,
  });
};

const register = (body) => {
  return axios({
    method: "post",
    url: registerApi,
    data: body
  });
};


const logOut = () => {
  return axios({
    method: "post",
    url: logOutApi,
  });
};

export { fetchToken, fetchNewToken, register, logOut };
