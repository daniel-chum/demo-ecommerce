import React from "react";
import ProductCard from "./ProductCard";

const CardGrid = ({ products, ...props }) => {

  return (
    <ul
      className='grid'
      style={{
        ...props.style,
        gridGap: "30px",
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
      }}
    >
      {products.map((product) => (
        <React.Fragment key={product.id}>
          <ProductCard product={product}/>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default CardGrid;
