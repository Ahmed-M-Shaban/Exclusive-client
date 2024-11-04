import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import Loading from "../../components/Loading";
import Money from "../../components/Money";
import Button from "../../components/Button";
import Roadmap from "../../components/Roadmap";
import CartTable from "../../components/CartTable";
import { useApplyCouponMutation, useGetCartQuery } from "./cartApiSlice";

const Cart = () => {
  const couponRef = useRef(null);

  const { data: cart, isLoading } = useGetCartQuery("get-cart");
  const [applyCoupon] = useApplyCouponMutation();

  useEffect(() => {
    if (cart?.coupon?.name && cart?.cartItems?.length)
      couponRef.current.value = cart?.coupon.name;
  }, [cart]);

  const handleCouponClick = async () => {
    const couponCode = couponRef.current.value;
    if (couponCode && couponCode !== cart?.coupon?.name)
      await applyCoupon({ coupon: couponCode });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="common-margin py-20 flex flex-col gap-20">
      <Roadmap road={["home", "cart"]} />

      {!cart?.cartItems?.length ? (
        <div className="flex flex-col items-center justify-center h-[40vh] gap-8">
          <span className="text-opacity-black text-4xl capitalize">
            your cart is empty
          </span>

          <Link to="/products">
            <Button text="continue shopping" />
          </Link>
        </div>
      ) : (
        <>
          <CartTable products={cart?.cartItems} />

          {/* cart money and coupon */}
          <div className="flex flex-row-reverse items-start justify-between">
            {/* money section */}
            <div className="w-[470px] min-h-[324px] border-[1.5px] border-text2 rounded px-6 py-8">
              <div className="flex flex-col h-full justify-between gap-4 capitalize">
                <span className="text-xl font-medium">cart total</span>

                {/* money info */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-4 border-b border-text2/40">
                    <span>subtotal:</span>
                    <span>
                      <Money money={cart?.totalCartPrice} />
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-text2/40">
                    <span>shipping:</span>
                    <span>free</span>
                  </div>

                  {cart?.totalPriceAfterDiscount && (
                    <div className="flex items-center justify-between pb-4 border-b border-text2/40">
                      <span>
                        coupon discount:{" "}
                        {cart?.coupon && `(${cart.coupon.discount}%)`}
                      </span>
                      <Money
                        money={
                          cart?.totalPriceAfterDiscount - cart?.totalCartPrice
                        }
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span>total:</span>
                    <Money
                      money={
                        cart?.totalPriceAfterDiscount
                          ? cart?.totalPriceAfterDiscount
                          : cart?.totalCartPrice
                      }
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Link to="/checkout">
                    <Button
                      text="process to checkout"
                      className=" w-fit"
                      onClick={() => {
                        console.log("process to checkout");
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* coupon section */}
            <div className="flex h-14 gap-4">
              {/* coupon input */}
              <input
                type="text"
                ref={couponRef}
                placeholder="Coupon Code"
                className="w-[300px] h-full px-4 py-2 common-border focus:outline-none focus:border-hover-button"
              />

              <Button
                text="apply coupon"
                className="w-fit"
                onClick={handleCouponClick}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
