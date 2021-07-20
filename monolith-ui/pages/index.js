import Marquee from "react-fast-marquee";
import {
  Tailwind,
  Django,
  Next,
  Node,
  Docker,
  Kubernetes,
} from "../components/icons";
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
      <div className='mx-auto' style={{width: '92%'}}>
        <CardGrid style={{ paddingTop: '2.5rem' }} products={products} />
        <div className='pt-10'>
          <Marquee gradient={false} speed="100">
            <Next width="200" height="100" style={{ margin: "0px 40px " }} />
            <Django width="250" height="100" style={{ margin: "0px 40px " }} />
            <Tailwind width="250" height="100" style={{ margin: "0px 40px " }} />
            <Node width="200" height="100" style={{ margin: "0px 40px " }} />
            <Docker width="150" height="100" style={{ margin: "0px 40px " }} />
            <Kubernetes width="100" height="100" style={{ margin: "0px 40px " }} />
          </Marquee>
        </div>
      </div>
    </div>
  );
}
