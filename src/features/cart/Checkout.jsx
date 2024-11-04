import React, { useState } from "react";
import Roadmap from "../../components/Roadmap";
import AddressInput from "../../components/AddressInput";
import Money from "../../components/Money";
import Button from "../../components/Button";

const Checkout = () => {
  const cashText = "cash";
  const bankText = "bank";
  const [saveInfo, setSaveInfo] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(cashText);

  const handleCouponSubmit = () => {
    console.log("couponSubmit");
  };

  const handleSubmit = () => {
    console.log(paymentMethod);
  };

  return (
    <div className="common-margin py-20 flex flex-col gap-20">
      <Roadmap road={["home", "cart", "checkout"]} />
      {/* <Roadmap
        road={["account", "my account", "product", "view cart", "checkout"]}
      /> */}

      <h1 className="capitalize text-4xl font-medium">billing details</h1>

      <div className="flex justify-between -mt-8">
        {/* shipping info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-8">
            <AddressInput label="first name" required />
            <AddressInput label="company name" />
            <AddressInput label="street address" required />
            <AddressInput label="apartment, floor, etc. (optional)" />
            <AddressInput label="town/city" required />
            <AddressInput label="phone number" required />
            <AddressInput label="email address" required />
          </div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="save-address"
              className="w-6 h-6 checked:accent-secondary2"
              checked={saveInfo}
              onChange={() => setSaveInfo(true)}
            />
            <label htmlFor="save-address">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        {/* order info */}
        <div className="flex flex-col gap-8 mt-6">
          {/* money info */}
          <div className="flex flex-col gap-4 w-[422px]">
            <div className="flex items-center justify-between pb-4 border-b border-text2/40">
              <span>subtotal:</span>
              <span>
                <Money money={120} />
              </span>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-text2/40">
              <span>shipping:</span>
              <span>free</span>
            </div>

            <div className="flex items-center justify-between">
              <span>total:</span>
              <Money money={120} />
            </div>
          </div>

          {/* place order */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col justify-between gap-4"
          >
            {/* bank radio */}
            <div className="flex items-center gap-4">
              <input
                id="bank"
                name="paymentMethod"
                type="radio"
                onClick={() => setPaymentMethod(bankText)}
                className="w-6 h-6 accent-button"
              />
              <label htmlFor="bank">Bank</label>
            </div>

            {/* cash radio */}
            <div className="flex items-center gap-4">
              <input
                id="cash"
                name="paymentMethod"
                type="radio"
                defaultChecked
                onClick={() => setPaymentMethod(cashText)}
                className="w-6 h-6 accent-button"
              />
              <label htmlFor="cash">Cash on delivery</label>
            </div>

            {/* coupon input */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                className="px-6 w-[19rem] h-14 common-border outline-none focus:border-secondary2"
              />
              <Button text="apply coupon" onClick={handleCouponSubmit} />
            </div>

            {/* submit button */}
            <Button
              text="place order"
              className="w-fit"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
