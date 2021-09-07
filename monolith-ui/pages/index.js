import Slider from '../components/homepage/Slider'
import { getProductList } from "../api/products";
import CardGrid from "../components/product/Card/CardGrid";
import { useState, useEffect } from "react";
import Link from 'next/link'

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
        <section className='my-10 lg:mb-16 lg:mt-12 text-center'>
          <Link href='/about'>
            <a>
              <button
                className='bg-white text-sm lg:text-lg font-semibold border border-secondary  rounded-3xl py-2 px-8 text-secondary focus:outline-none'
                type='button'
              >
                  About us
              </button>
            </a>
          </Link>
        </section>

        <section className='relative'  style={{ aspectRatio: '2.5/1' }}>
          <div
            className='absolute z-50 flex flex-col justify-center pt-4 md:pt-20 lg:pt-24 xl:pt-36 3xl:pt-44 pl-4 md:pl-10 lg:pl-16 font-chicle font-medium text-white'
          >
            <h1 className='md:text-3xl lg:text-4xl xl:text-6xl'>PETS WEEK SUMMER SALE</h1>
            <span className='text-xs md:text-base w-3/4 md:w-full xl:text-2xl tracking-wider'>Everything from fun to food! Up to 75% off</span>
            <button
                  className='mt-2 lg:mt-6 xl:mt-10 w-20 lg:w-32 md:h-10 lg:h-16 text-xs md:text-base lg:text-xl border text-white focus:outline-none'
                  type='button'
                >
                  Shop now
                </button>
          </div>
          <img
            src='/dog.jpg'
            alt="Shopping isometric"
            className='object-cover w-full h-full'
          />
        </section>

        <section className='pt-20 lg:pt-32' >
          <div className='relative'>
            <div className='absolute left-0 top-1/2 border-b-2 border-gray-100 w-full' />
            <p className='relative left-1/2 transform -translate-x-1/2 text-center w-max px-10
                          bg-white font-medium text-secondary text-2xl tracking-tight'>
              Featured Products
            </p>
          </div>
          <p className='pt-6 xl:w-3/4 mx-auto font-light text-xs md:text-base text-center'>
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

        <section className='mt-20 md:mt-28 xl:flex justify-center gap-x-2 space-y-6 xl:space-y-0' >
          <div className='relative xl:w-5/12' style={{ aspectRatio: '1.85/1' }}>
            <p className='absolute h-full w-1/2 pl-8 md:pl-16 pt-6 md:pt-10 lg:pt-20 xl:pt-10 text-white'>
              <span className='md:text-2xl xl:text-xl font-oswald tracking-wide'>ELECTRONICS</span>
              <br />
              <span className='block md:mt-2 text-sm md:text-4xl lg:text-6xl xl:text-4xl font-semibold font-rubik text-secondary tracking-tight '>GAMING CONSOLES</span>
              <span className='block text-sm md:text-lg lg:text-xl xl:text-base md:mt-2 cursor-pointer'>Up to 30% off ᐅ</span>
            </p>
            <img
                src='/ps5.jpg'
                alt="Shopping isometric"
                className= 'object-cover h-full w-full'
            />
          </div>
          <div className='relative xl:w-5/12' style={{ aspectRatio: '1.85/1' }}>
            <p className='absolute w-1/2 left-1/3 pl-8 md:pl-16 top-1/4 text-white'>
              <span className='text-lg md:text-2xl lg:text-4xl xl:text-2xl font-oswald'>HONORING</span>
              <br />
              <span className='md:text-5xl lg:text-7xl xl:text-5xl font-semibold font-rubik text-yellow-300 tracking-tight '>BLACK MAMBA</span>
              <span className='block text-sm md:text-lg lg:text-xl xl:text-base mt-3 cursor-pointer'>View Collection ᐅ</span>
            </p>
            <img
                src='/kobe-bryant.jpg'
                alt="Shopping isometric"
                className= 'object-cover h-full w-full'
            />
          </div>
        </section>

        <section className='pt-20 lg:pt-32 pb-20 lg:pb-28' >
          <div className='relative'>
            <div className='absolute left-0 top-1/2 border-b-2 border-gray-100 w-full' />
            <p className='relative left-1/2 transform -translate-x-1/2 text-center w-max px-10
                          bg-white font-medium text-secondary text-2xl tracking-tight'>
              New Arrivals
            </p>
          </div>
          <p className='pt-6 xl:w-3/4 mx-auto font-light text-xs md:text-base text-center'>
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
