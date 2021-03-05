import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import s from "./ProductCard.module.css";

const ProductCard = ({
  className,
  product,
  variant,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = "responsive",
}) => {
  const placeholderImg = "/product-img-placeholder.svg";

  return (
    <Link href={`/product`}>
      <a
        className={cn(s.root, { [s.simple]: variant === "simple" }, className)}
      >
        {variant === "slim" ? (
          <div className="relative overflow-hidden box-border">
            <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {product.title}
              </span>
            </div>
            <Image
              quality="85"
              width={imgWidth}
              sizes={imgSizes}
              height={imgHeight}
              layout={imgLayout}
              loading={imgLoading}
              priority={imgPriority}
              src={product.image || placeholderImg}
              alt={product.title || "Product Image"}
            />
          </div>
        ) : (
          <>
            <div className={s.squareBg} />
            <div className="flex flex-row justify-between box-border w-full z-20 absolute">
              <div className="absolute top-0 left-0 pr-16 max-w-full">
                <h3 className={s.productTitle}>
                  <span>{product.title}</span>
                </h3>
                <span className={s.productPrice}>{product.price}</span>
              </div>
            </div>
            <div className={s.imageContainer}>
              <Image
                quality="85"
                src={product.image || placeholderImg}
                alt={product.title || "Product Image"}
                className={s.productImage}
                width={imgWidth}
                sizes={imgSizes}
                height={imgHeight}
                layout={imgLayout}
                loading={imgLoading}
                priority={imgPriority}
              />
            </div>
          </>
        )}
      </a>
    </Link>
  );
};

export default ProductCard;
