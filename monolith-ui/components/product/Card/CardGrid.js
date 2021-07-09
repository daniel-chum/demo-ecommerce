import ProductCard from "./ProductCard";
import { addCart } from '../../../api/cart'
import { useAuth } from "../../../lib/hooks/auth";

const CardGrid = ({ products, ...props }) => {

  const { getToken, isAuthenticated } = useAuth();

  const handleAddButton = async (productId) => {
    let body = {
      'product_id': productId
    }

    try {
      const res = await addCart(getToken, body);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='px-4 pt-4 grid place-items-center grid-cols-4 gap-4' {...props}>
      {products.map((product) => (
        <>
          <ProductCard key={product.id} product={product} handleAddButton={handleAddButton}/>
        </>
      ))}
    </div>
  );
};

export default CardGrid;
