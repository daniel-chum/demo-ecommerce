import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { getProduct } from '../../api/products'
import FilePreviewContainer from "../../components/ui/FilePreview/FilePreviewContainer";
import FilePreview from "../../components/ui/FilePreview/FilePreview";

const ProductItem = () => {
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

  const router = useRouter();
  const { id } = router.query 

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

  // const handleOrderClick = () => {
  //   const body = {
  //     product: [id],
  //   };

  //   try {
  //     createOrder(getToken, body).then((res) => {
  //       console.log(res);
  //     });
  //   } catch (e) {
  //     console.log("Error occurred while trying to add order.");
  //   }
  // };

  return (
      <div>
        <h3>{product.title}</h3>
        <p>{`$${product.price}`}</p>
        <FilePreviewContainer>
        {(product.images).map((image) => {
            return (
              <FilePreview
                key={image.image}
                imageURL={image.image}
              />
            );
          })}
        </FilePreviewContainer>
      </div>
    );
};

export default ProductItem;
