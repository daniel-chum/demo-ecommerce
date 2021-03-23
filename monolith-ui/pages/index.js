import Head from "next/head";
import Marquee from "react-fast-marquee";
import {
  Tailwind,
  Django,
  Next,
  Node,
  Docker,
  Kubernetes,
} from "../components/icons";
import Hero from "../components/ui/Hero/Hero";
import getAllProducts from "../api/get-all-products";
import ProductGrid from "../components/common/ProductGrid/ProductGrid";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

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
      <Head>
        <title>Project - Daniel C</title>
        <meta keywords="web developer, programming, programmer, software developer, software engineer, devops" />
      </Head>
      <Hero
        headline="Welcome to my page"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
        link="/about"
      />
      <Marquee gradient={false} speed="100">
        <Next width="200" height="100" style={{ margin: "0px 40px " }} />
        <Django width="250" height="100" style={{ margin: "0px 40px " }} />
        <Tailwind width="250" height="100" style={{ margin: "0px 40px " }} />
        <Node width="200" height="100" style={{ margin: "0px 40px " }} />
        <Docker width="150" height="100" style={{ margin: "0px 40px " }} />
        <Kubernetes width="100" height="100" style={{ margin: "0px 40px " }} />
      </Marquee>

      <ProductGrid productList={products} />
    </div>
  );
}
