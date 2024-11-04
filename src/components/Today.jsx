import { useNavigate } from "react-router-dom";

import Button from "./Button";
import SmallError from "./SmallError";
import TitleHeader from "./TitleHeader";
import ProductCard from "./ProductCard";
import { handleScroll } from "../utils";
import RingLoading from "./RingLoading";
import FeaturesTitle from "./FeaturesTitle";
import { useGetProductsQuery } from "../features/product/productSlice";

const Today = () => {
  const navigate = useNavigate();
  const args = { deals: true, type: "deals" };
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
      <div id="flash-products" className="flex gap-8 overflow-x-scroll mb-12">
        {data.data.ids.slice(0, 8).map((id) => (
          <ProductCard key={id} productId={id} args={args} />
        ))}
      </div>
    );
  }

  return (
    <section className="mb-8">
      <TitleHeader title="today's" />

      <FeaturesTitle
        title="flash sales"
        onClickLeft={() => handleScroll("#flash-products", 302, "left")}
        onClickRight={() => handleScroll("#flash-products", 302, "right")}
      />

      {content}

      <div className="text-center">
        <Button
          text="view all products"
          onClick={() => navigate("/products/deals")}
        />
      </div>
    </section>
  );
};

export default Today;
