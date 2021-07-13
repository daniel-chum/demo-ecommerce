import Head from "next/head";
import Image from 'next/image'
import Marquee from "react-fast-marquee";
import {
  Tailwind,
  Django,
  Next,
  Node,
  Docker,
  Kubernetes,
} from "../components/icons";
import { Carousel } from '../components/ui'
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
      <Head>
        <title>Demo - Daniel C</title>
        <meta keywords="web developer, programming, programmer, software developer, software engineer, devops" />
      </Head>
      <Carousel>
        <li>
          <Image
            quality="100"
            src='https://images.unsplash.com/photo-1516116412344-6663387e8590?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=100'
            alt='First Banner'
            layout='fill'
            objectFit='cover'
          />
          <section className='relative flex flex-col h-full px-4 items-end justify-center'>
            <h1 className='text-white'>Welcome to my demo project</h1>
            <p className=' w-1/2 text-center text-white'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla ligula, tempor in elementum eu, hendrerit quis sem.
              Maecenas ultricies non enim sit amet vehicula. Sed euismod gravida varius. Nunc eget ex a neque elementum ultrices.
            </p>
          </section>
        </li>
        <li>
          <section className='relative flex flex-col h-full px-4 items-end justify-center'>
          <h1>Slide 2 Heading</h1>
            <p className='text-center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla ligula, tempor in elementum eu, hendrerit quis sem.
              Maecenas ultricies non enim sit amet vehicula. Sed euismod gravida varius. Nunc eget ex a neque elementum ultrices.
              Nam id nulla sed ligula malesuada convallis. Morbi et faucibus justo, vitae consequat urna.
            </p>
          </section>
        </li>
        <li>
          <h1>Slide 3 Heading</h1>
          <p className='text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla ligula, tempor in elementum eu, hendrerit quis sem.
            Maecenas ultricies non enim sit amet vehicula. Sed euismod gravida varius. Nunc eget ex a neque elementum ultrices.
            Nam id nulla sed ligula malesuada convallis. Morbi et faucibus justo, vitae consequat urna.
          </p>
        </li>
      </Carousel>
      <CardGrid products={products} />
      <Marquee gradient={false} speed="100">
        <Next width="200" height="100" style={{ margin: "0px 40px " }} />
        <Django width="250" height="100" style={{ margin: "0px 40px " }} />
        <Tailwind width="250" height="100" style={{ margin: "0px 40px " }} />
        <Node width="200" height="100" style={{ margin: "0px 40px " }} />
        <Docker width="150" height="100" style={{ margin: "0px 40px " }} />
        <Kubernetes width="100" height="100" style={{ margin: "0px 40px " }} />
      </Marquee>
    </div>
  );
}
