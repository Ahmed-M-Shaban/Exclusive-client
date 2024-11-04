import { format } from "money-formatter";

const MoneyLg = ({ money, prev }) => {
  const currency = "LE";
  const price = format(currency, money);

  return prev ? (
    <del className={"font-medium font-Poppins text-xl text-text1"}>{price}</del>
  ) : (
    <span className="font-medium font-Poppins text-2xl text-text2">
      {price}
    </span>
  );
};

export default MoneyLg;
