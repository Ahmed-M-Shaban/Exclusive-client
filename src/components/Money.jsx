import { format } from "money-formatter";

const Money = ({ money }) => {
  const currency = "LE";
  const price = format(currency, money);

  return (
    <span className={"font-medium font-Poppins text-base text-text2"}>
      {price}
    </span>
  );
};

export default Money;
