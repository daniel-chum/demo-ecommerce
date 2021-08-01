import { allProductApi, productApi } from "./uri";
const axios = require("axios");

const getProductList = async (page) => {
  return axios({
    method: "get",
    url: `${productApi}`,
    params: { page: page }

  });
};

const getProduct = async (id) => {
  return axios({
    method: "get",
    url: `${productApi}/${id}`,
  });
};

export { getProductList, getProduct }
