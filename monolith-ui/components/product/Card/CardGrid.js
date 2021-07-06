import ProductCard from "./ProductCard";

const CardGrid = ({ productList }) => {
  return (
    <div className='px-4 grid place-items-center grid-cols-4 space-y-4'>
      {productList.map((product) => (
        <>
          <ProductCard key={product.id} product={product}/>
        </>
      ))}
    </div>
  );
};

export default CardGrid;
