import ProductCard from "../../product/ProductCard/ProductCard";

const HomePageProductGrid = ({ productList }) => {
  return (
    <div className="flex-1">
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant="simple"
          imgWidth={480}
          imgHeight={480}
        />
      ))}
    </div>
  );
};

export default HomePageProductGrid;
