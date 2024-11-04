import { useEffect, useMemo, useState } from "react";

import Roadmap from "../components/Roadmap";
import Loading from "../components/Loading";
import SmallError from "../components/SmallError";
import ProductCard from "../components/ProductCard";
import RingLoading from "../components/RingLoading";
import { useGetProductsQuery } from "../features/product/productSlice";
import { useParams } from "react-router-dom";

/**
 * @typedef {Object} ProductListProps
 * @property {'category' | 'all' | 'deals' | 'bestsellers'} [type] - Types of the products that will be appear, is it from specific category or all products.
 */
/**
 * ProductList component renders a product card list with some details.
 * @param {ProductListProps} props - The props for the ProductList component.
 * @returns {JSX.Element}
 */

const ProductList = ({ type = "all" }) => {
  const categoryId = useParams()?.id;
  const [page, setPage] = useState(1);

  const arg = useMemo(() => {
    switch (type) {
      case "all":
        return { page, type };

      case "deals":
        return { page, type };

      case "bestsellers":
        return { page, type };

      case "category":
        return { page, type, categoryId };

      default:
        return {};
    }
  }, [categoryId, page, type]);

  const { data, isFetching, isLoading, isSuccess, isError } =
    useGetProductsQuery(arg);

  // handle infinite scrolling
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      const {
        paginationResult: { numberOfPages, currentPage },
      } = data;

      if (scrolledToBottom && !isFetching && numberOfPages > currentPage) {
        setPage(page + 1);
      }
    };

    if (data) document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
    // }, [page, hasMore, isFetching]);
  }, [isFetching, page, data]);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <SmallError />;
  } else if (isSuccess) {
    content = (
      <div className="flex flex-wrap gap-8 min-h-[50vh]">
        {data.data.ids.map((id) => (
          <ProductCard key={id} productId={id} args={arg} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20 common-margin py-20">
      <Roadmap road={["home", "products"]} />

      {content}

      {isFetching && data && (
        <div className="">
          <RingLoading />
        </div>
      )}
    </div>
  );
};

export default ProductList;
