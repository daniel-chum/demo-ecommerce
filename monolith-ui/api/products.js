import { allProductApi, productApi } from "./uri";
const axios = require("axios");

const getAllProducts = async () => {
  return axios({
    method: "get",
    url: allProductApi,
  });
};

const getProduct = async (id) => {
  return axios({
    method: "get",
    url: `${productApi}/${id}`,
  });
};

export { getAllProducts, getProduct }
