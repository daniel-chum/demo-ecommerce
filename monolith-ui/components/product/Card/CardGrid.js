import ProductCard from "./ProductCard";
import Link from 'next/link'

const CardGrid = ({ productList, ...props }) => {
  return (
    <div className='px-4 grid place-items-center grid-cols-4 space-y-4' {...props}>
      {productList.map((product) => (
        <>
          <Link href={`/product/${product.id}`}>
            <a>
              <ProductCard key={product.id} product={product}/>
            </a>
          </Link>
        </>
      ))}
    </div>
  );
};

export default CardGrid;
