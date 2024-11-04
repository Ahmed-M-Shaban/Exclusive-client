import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Icon from "./Icon";
import Badge from "./Badge";
import ProfileIcon from "./ProfileIcon";
import { cartIcon, wishlistIcon } from "../utils/constants";
import { useGetCartQuery } from "../features/cart/cartApiSlice";
import { useGetWishlistQuery } from "../features/wishlist/wishlistSlice";

const NavRightIcons = ({ userData }) => {
  let { data: cart } = useGetCartQuery("get-cart", { skip: !userData });
  let { data: wishlist } = useGetWishlistQuery("get-wishlist", {
    skip: !userData,
  });

  const [cartLength, setCartLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);

  useEffect(() => {
    if (cart) setCartLength(cart?.cartItems?.length || 0);

    if (wishlist) setWishlistLength(wishlist?.data?.length || 0);
  }, [cart, wishlist]);

  return (
    <div className="flex items-center gap-4">
      <Link to="/wishlist">
        <Badge count={wishlistLength}>
          <Icon icon={wishlistIcon} alt={"wishlist"} />
        </Badge>
      </Link>

      <Link to="/cart">
        <Badge count={cartLength}>
          <Icon icon={cartIcon} alt={"cart"} />
        </Badge>
      </Link>

      <ProfileIcon />
    </div>
  );
};

export default NavRightIcons;
