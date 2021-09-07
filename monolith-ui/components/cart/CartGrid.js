import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const CartGrid = ({ cartList, handleDeleteButton, handleQuantityButton, className }) => {
  const placeholderImg = "/product-img-placeholder.svg";

  const HEADER = ['', 'PRODUCT', 'PRICE', 'QUANTITY', 'TOTAL', '']

  return (
    <table className={`${className} mb-20`}>
      <thead
        className='grid justify-items-center items-center'
        style={{
          gridTemplateColumns: '12% 44% repeat(3, 1fr) 5%'
        }}>
        <tr className="contents">
        {HEADER.map((header, index) => {
          return (
            <th key={index} className='h-12 border-t-2 border-b-2 flex justify-center items-center w-full font-rubik'>
              {header}
            </th>
          )
        }
          )}
        </tr>
      </thead>
      <tbody className='h-full'>
        {cartList.map((cart) => {
          const product = cart.product;
          return (
            <tr key={cart.id} className="flex justify-center items-center border-b py-4">
              <td className='pl-4' style={{ width: '12%' }}>
                <Link href={`/product/${product.id}`}>
                  <a>
                    <div className='bg-gray-100' >
                      <img
                        src={product.images[0].image || placeholderImg}
                        alt={product.title || "Product Image"}
                        className='object-contain'
                        style={{ aspectRatio: '1/1' }}
                      />
                    </div>
                  </a>
                </Link>
              </td>
              <td className='px-4 font-rubik text-center' style={{ width: '44%' }}>
                <div className='relative flex flex-col'>
                  <span>{product.title}</span>
                  <div className='absolute -bottom-5 left-0 w-full mx-auto text-xs'>
                    <label className='italic'>Listed by: </label>
                    <span>{product.user.username}</span>
                  </div>
                </div>
              </td>
              <td className="text-center font-rubik font-light" style={{ width: '13%' }}>${product.price}</td>
              <td className='flex justify-center gap-x-1.5' style={{ width: '13%' }}>
                <button className='focus:outline-none' onClick={() => { handleQuantityButton(cart.id, parseInt(cart.quantity) - 1) }}>
                  <FontAwesomeIcon icon={faMinus} className='h-3 text-gray-600 cursor-pointer' />
                </button>
                <input
                  className='border rounded-sm w-10 font-rubik font-light text-sm text-center focus:outline-none'
                  type="number"
                  min='1'
                  value={cart.quantity}
                  onChange={(e) => { handleQuantityButton(cart.id, e.target.value) }}
                />
                <button className='focus:outline-none' onClick={() => { handleQuantityButton(cart.id, parseInt(cart.quantity) + 1) }}>
                  <FontAwesomeIcon icon={faPlus} className='h-3 text-gray-600 cursor-pointer' />
                </button>
              </td>
              <td className="text-center text-primary font-rubik font-light" style={{ width: '13%' }}>${(product.price * cart.quantity).toFixed(2)}</td>
              <td className='flex justify-center items-center' style={{ width: '5%' }} onClick={() => handleDeleteButton(cart.id) }>
                <FontAwesomeIcon icon={faTimes} className='h-3 text-gray-600 cursor-pointer' />
              </td>
            </tr>
          )}
        )}
      </tbody>
    </table>
  );
};

export default CartGrid;
