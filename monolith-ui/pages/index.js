import Slider from '../components/homepage/Slider'
import { getProductList } from "../api/products";
import CardGrid from "../components/product/Card/CardGrid";
import { useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'


export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        let page = 1
        const response = await getProductList(page);
        const productArray = response.data.results.slice(0,10);

        setProducts(productArray);

      } catch (e) {
        console.log(e);
      }
    };

    getProduct();
  }, []);

  return (
    <div className='font-rubik text-font-gray'>
      <Slider />
      <div className='mx-auto' style={{ width: '80%' }}>
        <section className='mb-20 mt-12 text-center'>
          <Link href='/about'>
            <a>
              <button
                className='bg-white text-lg font-semibold border border-primary  rounded-3xl py-2 px-8 text-primary
                          focus:outline-none hover:bg-primary hover:text-white
                          transition duration-300'
                type='button'
              >
                  Find out more about us
              </button>
            </a>
          </Link>
        </section>

        <section className='relative'  style={{ aspectRatio: '2.5/1' }}>
          <div className='w-full h-full relative z-40'>
            <Image
              quality="100"
              src={'/dog.jpg'}
              alt={"Shopping isometric"}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div
            className='absolute top-1/3 transform translate-x-1/4 z-50
                      flex flex-col justify-center gap-y-4
                      font-chicle font-medium text-white  '
          >
            <h1 className='text-6xl'>PETS WEEK SUMMER SALE</h1>
            <span className='text-2xl tracking-wider'>Everything from fun to food! Up to 75% off</span>
            <button
                  className='border rounded-lg mt-4 py-3 px-8 text-white w-1/4
                            focus:outline-none
                            transition duration-300'
                  type='button'
                >
                  Shop now
                </button>
          </div>
        </section>

        <section className='mt-20 py-10' >
          <div className='relative'>
            <div className='absolute left-0 top-1/2 border-b-2 border-gray-100 w-full' />
            <p className='relative left-1/2 transform -translate-x-1/2 text-center w-max px-10
                          bg-white font-medium text-secondary text-2xl tracking-tight'>
              Featured Products
            </p>
          </div>
          <p className='pt-6 w-1/2 mx-auto font-light text-base text-center'>
            Typi non habent claritatem insitam est usus legentis in qui facit eorum claritatem, investigationes demonstraverunt lectores legere me lius quod legunt saepius.
          </p>
          <CardGrid className='pt-16' childPerRow={5} products={products?.slice(0,5)} />
          <div className='text-center pt-12'>
            <Link href='/shop/1'>
              <a>
                <button
                  className='bg-primary border rounded-lg py-3 px-8 text-white font-semibold text-lg focus:outline-none'
                  type='button'
                >
                    View more
                </button>
              </a>
            </Link>
          </div>
        </section>

        <section className='my-20 flex flex-wrap justify-center gap-x-8'>
          <div style={{ width: 'calc(12rem + 24% )', aspectRatio: '1.85/1' }}>
            <div className='relative h-full' >
              <Image
                  quality="100"
                  src={'/ps5.jpg'}
                  alt={"Shopping isometric"}
                  layout='fill'
                  objectFit='cover'
              />
              <p className='relative w-1/2 pl-8 pt-8 text-white'>
                <span className='text-lg font-oswald tracking-wide'>ELECTRONICS</span>
                <br />
                <span className='block mt-2 text-4xl 3xl:text-5xl font-semibold font-rubik text-secondary tracking-tight '>GAMING CONSOLES</span>
                <span className='block text-sm mt-2 cursor-pointer'>Up to 30% off ᐅ</span>
              </p>
            </div>
          </div>

          <div style={{ width: 'calc(12rem + 24% )', aspectRatio: '1.85/1' }}>
            <div className='relative h-full' >
              <Image
                  quality="100"
                  src={'/kobe-bryant.jpg'}
                  alt={"Shopping isometric"}
                  layout='fill'
                  objectFit='cover'
              />
              <p className='relative w-1/2 left-1/3 pl-8 top-1/4 text-white'>
                <span className='text-lg font-oswald'>HONORING</span>
                <br />
                <span className='text-4xl 3xl:text-5xl font-semibold font-rubik text-yellow-300 tracking-tight '>BLACK MAMBA</span>
                <span className='block text-sm mt-3 cursor-pointer'>View Collection ᐅ</span>
              </p>
            </div>
          </div>

        </section>

        <section className='mt-20 pt-10 mb-28' >
          <div className='relative'>
            <div className='absolute left-0 top-1/2 border-b-2 border-gray-100 w-full' />
            <p className='relative left-1/2 transform -translate-x-1/2 text-center w-max px-10
                          bg-white font-medium text-secondary text-2xl tracking-tight'>
              New Arrivals
            </p>
          </div>
          <p className='pt-6 w-1/2 mx-auto font-light text-base text-center'>
            Typi non habent claritatem insitam est usus legentis in qui facit eorum claritatem, investigationes demonstraverunt lectores legere me lius quod legunt saepius.
          </p>
          <CardGrid className='pt-16' childPerRow={5} products={products?.slice(5,10)} />
          <div className='text-center pt-12'>
            <Link href='/shop/1'>
              <a>
                <button
                  className='bg-primary border rounded-lg py-3 px-8 text-white font-semibold text-lg focus:outline-none'
                  type='button'
                >
                    View more
                </button>
              </a>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
