import { useRouter } from "next/router";
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getProduct } from '../../api/products'
import FilePreviewContainer from "../../components/ui/FilePreview/FilePreviewContainer";
import { addCart } from '../../api/cart'
import { useAuth } from "../../lib/hooks/auth";
import cn from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faPinterest, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';

const ProductItem = () => {
  const placeholderImg = "/product-img-placeholder.svg";
  const { getToken, isAuthenticated } = useAuth();

  const [product, setProduct] = useState(
    {
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
  );
  const [picIndex, setPicIndex] = useState(0)
  const [cartQuantity, setCartQuantity] = useState(1)

  const router = useRouter();
  const { id } = router.query

  const handleQuantityInput = e => {
    const { target } = e;
    const value = target.value;
    const quantity = value;
    setCartQuantity(quantity);
  }

  const handleCartButton = async (productId) => {
    let body = {
      'product_id': productId,
      'quantity': cartQuantity
    }

    try {
      const res = await addCart(getToken, body);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
      const getProductDetails = async () => {
        try {

          const response = await getProduct(id);
          const product = response.data;

          setProduct(product);

        } catch (e) {
          console.log(e);
        }
      };

      getProductDetails();
  }, [id]);

  return (
    <div className='mx-48 3xl:mx-80 pt-4'>
      <ol className='flex space-x-4 items-center'>
        <Link href='/'>
          <li className='font-rubik font-light text-primary cursor-pointer'>Home</li>
        </Link>
        <li className='text-xs'>&#10095;</li>
        <li className='font-rubik font-light leading-none'>Category</li>
        <li className='text-xs'>&#10095;</li>
        <li className='font-rubik font-light'>Sub-Category</li>
      </ol>
      <div className='grid grid-cols-7 pt-10 pb-10'>
        <section className='col-span-3 justify-self-end w-full  pr-10'>
          <div className= 'relative w-full mb-3 ' style={{ aspectRatio: "1/1" }}>
            {(product.images).map((image, index) => {
              let visiblity = (index === picIndex) ? "opacity-100 z-50" : "opacity-0 z-0";
              return (
                <div className={`${visiblity} bg-gray-100 absolute w-full h-full transition duration-300`}>
                  <Image
                    quality="100"
                    src={image.image || placeholderImg}
                    alt={product.title || "Product Image"}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              )
            })
            }
          </div>
          <FilePreviewContainer showArrow={false} scrollBarOnHover={true}>
            {(product.images).map((image, index) => {
              return (
                <div
                  key={image.image}
                  className={cn("relative flex-none " /*, { "opacity-90 bg-gray-100": index != picIndex } */)}
                  style={{ aspectRatio: '1/1', width: 'calc(33.3% - 0.375rem)',  scrollSnapAlign: 'start' }}
                  onClick={() => { setPicIndex(index) }}
                >
                  <img
                    src={image.image}
                    className="absolute w-full h-full object-scale-down	bg-gray-100"
                  />
                </div>
              );
            })}
          </FilePreviewContainer>
        </section>
        <section className='col-span-4' >
          <div className='space-y-4'>
            <h1 className='font-rubik text-3xl font-semibold'>{product.title}</h1>
            <p className='font-rubik text-sm'>
              <label className='italic'>Listed by: </label>
              <span>{product.user.username}</span>
            </p>
            <h2 className='font-rubik text-2xl font-semibold'>{`$${product.price}`}</h2>
          </div>
          <div className='border-t border-b mt-11 py-8' >
            <p className='font-rubik'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className='pt-8 flex'>
            <input
              className='border text-center w-20 h-12 mr-6'
              type="number"
              onChange={handleQuantityInput}
              value={cartQuantity}
              min='1'
            />
            <button className='bg-primary rounded-md h-12 px-11 font-rubik font-medium text-sm text-white focus:outline-none' onClick={() => handleCartButton(product.id, cartQuantity)}>ADD TO CART</button>
          </div>
          <div className='flex items-center space-x-3 pt-10'>
            <span className='font-rubik font-medium'>SHARE THIS PRODUCT</span>
            <FontAwesomeIcon icon={faFacebookF} className='h-4 text-gray-700 cursor-pointer'/>
            <FontAwesomeIcon icon={faTwitter} className='h-4 text-gray-700 cursor-pointer'/>
            <FontAwesomeIcon icon={faPinterest} className='h-4 text-gray-700 cursor-pointer'/>
            <FontAwesomeIcon icon={faWhatsappSquare} className='h-4 text-gray-700 cursor-pointer'/>
          </div>
        </section>
      </div>
    </div>
    );
};

export default ProductItem;
