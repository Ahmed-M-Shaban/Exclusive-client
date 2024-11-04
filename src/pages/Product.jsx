import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";

import Icon from "../components/Icon";
import IconSm from "../components/IconSm";
import Loading from "../components/Loading";
import Roadmap from "../components/Roadmap";
import MoneyLg from "../components/MoneyLg";
import SmallError from "../components/SmallError";
import TitleHeader from "../components/TitleHeader";
import SmallButton from "../components/SmallButton";
import ProductCard from "../components/ProductCard";
import {
  useGetProductQuery,
  useLazyGetProductsQuery,
} from "../features/product/productSlice";
import {
  deliveryIcon,
  minusIcon,
  plusIcon,
  returnIcon,
  wishlistIcon,
} from "../utils/constants";
import RingLoading from "../components/RingLoading";

const Product = () => {
  const productId = useParams().id;
  const [size, setSize] = useState(0);
  const [color, setColor] = useState(0);
  const [amount, setAmount] = useState(1);
  const [currImage, setCurrImage] = useState(0);
  const [productImages, setProductImages] = useState([]);

  const {
    data: productData,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductQuery(productId);

  const [
    trigger,
    {
      data: relatedData,
      isLoading: isRelatedLoading,
      isSuccess: isRelatedSuccess,
      isError: isRelatedError,
    },
  ] = useLazyGetProductsQuery();

  useEffect(() => {
    if (productData) {
      setProductImages([
        productData.data.imageCover,
        ...productData.data.images,
      ]);
      trigger({
        page: 1,
        type: "category",
        categoryId: productData.data.category._id,
      });
    }
  }, [productData, trigger]);

  return (
    <div className="common-margin py-20 flex flex-col gap-20">
      <Roadmap road={["home", "products", productData?.data.title]} />

      {/* product */}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <SmallError />
      ) : (
        isSuccess && (
          <div className="flex justify-between justifycenter gap-24">
            {/* product images */}
            <div className="flex h-[600px] gap-6">
              {/* all images */}
              <div className="flex flex-col h-full gap-4 overflow-y-scroll">
                {productImages.map((img, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setCurrImage(i)}
                    className={`product-small-image ${
                      i === currImage && "border-secondary2"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`product-image-${i}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* showed image */}
              <div className="flex items-center justify-center w-[500px] h-full px-7 py-8 bg-secondary rounded">
                <img
                  src={productImages[currImage]}
                  alt="current-image"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* product info */}
            <div className="flex flex-col w-[400px] gap-6">
              <div className="flex flex-col gap-6">
                {/* top info */}
                <div className="flex flex-col gap-4">
                  {/* title */}
                  <h1 className="text-2xl font-semibold">
                    {productData.data.title}
                  </h1>

                  {/* rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Rating
                        name="read-only"
                        value={productData.data.ratingsAverage}
                        readOnly
                        precision={0.25}
                        size="small"
                      />

                      <span className="capitalize text-sm font-Poppins opacity-50">
                        ({productData.data.ratingsQuantity} reviews)
                      </span>
                    </div>

                    <span className="text-sm font-Poppins opacity-50">|</span>

                    <span
                      className={`capitalize text-sm font-Poppins opacity-60 ${
                        productData.data.quantity > 0
                          ? "text-button1"
                          : "text-[#9f3131]"
                      }`}
                    >
                      {productData.data.quantity > 0
                        ? "in stock"
                        : "out of stock"}
                    </span>
                  </div>

                  {/* price */}
                  <div className="flex items-center gap-8">
                    {productData.data.priceAfterDiscount ? (
                      <>
                        <MoneyLg money={productData.data.priceAfterDiscount} />
                        <MoneyLg money={productData.data.price} prev />
                      </>
                    ) : (
                      <MoneyLg money={productData.data.price} />
                    )}
                  </div>

                  {/* description */}
                  <p className="text-sm leading-[21px] font-Poppins">
                    {productData.data.description}
                  </p>
                </div>

                {/* underline */}
                <div className="h-[1px] my3 bg-text2 opacity-50" />

                {/* bottom info */}
                <div className="flex flex-col gap-6">
                  {/* colours */}
                  {productData?.data?.colors?.length > 0 && (
                    <div className="flex items-center gap-6">
                      <span className="capitalize text-xl">colurs:</span>
                      <ul className="flex gap-2">
                        {productData.data.colors.map((c, i) => (
                          <li
                            key={i}
                            onClick={() => setColor(i)}
                            className={`w-5 h-5 rounded-full cursor-pointer ${
                              color === i && "p-[2px] border-[2px] border-black"
                            }`}
                          >
                            <div className="h-full bg-black rounded-full" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* sizes */}
                  {productData?.data?.sizes?.length > 0 && (
                    <div className="flex items-center gap-6">
                      <span className="capitalize text-xl">size:</span>
                      <ul className="flex gap-4">
                        {productData.data.sizes.map((s, i) => (
                          <li
                            key={i}
                            onClick={() => setSize(i)}
                            className={`flex items-center justify-center w-8 h-8 common-border uppercase text-sm font-medium font-Poppins cursor-pointer ${
                              size === i &&
                              "border-none bg-secondary2 text-text"
                            }`}
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {/* amount */}
                    <div className="flex items-center justifybetween w-40 h-11">
                      {/* minus */}
                      <div
                        onClick={() =>
                          setAmount((prev) => (prev - 1 > 0 ? prev - 1 : prev))
                        }
                        className="flex flex-shrink-0 items-center justify-center w-10 h-full border border-black/50 rounded-l cursor-pointer"
                      >
                        <IconSm icon={minusIcon} alt="minus-icon" />
                      </div>

                      {/* amount */}
                      <div className="flex items-center justify-center w-full h-full text-xl font-medium font-Poppins border-y border-black/50">
                        {amount}
                      </div>

                      {/* plus */}
                      <div
                        onClick={() =>
                          setAmount((prev) =>
                            prev + 1 <= productData.data.quantity
                              ? prev + 1
                              : prev
                          )
                        }
                        className="flex flex-shrink-0 items-center justify-center w-10 h-full rounded-r bg-secondary2 cursor-pointer"
                      >
                        <IconSm icon={plusIcon} alt="minus-icon" />
                      </div>
                    </div>

                    {/* add to cart */}
                    <SmallButton
                      text="buy now"
                      onClick={() => {
                        console.log("add to cart and then go to cart");
                      }}
                    />

                    {/* add to wishlist */}
                    <div className="flex items-center justify-center w-11 h-11 common-border">
                      <Icon icon={wishlistIcon} alt="wishlist-icon" />
                    </div>
                  </div>

                  {/* free & return delivery */}
                  <div className="flex flex-col w-full h-44 common-border">
                    {/* free */}
                    <div className="flex items-center flex-1 px-4 border-b border-black/25">
                      <div className="flex items-center gap-2">
                        <img
                          src={deliveryIcon}
                          alt="delivery-icon"
                          className={`w-10 h-10 icon-black`}
                        />
                        <div className="flex flex-col justify-around gap-3 font-medium">
                          <span className="capitalize font-Poppins">
                            free delivery
                          </span>
                          <span className="text-xs font-medium font-Poppins underline">
                            Enter your postal code for Delivery Availability
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* return */}
                    <div className="flex items-center flex-1 px-4 border-t border-black/25 -mt-[1px]">
                      <div className="flex items-center gap-2">
                        <img
                          src={returnIcon}
                          alt="return-icon"
                          className={`w-10 h-10 icon-black`}
                        />
                        <div className="flex flex-col justify-around gap-3 font-medium">
                          <span className="capitalize font-Poppins">
                            return delivery
                          </span>
                          <span className="text-xs font-Poppins">
                            Free 30 Days Delivery Returns. Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* related item */}
      {isRelatedLoading ? (
        <div className="flex justify-center w-full">
          <RingLoading />
        </div>
      ) : isRelatedError ? (
        <SmallError />
      ) : (
        isRelatedSuccess && (
          <>
            <TitleHeader title="related item" />

            <div className="flex flex-wrap gap-8">
              {relatedData.data.ids.map((id) => (
                <ProductCard
                  key={id}
                  productId={id}
                  args={{
                    page: 1,
                    type: "category",
                    categoryId: productData.data.category._id,
                  }}
                />
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Product;
