import { useNavigate } from "react-router-dom";

import Button from "./Button";
import SmallError from "./SmallError";
import { handleScroll } from "../utils";
import TitleHeader from "./TitleHeader";
import ProductCard from "./ProductCard";
import RingLoading from "./RingLoading";
import FeaturesTitle from "./FeaturesTitle";
import { useGetProductsQuery } from "../features/product/productSlice";

const ThisMonth = () => {
  const navigate = useNavigate();
  const args = { bestsellers: true, type: "bestsellers" };
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
    content = (
      <div id="best-selling" className="flex gap-8 overflow-x-scroll mb-12">
        {data.data.ids.slice(0, 8).map((id) => (
          <ProductCard key={id} productId={id} args={args} />
        ))}
      </div>
    );
  }

  return (
    <section className="">
      <TitleHeader title="this month" />

      <FeaturesTitle
        title="best selling products"
        onClickLeft={() => handleScroll("#best-selling", 302, "left")}
        onClickRight={() => handleScroll("#best-selling", 302, "right")}
      />

      {content}

      <div className="text-center">
        <Button
          text="view all"
          onClick={() => navigate("/products/bestsellers")}
        />
      </div>
    </section>
  );
};

export default ThisMonth;
