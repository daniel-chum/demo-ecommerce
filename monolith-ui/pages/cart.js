import CartGrid from "../components/Cart/CartGrid";
import {  deleteCart, partialUpdateCart } from "../api/cart";
import {  useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";

export default function Cart() {

  const router = useRouter();
  const { cart, setCart, isAuthenticated, getToken } = useAuth();

  useEffect(() => {
    const getRes = async () => {
      const resp = await getToken()

      if (!resp) {
        router.push("/");
        return;
      }
    }

    getRes()
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
      {isAuthenticated && (
        <>
          <h2>Shopping Cart</h2>
          <CartGrid
            cartList={cart}
            handleDeleteButton={handleDeleteButton}
            handleQuantityButton={handleQuantityButton}
          />
        </>
      )}
    </>
  );
}
