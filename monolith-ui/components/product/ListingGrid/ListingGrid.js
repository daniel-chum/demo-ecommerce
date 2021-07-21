import s from "./ListingGrid.module.css";
import Image from "next/image";
import cn from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const ListingGrid = ({ productList, handleDeleteButton }) => {
  const placeholderImg = "/product-img-placeholder.svg";

  return (
    <div className={cn(s.productGrid)}>
      <div className={s.header}>
        <span>id</span>
      </div>
      <div className={s.header}>
        <span>Image</span>
      </div>
      <div className={s.header}>
        <span>Name</span>
      </div>
      <div className={s.header}>
        <span>Price</span>
      </div>
      <div className={cn(s.header, "border-r border-gray-400")}>
        <span>Action</span>
      </div>
      {productList.map((product) => (
        <>
          <div className={s.items}>
            <span>{product.id}</span>
          </div>
          <div className={s.items}>
            <Image
              quality="85"
              src={product.images[0].image || placeholderImg}
              alt={product.title || "Listing Image"}
              width={30}
              height={30}
            />
          </div>
          <div className={s.items}>{product.title}</div>
          <div className={cn(s.items, "flex justify-end")}>{product.price}</div>
          <div className="flex justify-center items-center">
            <button
              className="h-5 w-5 flex justify-center items-center focus:outline-none"
              productid={product.id}
              onClick={() => handleDeleteButton(product.id)}
              type="button"
            >
              <FontAwesomeIcon icon={faTimesCircle} className='h-4 text-gray-600 cursor-pointer' />
            </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default ListingGrid;
