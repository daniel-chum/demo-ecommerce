import Slider from '../components/homepage/Slider'
import { getAllProducts } from "../api/products";
import CardGrid from "../components/product/Card/CardGrid";
import { useState, useEffect } from "react";


export default function Home() {
  const [products, setProducts] = useState(
    [
      {
    'id': 0,
    'title': null,
    'price': null,
    'user': {
      'username': null
    },
    'images': [
      {
        'image': null
      }
    ]
      }
    ]
  );

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getAllProducts();
        const productArray = response.data;

        setProducts(productArray);

      } catch (e) {
        console.log(e);
      }
    };

    getProduct();
  }, []);

  return (
    <div>
      <Slider />
      <section>

      </section>
      <div className='mx-auto' style={{width: '92%'}}>
        <CardGrid style={{ paddingTop: '2.5rem' }} products={products} />
      </div>
    </div>
  );
}
