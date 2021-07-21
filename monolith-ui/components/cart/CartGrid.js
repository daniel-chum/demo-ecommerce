import Image from "next/image";
import cn from "classnames";

const CartGrid = ({ cartList, handleDeleteButton, handleQuantityButton }) => {
  const placeholderImg = "/product-img-placeholder.svg";

  const HEADER = ['PRODUCT DETAILS', 'QUANTITY', 'PRICE', 'TOTAL']
  const HEADER_WIDTH = ['w-2/5', 'w-1/5', 'w-1/5', 'w-1/5']
  const HEADER_AlIGNMENT = ['justify-left', 'justify-center', 'justify-center', 'justify-center']

  return (
    <div className='m-auto w-5/6'>
      <div className="flex w-full ">
        {HEADER.map((header, index) => {
          return (
            <span key={header} className={cn('border-t-2 border-b-2 h-12 flex items-center', HEADER_WIDTH[index], HEADER_AlIGNMENT[index])}>
              {header}
            </span>
          )
        }
      )}
      </div>
      <ol className="grid grid-cols-5 gap-y-2">
        {cartList.map((cart) => {
          const product = cart.product;
          return (
            <li key={cart.id} className="contents">
              <div className='relative w-1/2' style={{aspectRatio: '1/1'}}>
                <Image
                  quality="100"
                  src={product.images[0].image || placeholderImg}
                  alt={product.title || "Product Image"}
                  layout='fill'
                  objectFit='contain'
                />
              </div>
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
            </li>
          )}
          )}
      </ol>
    </div>
  );
};

export default CartGrid;
