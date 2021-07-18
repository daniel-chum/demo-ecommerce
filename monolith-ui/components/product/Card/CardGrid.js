import ProductCard from "./ProductCard";

const CardGrid = ({ products, ...props }) => {

  return (
    <div
      className='grid'
      style={{
        ...props.style,
        gridGap: "30px",
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
      }}
     >
      {products.map((product) => (
        <>
          <ProductCard key={product.id} product={product}/>
        </>
      ))}
    </div>
  );
};

export default CardGrid;
