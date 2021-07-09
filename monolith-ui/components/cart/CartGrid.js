import Image from "next/image";
import cn from "classnames";
import { useState } from "react";

const CartGrid = ({ cartList, handleDeleteButton, handleQuantityButton }) => {
  const placeholderImg = "/product-img-placeholder.svg";

  const headerStyle = 'border-t-2 border-b-2 h-12 flex items-center'

  return (
    <div className="grid grid-cols-5 m-auto w-5/6">
      <span className={cn(headerStyle, "col-span-2 h-12  justify-left")}>
        PRODUCT DETAILS
      </span>
      <span className={cn(headerStyle,"justify-center")}>
       QUANTITY
      </span>
      <span className={cn(headerStyle,"justify-center")}>
        PRICE
      </span>
      <span className={cn(headerStyle,"justify-center")}>
        TOTAL
      </span>
      {cartList.map((cart) => {
        const product = cart.product;

        return (
          <>
            <Image
                quality="85"
                src={product.images[0].image || placeholderImg}
                alt={product.title || "Product Image"}
                width={140}
                height={100}
            />
            <div className='flex flex-col'>
              <span>{product.title}</span>
              <button className='text-left' onClick={() => {handleDeleteButton(cart.id)} }>Remove</button>
            </div>
            <div>
              <button className='focus:outline-none' onClick={() => { handleQuantityButton(cart.id, cart.quantity - 1) }}>-</button>
                <span className="h-16 pt-2 pl-2 pr-2">{cart.quantity}</span>
              <button className='focus:outline-none' onClick={() => { handleQuantityButton(cart.id, cart.quantity + 1) }}>+</button>
            </div>
            <span className="h-16 pt-2 pl-2 pr-2">{product.price}</span>
            <span>{product.price * cart.quantity}</span>
          </>
        )}
      )}
    </div>
  );
};

export default CartGrid;
