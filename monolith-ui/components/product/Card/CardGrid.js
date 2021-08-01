import React from "react";
import ProductCard from "./ProductCard";

const CardGrid = ({ products, ...props }) => {

  return (
    <>
      {products ?  
        (
        <ul
          className={`${props.className} grid`}
          style={{
            ...props.style,
            gridGap: "30px",
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}
        >
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <ProductCard product={product} />
            </React.Fragment>
          ))}
        </ul>
        ) : null
      }
    </>
  );
};

export default CardGrid;
