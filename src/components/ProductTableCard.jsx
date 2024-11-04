import { toast } from "react-toastify";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import Icon from "./Icon";
import Money from "./Money";
import { deleteIcon } from "../utils/constants";
import {
  useChangeQuantityMutation,
  useRemoveFromCartMutation,
} from "../features/cart/cartApiSlice";

const ProductTableCard = ({ product, cartItems }) => {
  const [changeQuantity] = useChangeQuantityMutation();
  const [removeProduct] = useRemoveFromCartMutation();

  const allowIncrease = (cartItems) => {
    let allQuantities = 0;
    cartItems.map(
      (p) =>
        p.product._id === product.product._id &&
        (allQuantities += Number(p.quantity))
    );

    if (product.product.quantity - allQuantities > 0) {
      return true;
    } else {
      toast.info(`This product only has ${product.product.quantity} items.`);
      return false;
    }
  };

  const handleClick = async (type) => {
    let quantity;

    switch (type) {
      case "increment":
        if (allowIncrease(cartItems)) {
          quantity = product.quantity + 1;
        } else return;
        break;

      case "decrement":
        quantity =
          product.quantity - 1 >= 1 ? product.quantity - 1 : product.quantity;
        break;

      default:
        break;
    }

    await changeQuantity({ productId: product._id, quantity });
  };

  const handleDelete = async () => {
    await removeProduct(product._id);
  };

  return (
    <tr className="relative flex w-full items-center justify-between px-10 py-6 rounded shadow-5">
      {/* image & title */}
      <td className="flex-1 max-w-[25%]">
        <div className="flex items-center gap-4">
          <img
            src={product.product.imageCover}
            alt="product-img"
            className="w-14 h-14 object-contain"
          />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {product.product.title}
          </span>
        </div>
      </td>

      {/* price */}
      <td className="flex-1 text-center">
        <Money
          money={product.product.priceAfterDiscount || product.product.price}
        />
      </td>

      {/* quantity */}
      <td className="flex-1 flex justify-center">
        <div className="flex items-center gap-4 border w-fit px-4 py-2 rounded">
          <span className="w-6 h-6">{product.quantity}</span>
          <div className="flex flex-col items-center justify-between gap-1">
            <ExpandLess
              fontSize="16"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("increment")}
            />
            <ExpandMore
              fontSize="16"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("decrement")}
            />
          </div>
        </div>
      </td>

      {/* subtotal */}
      <td className="flex-1 text-end">
        <Money money={product.price} />
      </td>

      {/* delete button */}
      <td
        className="absolute -top-4 -right-4 p-2 bg-secondary rounded-full cursor-pointer"
        onClick={handleDelete}
      >
        <Icon icon={deleteIcon} />
      </td>
    </tr>
  );
};

export default ProductTableCard;
