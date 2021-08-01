import Image from "next/image";
import Link from 'next/link'

const ProductCard = ({ product, handleButton }) => {

  const placeholderImg = "/product-img-placeholder.svg";
  return (

    <li className='product-card w-full h-full flex flex-col items-center leading-none font-rubik font-medium text-secondary text-sm tracking-tight gap-y-2'>
      <Link href={`/product/${product.id}`}>
        <a className='contents'>
          <div className='relative w-full cursor-pointer bg-gray-100' style={{aspectRatio: '1/1'}}>
            <Image
            quality="100"
            src={product.images[0].image || placeholderImg}
            alt={product.title || "Product Image"}
            layout='fill'
            objectFit='contain'
            />
          </div>
        </a>
      </Link>
        <span>{product.title}</span>
        <span>{`$${product.price}`}</span>
    </li>
  );
};

export default ProductCard;
