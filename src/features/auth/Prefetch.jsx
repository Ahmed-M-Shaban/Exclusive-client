import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import store from "../../app/store";
import useAuth from "../../hooks/useAuth";
import { cartApiSlice } from "../cart/cartApiSlice";
import { productSlice } from "../product/productSlice";
import { categorySlice } from "../category/categorySlice";
import { wishlistSlice } from "../wishlist/wishlistSlice";

const Prefetch = () => {
  const data = useAuth();

  useEffect(() => {
    if (data) {
      store.dispatch(
        cartApiSlice.util.prefetch("getCart", "get-cart", { force: true })
      );
      store.dispatch(
        wishlistSlice.util.prefetch("getWishlist", "get-wishlist", {
          force: true,
        })
      );
    }

    store.dispatch(
      categorySlice.util.prefetch("getCategories", "category-list", {
        force: true,
      })
    );
    store.dispatch(
      productSlice.util.prefetch(
        "getProducts",
        { type: "all", page: 1 },
        { force: true }
      )
    );
    store.dispatch(
      productSlice.util.prefetch(
        "getProducts",
        { type: "deals", deals: true },
        { force: true }
      )
    );
    store.dispatch(
      productSlice.util.prefetch(
        "getProducts",
        { type: "bestsellers", bestsellers: true },
        { force: true }
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default Prefetch;
