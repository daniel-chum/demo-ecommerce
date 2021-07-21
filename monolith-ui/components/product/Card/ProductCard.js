import Image from "next/image";
import Link from 'next/link'

const ProductCard = ({ product, handleButton }) => {

  const placeholderImg = "/product-img-placeholder.svg";
  return (

    <li className='product-card w-full h-full flex flex-col items-center'>
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
        <span className='pt-2.5 text-center leading-none font-rubik font-medium text-dark text-sm tracking-tight'>{product.title}</span>
        <span className='pt-2 leading-none font-rubik font-medium text-dark text-sm tracking-tight'>{`$${product.price}`}</span>
    </li>
  );
};

export default ProductCard;
