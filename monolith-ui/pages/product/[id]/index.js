import { productApi, orderApi } from "../../../lib/api";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../../auth";

const getProductItem = async (getToken, id) => {
  return axios({
    method: "get",
    url: `${productApi}/${id}`,
    headers: {
      authorization: `Bearer ${await getToken()}`,
    },
  });
};

const createOrder = async (getToken, body) => {
  return axios({
    method: "post",
    url: orderApi,
    data: body,
    headers: {
      authorization: `Bearer ${await getToken()}`,
    },
  });
};

const ProductItem = () => {
  const [productItem, setProductItem] = useState({});
  const router = useRouter();
  const { loading, getToken, isAuthenticated } = useAuth();

  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getProductItem(getToken, id);
        await setProductItem(resp.data);
        console.log(productItem);
      } catch (e) {
        console.log("User must be logged in to view product page.");
      }
    };

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchData();
  }, []);

  const handleOrderClick = () => {
    const body = {
      product: [id],
    };

    try {
      createOrder(getToken, body).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.log("Error occurred while trying to add order.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3>{productItem.title}</h3>
        <p>{productItem.price}</p>
        <button onClick={() => handleOrderClick()}>Order</button>
      </div>
    );
  }
};

export default ProductItem;
