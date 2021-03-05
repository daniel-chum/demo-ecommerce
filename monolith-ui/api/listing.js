import { listingApi } from "./uri";
const axios = require("axios");

const getListing = async (getToken) => {
  return axios({
    method: "get",
    url: listingApi,
    headers: {
      authorization: `Bearer ${await getToken()}`,
    },
  });
};

const addListing = async (getToken, body) => {
  return axios({
    method: "post",
    url: listingApi,
    data: body,
    headers: {
      authorization: `Bearer ${await getToken()}`,
      "content-type": "multipart/form-data",
    },
  });
};

export { getListing, addListing };
