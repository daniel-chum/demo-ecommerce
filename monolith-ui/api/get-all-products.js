import { homePageProductListApi } from "./uri";
const axios = require("axios");

const getAllProducts = async () => {
  return axios({
    method: "get",
    url: homePageProductListApi,
  });
};

export default getAllProducts;
