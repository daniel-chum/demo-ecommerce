import Head from "next/head";
import Marquee from "react-fast-marquee";
import ProductCard from "../components/product/ProductCard/ProductCard";
import Hero from "../components/ui/Hero/Hero";
import getAllProducts from "../api/get-all-products";
import HomePageProductGrid from "../components/common/HomePageProductGrid/HomePageProductGrid";
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
      <Marquee gradient={false}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
            imgLayout="fixed"
          />
        ))}
      </Marquee>
      <Hero
        headline="Release Details: The Yeezy BOOST 350 V2 ‘Natural'"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
        link="/about"
      />
      <HomePageProductGrid productList={products} />
    </div>
  );
}
