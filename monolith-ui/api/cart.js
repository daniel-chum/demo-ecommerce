import { cartApi } from "./uri";
const axios = require("axios");

const getCart = async (getToken) => {
  return axios({
    method: "get",
    url: cartApi,
    headers: {
      authorization: `Bearer ${await getToken()}`,
    },
  });
};

const addCart = async (getToken, body) => {
  return axios({
    method: "post",
    url: cartApi,
    data: body,
    headers: {
      authorization: `Bearer ${await getToken()}`,
    },
  });
};

const partialUpdateCart = async (getToken, cartId, body) => {
  return axios({
    method: "patch",
    url: `${cartApi}/${cartId}`,
    data: body,
    headers: {
      authorization: `Bearer ${await getToken()}`,
    },
  });
};
const deleteCart = async (getToken, cartId) => {
  return axios({
    method: "delete",
    url: `${cartApi}/${cartId}`,
    headers: {
      authorization: `Bearer ${await getToken()}`,
    },
  });
};

export { getCart, addCart, deleteCart, partialUpdateCart };
