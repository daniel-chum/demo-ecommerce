import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const CardGrid = ({ products, childPerRow, ...props }) => {

  const componentRef = useRef()
  const [width, setWidth] = useState(1000)

  const itemsPerRow = childPerRow ? childPerRow : 4
  const gridGap = '30px'
  const maxWidth = products?.length >= itemsPerRow ? '1fr' : 'calc( 25% - 30px)'

  const minWidth = ( (width - 0.5 - (30* (itemsPerRow-1) ) ) / itemsPerRow )  * 0.92

  useEffect(() => {

    if (componentRef.current) {
      setWidth(componentRef.current.offsetWidth)
    }

  }, [products])

  return (
    <>
      {products ?
        (
        <ul
          ref={componentRef}
          className={`${props.className} grid`}
          style={{
            ...props.style,
            gridGap:  gridGap ,
            gridTemplateColumns: `repeat(auto-fit, minmax(  ${minWidth}px ,  ${maxWidth} ))`
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
