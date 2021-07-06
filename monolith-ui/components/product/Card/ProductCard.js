import Image from "next/image";

const shadowStyle = {
  boxShadow: "0px 20px 25px 5px rgb(201,201,201)"
}

const ProductCard = ({ product }) => {
  const placeholderImg = "/product-img-placeholder.svg";
  return (
    <div className='w-6/12 h-56 flex flex-col
     items-center justify-center space-y-3
     bg-secondary border border-secondary'
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
  );
};

export default ProductCard;
