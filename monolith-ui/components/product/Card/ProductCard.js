import Image from "next/image";
import Link from 'next/link'

const shadowStyle = {
  boxShadow: "0px 20px 25px 5px rgb(201,201,201)"
}

const ProductCard = ({ product, handleAddButton }) => {
  const placeholderImg = "/product-img-placeholder.svg";
  return (
    <div className='w-full h-full flex flex-col '>
      <Link href={`/product/${product.id}`}>
        <div
          className='w-full h-56 flex flex-col items-center justify-center space-y-3 bg-secondary cursor-pointer'
          style={shadowStyle}>
          <div>
            <Image
            quality="85"
            src={product.images[0].image || placeholderImg}
            alt={product.title || "Product Image"}
            width={140}
            height={100}
            />
          </div>
          <div>{product.title}</div>
          <div>{`$${product.price}`}</div>
        </div>
      </Link>
      <button className='bg-primary h-12' onClick={() => { handleAddButton(product.id) }}>ADD TO CART</button>
    </div>
  );
};

export default ProductCard;
