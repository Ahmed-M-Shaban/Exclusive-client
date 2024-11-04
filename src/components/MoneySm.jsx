import { format } from "money-formatter";

const SmallMoney = ({ money, prev }) => {
  const currency = "LE";
  const price = format(currency, money);

  return prev ? (
    <del className="font-medium font-Poppins text-[13px] text-text1">
      {price}
    </del>
  ) : (
    <span className={"font-medium font-Poppins text-sm text-secondary2"}>
      {price}
    </span>
  );
};

export default SmallMoney;
