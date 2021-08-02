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
        <section className='my-20 text-center'>
          <Link href='/about'>
            <a>
              <button
                className='bg-white text-lg border border-green-700 rounded-3xl py-2 px-8 text-green-700
                          focus:outline-none hover:bg-green-700 hover:text-white
                          transition duration-300'
                type='button'
              >
                  Find out more about us.
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

        <section className='py-10' >
          <div className='relative'>
            <div className='absolute left-0 top-1/2 border-b-2 border-gray-100 w-full' />
            <p className='relative left-1/2 transform -translate-x-1/2 text-center w-max px-10
                          bg-white font-medium text-secondary text-2xl tracking-tight'>
              Featured Products
            </p>
          </div>
          <p className='pt-4 w-1/2 mx-auto font-light text-base text-center'>
            Typi non habent claritatem insitam est usus legentis in qui facit eorum claritatem, investigationes demonstraverunt lectores legere me lius quod legunt saepius.
          </p>
          <CardGrid className='pt-10' childPerRow={5} products={products?.slice(0,5)} />
          <div className='text-center pt-12'>
            <Link href='/shop/1'>
              <a>
                <button
                  className='bg-gray-700 border rounded-lg py-3 px-8 text-white
                            focus:outline-none hover:bg-secondary
                            transition duration-300'
                  type='button'
                >
                    View more
                </button>
              </a>
            </Link>
          </div>
        </section>

         <section className='py-10 flex flex-wrap justify-center gap-x-8'>
          <div className='bg-primary-bright' style={{ width: 'calc(12rem + 24% )', aspectRatio: '1.85/1' }}>
            <div className='relative w-1/2 h-full' >
              <Image
                  quality="100"
                  src={'/kobe.png'}
                  alt={"Shopping isometric"}
                  layout='fill'
                  objectFit='fill'
              />
              <p className='relative left-full pl-2 top-1/4'>
                <span className='text-lg font-oswald'>HONORING</span>
                <br />
                <span className='text-4xl 3xl:text-5xl font-semibold font-rubik text-gray-800 tracking-tight '>BLACK MAMBA</span>
                <span className='block text-sm mt-3 cursor-pointer'>View Collection ᐅ</span>
              </p>
            </div>
          </div>
          <div className='bg-pink-300'  style={{ width: 'calc(12rem + 24% )', aspectRatio: '1.85/1' }}>
            <div className='relative w-2/5 h-full'>
              <Image
                  quality="100"
                  src={'/skincare.png'}
                  alt={"Shopping isometric"}
                  layout='fill'
                  objectFit='contain'
              />
              <p className='relative flex-grow left-full top-1/3'>
                <span className='text-lg font-oswald'>HEALTH & BEAUTY</span>
                <br />
                <span className='text-4xl 3xl:text-5xl font-semibold font-rubik text-gray-800 tracking-tight '>SKINCARE</span>
                <span className='block text-sm mt-2.5 cursor-pointer'>View Collection ᐅ</span>
              </p>
            </div>
          </div>
        </section>

        <section className='py-10' >
          <div className='relative'>
            <div className='absolute left-0 top-1/2 border-b-2 border-gray-100 w-full' />
            <p className='relative left-1/2 transform -translate-x-1/2 text-center w-max px-10
                          bg-white font-medium text-secondary text-2xl tracking-tight'>
              New Arrivals
            </p>
          </div>
          <p className='pt-4 w-1/2 mx-auto font-light text-base text-center'>
            Typi non habent claritatem insitam est usus legentis in qui facit eorum claritatem, investigationes demonstraverunt lectores legere me lius quod legunt saepius.
          </p>
          <CardGrid className='pt-10' childPerRow={5} products={products?.slice(5,10)} />
          <div className='text-center pt-12'>
            <Link href='/shop/1'>
              <a>
                <button
                  className='bg-gray-700 border rounded-lg py-3 px-8 text-white
                            focus:outline-none hover:bg-secondary
                            transition duration-300'
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
