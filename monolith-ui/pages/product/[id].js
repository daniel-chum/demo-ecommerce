import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getProduct } from '../../api/products'
import FilePreviewContainer from "../../components/ui/FilePreview/FilePreviewContainer";
import { addCart } from '../../api/cart'
import { useAuth } from "../../lib/hooks/auth";
import cn from 'classnames'

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

  const router = useRouter();
  const { id } = router.query


  const handleCartButton = async (productId) => {
    let body = {
      'product_id': productId
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
          console.log(product.images.map(image => image.image))

          setProduct(product);

        } catch (e) {
          console.log(e);
        }
      };

      getProductDetails();
  }, [id]);

  return (
    <div className='grid grid-cols-7' style={{ padding: "0% 15%" }}>
      <section className='col-span-4'>
        <div className='w-full relative mx-auto border border-gray-300' style={{aspectRatio: "1/1"}}>
          <Image
            quality="100"
            src={product.images[picIndex].image || placeholderImg}
            alt={product.title || "Product Image"}
            layout='fill'
            objectFit='contain'
          />
        </div>
        <FilePreviewContainer>
          {(product.images).map((image, index) => {
            return (
              <div
                key={image.image}
                className={cn("relative w-32 h-32 border border-gray-300", { "opacity-40 bg-gray-200": index != picIndex })}
                onClick={() => { setPicIndex(index) }}
              >
                <img
                  src={image.image}
                  className="absolute w-full h-full object-scale-down	"
                />
              </div>
            );
          })}
        </FilePreviewContainer>
      </section>
      <section className='col-span-3'>
        <h1>{product.title}</h1>
        <h2>{`$${product.price}`}</h2>
        <span>{product.user.username}</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
  </div>
    );
};

export default ProductItem;
