import CartGrid from "../components/Cart/CartGrid";
import CheckOut from "../components/Cart/CheckOut";
import { deleteCart, partialUpdateCart } from "../api/cart";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/auth";

export default function Cart() {

  const router = useRouter();
  const { cart, setCart, isAuthenticated, getToken } = useAuth();

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
      console.log(e.response.data);
    }
  };

  return (
    <div className='mx-28'>
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
            className='flex-grow h-full ml-8 px-6'
            cartList={cart}
            handleDeleteButton={handleDeleteButton}
            handleQuantityButton={handleQuantityButton}
          />
        </div>
      )}
    </div>
  );
}
