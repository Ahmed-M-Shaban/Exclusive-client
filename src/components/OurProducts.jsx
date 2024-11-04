import { useNavigate } from "react-router-dom";

import Button from "./Button";
import SmallError from "./SmallError";
import TitleHeader from "./TitleHeader";
import { handleScroll } from "../utils";
import ProductCard from "./ProductCard";
import RingLoading from "./RingLoading";
import FeaturesTitle from "./FeaturesTitle";
import { useGetProductsQuery } from "../features/product/productSlice";

const ThisMonth = () => {
  const navigate = useNavigate();
  const args = { type: "all" };
  const { data, isLoading, isSuccess, isError } = useGetProductsQuery(args);

  let content;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-full">
        <RingLoading />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="mb-8">
        <SmallError />
      </div>
    );
  } else if (isSuccess) {
    const ids = data.data.ids.slice(0, 10);

    content = (
      <div id="our-products" className="overflow-x-scroll">
        {ids.length / 2 >= 4 ? (
          <>
            <div className="flex gap-8 mb-12">
              {ids.map(
                (id, i) =>
                  i % 2 === 0 && (
                    <ProductCard key={id} productId={id} args={args} />
                  )
              )}
            </div>

            <div className="flex gap-8 mb-12">
              {ids.map(
                (id, i) =>
                  !(i % 2 === 0) && (
                    <ProductCard key={id} productId={id} args={args} />
                  )
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-8 mb-12">
            {ids.map((id) => (
              <ProductCard key={id} productId={id} args={args} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="my-24">
      <TitleHeader title="our products" />

      <FeaturesTitle
        title="explore our products"
        onClickLeft={() => handleScroll("#our-products", 302, "left")}
        onClickRight={() => handleScroll("#our-products", 302, "right")}
      />

      {content}

      <div className="text-center">
        <Button
          text="view all products"
          onClick={() => navigate("/products")}
        />
      </div>
    </section>
  );
};

export default ThisMonth;
