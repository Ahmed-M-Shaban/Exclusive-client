import gsap from "gsap";
import { memo, useRef } from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

import IconSm from "./IconSm";
import SmallMoney from "./MoneySm";
import ButtonBlack from "./ButtonBlack";
import { useGetProductsQuery } from "../features/product/productSlice";
import { deleteIcon, heartIcon, quickViewIcon } from "../utils/constants";
import RingLoading from "./RingLoading";
import { useAddToCartMutation } from "../features/cart/cartApiSlice";

/**
 * @typedef {Object} ProductCardProps
 * @property {Product} product - The product information.
 * @property {Args} args - Cache selection args.
 * @property {'delete' | 'options'} [rightIconsType] - Type of right icons (optional).
 */

/**
 * ProductCard component renders a product card with details.
 * @param {ProductCardProps} props - The props for the ProductCard component.
 * @returns {JSX.Element}
 */

const ProductCard = ({
  productId,
  args = undefined,
  rightIconsType = "options",
}) => {
  const btnRef = useRef(null);
  const { product, isLoading, isSuccess } = useGetProductsQuery(args, {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      product: data?.data?.entities[productId],
      isLoading,
      isSuccess,
    }),
  });
  const [addToCart] = useAddToCartMutation();

  const discount = Math.round(
    product?.priceAfterDiscount
      ? ((product.price - product?.priceAfterDiscount) / product.price) * 100
      : 0
  );

  const handleMouseEvent = (event) => {
    switch (event.type) {
      case "mouseenter":
        gsap.to(btnRef.current, {
          opacity: 1,
          transform: "translateY(0%)",
          duration: 0.3,
          ease: "ease-in-out",
        });
        break;

      case "mouseleave":
        gsap.to(btnRef.current, {
          opacity: 0,
          transform: "translateY(100%)",
          duration: 0.3,
          ease: "ease-in-out",
        });
        break;

      default:
        break;
    }
  };

  const handleAddToCart = async () => {
    await addToCart({ productId: product._id });
  };

  return isLoading ? (
    <RingLoading />
  ) : (
    isSuccess && product && (
      <div className="w-fit">
        {/* image container */}
        <div
          className="relative w-[270px] h-[250px] bg-secondary mb-4 rounded-[4px] overflow-hidden"
          onMouseEnter={handleMouseEvent}
          onMouseLeave={handleMouseEvent}
        >
          {/* image */}
          <img
            src={product?.imageCover}
            alt="product-image"
            className="w-full h-full object-contain px-10 py-8"
          />

          {/* right icons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {rightIconsType === "options" ? (
              <>
                <div
                  className="p-1 bg-primary rounded-full cursor-pointer hover:scale-125 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("add to wishlist");
                  }}
                >
                  <IconSm icon={heartIcon} alt="heart-icon" />
                </div>

                <Link to={`/products/${product._id}`}>
                  <div className="p-1 bg-primary rounded-full cursor-pointer hover:scale-125 transition-all duration-300">
                    <IconSm icon={quickViewIcon} alt="heart-icon" />
                  </div>
                </Link>
              </>
            ) : (
              <div
                className="p-1 bg-primary rounded-full cursor-pointer hover:scale-125 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("delete from wishlist");
                }}
              >
                <IconSm icon={deleteIcon} alt="delete-icon" />
              </div>
            )}
          </div>

          {/* discount */}
          {discount && (
            <div className="absolute top-2 left-2 bg-secondary2 text-text rounded-[4px] text-xs font-medium px-2.5 py-1 cursor-default">
              -{discount}%
            </div>
          )}

          {/* add to cart button */}
          <div
            className="absolute bottom-0 w-full translate-y-[100%] opacity-0"
            ref={btnRef}
            onClick={handleAddToCart}
          >
            <ButtonBlack element="add to cart" />
          </div>
        </div>

        {/* product details */}
        <div className="flex flex-col justify-start gap-2">
          {/* product title */}
          <p className="text-sm font-medium max-w-64 whitespace-nowrap overflow-hidden text-ellipsis font-Poppins">
            {product.title}
          </p>

          {/* product price */}
          <div className="flex items-center gap-3">
            {product.priceAfterDiscount ? (
              <>
                <SmallMoney money={product.priceAfterDiscount} />
                <SmallMoney money={product.price} prev={true} />
              </>
            ) : (
              <SmallMoney money={product.price} />
            )}
          </div>

          {/* product rating */}
          <div className="flex items-center gap-3">
            <Rating
              name="read-only"
              value={product.ratingsAverage}
              readOnly
              precision={0.25}
              size="small"
            />
            <span className="text-xs font-semibold text-text1">
              ({product.ratingsQuantity})
            </span>
          </div>

          {/* product selections flex */}
        </div>
      </div>
    )
  );
};

const memeoizedProductCard = memo(ProductCard);

export default memeoizedProductCard;
