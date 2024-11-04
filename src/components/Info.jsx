import React from "react";

import InfoItem from "./InfoItem";
import {
  customerSevicesIcon,
  deliveryIcon,
  secureIcon,
} from "../utils/constants";

const Info = () => {
  return (
    <div className="flex items-center justify-center flex-wrap flex-shrink gap-24 mb-28">
      <InfoItem
        title="free and fast delivery"
        body="Free delivery for all orders over LE 140"
        icon={deliveryIcon}
        alt="delivery-icon"
      />

      <InfoItem
        title="22/7 customer services"
        body="Friendly 22/7 customer support"
        icon={customerSevicesIcon}
        alt="customer-services-icon"
      />

      <InfoItem
        title="money back guarantee"
        body="We return money within 30 days"
        icon={secureIcon}
        alt="money-back-icon"
      />
    </div>
  );
};

export default Info;
