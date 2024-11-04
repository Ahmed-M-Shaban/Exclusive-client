import { Link } from "react-router-dom";

import { handleScroll } from "../utils";
import TitleHeader from "./TitleHeader";
import CategoryCard from "./CategoryCard";
import FeaturesTitle from "./FeaturesTitle";
import { useGetCategoriesQuery } from "../features/category/categorySlice";
import RingLoading from "./RingLoading";
import SmallError from "./SmallError";

const Categories = () => {
  const { data, isLoading, isSuccess, isError } =
    useGetCategoriesQuery("category-list");

  let content;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-full">
        <RingLoading />
      </div>
    );
  } else if (isError) {
    content = <SmallError />;
  } else if (isSuccess) {
    content = (
      <div id="categories" className="flex gap-8 overflow-x-scroll">
        {data.data.map((category) => (
          <Link key={category._id} to={`/products/category/${category._id}`}>
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section className="">
      <TitleHeader title="categories" />

      <FeaturesTitle
        title="browse by category"
        onClickLeft={() => handleScroll("#categories", 202, "left")}
        onClickRight={() => handleScroll("#categories", 202, "right")}
      />

      {content}
    </section>
  );
};

export default Categories;
