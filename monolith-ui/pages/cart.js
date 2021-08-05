import { useState } from 'react';
import CartGrid from "../components/cart/CartGrid";
import CheckOut from "../components/cart/CheckOut";
import { deleteCart, partialUpdateCart } from "../api/cart";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";
import { PopUp } from "../components/ui";

export default function Cart() {

  const router = useRouter();
  const { cart, setCart, isAuthenticated, getToken } = useAuth();

  const [loading, setLoading] = useState(false)
  const [itemDeletedAnimation, setItemDeletedAnimation] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const resp = await getToken()

      if (!resp) {
        router.push("/");
        return;
      }
    }
    checkAuthentication()
  }, []);

  const handleDeleteButton = async (cartId) => {
    setLoading(true)
    try {
      let res = await deleteCart(getToken, cartId);
      setCart(cart.filter((cart) => cart.id !== cartId));
      setItemDeletedAnimation(true)
    } catch (e) {
      console.log(e);
    } finally { setLoading(false) }
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
      console.log(e.response.data);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setItemDeletedAnimation(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [itemDeletedAnimation]);

  return (
    <div className='mx-28 3xl:mx-60'  style={{ minHeight: '80vh' }}>
      <h1 className='pt-10 font-rubik font-bold text-2xl text-center'>Cart</h1>
      {isAuthenticated && (
        <div className='flex mt-10'>
          <CartGrid
            className='w-9/12'
            cartList={cart}
            handleDeleteButton={handleDeleteButton}
            handleQuantityButton={handleQuantityButton}
          />
          <CheckOut
            className='flex-grow h-full ml-8 px-6 bg-background'
            cartList={cart}
            handleDeleteButton={handleDeleteButton}
            handleQuantityButton={handleQuantityButton}
          />
        </div>
      )}
      <PopUp display={itemDeletedAnimation}>Item deleleted!</PopUp>
      <PopUp display={loading} loader={true}>
        <span className='animate-pulse'>LOADING ...</span>
      </PopUp>
    </div>
  );
}
