import CartGrid from "../components/Cart/CartGrid";
import { getCart, deleteCart, partialUpdateCart } from "../api/cart";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const { getToken, isAuthenticated } = useAuth();

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const response = await getCart(getToken);
        const productArray = response.data;

        setCart(productArray);
      } catch (e) {
        console.log(e);
        console.log("User must be logged in to view listing page.");
      }
    };

    if (!isAuthenticated) {
      router.push("/");
      return;
    }
    getUserCart();
  }, []);

  const handleDeleteButton = async (cartId) => {
    try {
      let res = await deleteCart(getToken, cartId);
      setCart(cart.filter((cart) => cart.id !== cartId));
    } catch (e) {
      console.log(e);
    }
  };

  const handleQuantityButton = async (cartId, quantity) => {
    let body = {
      'quantity': quantity
    }

    try {
      let res = await partialUpdateCart(getToken, cartId, body);
      let updatedItem = cart.find((cart) => cart.id == res.data.id)
      updatedItem.quantity = quantity

      setCart([...cart]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h2>Shopping Cart</h2>
      <CartGrid
        cartList={cart}
        handleDeleteButton={handleDeleteButton}
        handleQuantityButton={handleQuantityButton}
      />
    </>
  );
}
