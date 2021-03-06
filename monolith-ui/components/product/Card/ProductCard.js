import Link from 'next/link'

const ProductCard = ({ product, handleButton, ...props }) => {

  const placeholderImg = "/product-img-placeholder.svg";
  return (
    <li style={{ ...props.style }}>
      <div
        className='flex flex-col items-center
                  leading-none tracking-tight gap-y-2
                  font-rubik font-medium text-secondary text-sm'
      >
        <Link href={`/product/${product.id}`}>
          <a className='contents'>
            <img
            src={product?.images[0]?.image || placeholderImg}
            alt={product.title || "Product Image"}
            className='relative object-contain w-full cursor-pointer bg-gray-100 '
            style={{aspectRatio: '1/1'}}
            />
          </a>
        </Link>
        <span className='text-center'>{product.title}</span>
        <span>{`$${product.price}`}</span>
      </div>
    </li>
  );
};

export default ProductCard;
