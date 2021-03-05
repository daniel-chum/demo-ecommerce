import { userApi } from "./uri";
const axios = require("axios");

const getUser = async (token) => {
  return axios({
    method: "get",
    url: userApi,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export default getUser;
