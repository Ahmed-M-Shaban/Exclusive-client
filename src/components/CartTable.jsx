import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Button from "./Button";
import ProductTableCard from "./ProductTableCard";
import { useClearCartMutation } from "../features/cart/cartApiSlice";

const CartTable = ({ products }) => {
  const [clearCart] = useClearCartMutation();

  const handleClearCart = async () => {
    try {
      await toast.promise(clearCart().unwrap(), {
        pending: "Working on you request...",
        success: "Cart cleared successfully",
        error: {
          render({ data }) {
            return data.data.message;
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-6">
      {/* table section */}
      <table className="flex flex-col w-full gap-10">
        {/* table header */}
        <thead className="block capitalize px-10 py-6 text-text2 shadow-5 rounded">
          <tr className="flex w-full items-center justify-between">
            <th className="flex-1 text-start font-normal">product</th>
            <th className="flex-1 font-normal">price</th>
            <th className="flex-1 font-normal">quantity</th>
            <th className="flex-1 text-end font-normal">subtotal</th>
          </tr>
        </thead>

        <tbody className="flex flex-col gap-10">
          {products.map((product) => (
            <ProductTableCard
              key={product._id}
              product={product}
              cartItems={products}
            />
          ))}
        </tbody>
      </table>

      {/* buttons section */}
      <div className="flex justify-between">
        <Link to="/products">
          <Button
            text="return to shop"
            className="text-text2 common-border bg-transparent hover:bg-transparent"
            onClick={() => {
              console.log("return to shop");
            }}
          />
        </Link>

        <Button
          text="clear cart"
          className="text-text2 common-border bg-transparent hover:bg-transparent"
          onClick={handleClearCart}
        />
      </div>
    </div>
  );
};

export default CartTable;
