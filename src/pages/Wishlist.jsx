import { useEffect } from "react";

import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const data = useAuth();
  const wishlistProducts = data.wishlist;

  useEffect(() => {
    const wishlistBtn = document.querySelector("#wishlist-btn");

    if (!wishlistProducts.length) {
      wishlistBtn.disabled = true;
    } else {
      wishlistBtn.disabled = false;
    }
  }, [wishlistProducts.length]);

  return (
    <div className="flex flex-col common-margin py-20 gap-20">
      <div className="flex flex-col gap-14">
        <div className="flex items-center justify-between">
          <span className="text-xl">Wishlist ({wishlistProducts.length})</span>

          <Button
            id="wishlist-btn"
            text="move all to bag"
            onClick={() => {
              console.log("first");
            }}
            className={`bg-transparent text-text2 border-text2/50 border hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50`}
          />
        </div>

        {wishlistProducts.length ? (
          <div className="flex gap-8 flex-wrap">
            {wishlistProducts.map((id) => (
              <ProductCard
                key={id}
                productId={id}
                rightIconsType="delete"
                args={{ type: "wishlist", page: 1 }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[40vh] text-opacity-black text-3xl capitalize">
            empty wishlist
          </div>
        )}
      </div>

      {/* <div>recommendations</div> */}
    </div>
  );
};

export default Wishlist;
