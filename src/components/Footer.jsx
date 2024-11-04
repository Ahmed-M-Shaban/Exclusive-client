import {
  AppStoreIcon,
  facebookIcon,
  GooglePlayIcon,
  instegramIcon,
  linkedinIcon,
  QRCodeIcon,
  sendIcon,
  twitterIcon,
} from "../utils/constants";
import FooterItem from "./FooterItem";
import IconSm from "./IconSm";

const Footer = () => {
  const date = new Date();

  return (
    <div className="flex flex-col justify-between min-h-[440px] bg-button pb-2 gap-16">
      <div className="common-margin mt-20 flex flex-wrap justifybetween gap-y-12 text-text">
        <div className="flex flex-col gap-4 w-44 md:w-fit mx-auto">
          <h3 className="text-2xl font-bold">Exclusive</h3>
          <span className="text-lg font-medium block">Subscribe</span>
          <span className="block">Get 10% off your first order</span>
          <div className="flex items-center border-white border-2 rounded-md h-12 md:px-4 px-2 w-fit">
            <input
              type="text"
              placeholder="Enter your email"
              className="h-full bg-transparent border-none outline-none text-text1 placeholder:text-text1 placeholder:text-sm w-28 md:w-36"
            />
            <img src={sendIcon} alt="send" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        <FooterItem
          header="account"
          items={["my account", "login / register", "cart", "wishlist", "shop"]}
        />

        <FooterItem
          header="support"
          items={[
            "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
            "exclusive@gmail.com",
            "+20-123-4567-890",
          ]}
        />

        <FooterItem
          header="quick link"
          items={["privacy policy", "terms of use", "FAQ", "contact"]}
        />

        <div className="flex flex-col mx-auto">
          <h3 className="text-xl font-semibold capitalize mb-4">
            download app
          </h3>
          <p className="text-text1 text-sm pb-2">
            Save $3 with App New User Only
          </p>

          <div className="flex gap-2 mb-8">
            <img src={QRCodeIcon} alt="" className="w-20 h-20" />
            <div className="flex flex-col">
              <img src={GooglePlayIcon} alt="" className="w-28 h-10" />
              <img src={AppStoreIcon} alt="" className="w-28 h-10" />
            </div>
          </div>

          <div className="flex justify-between">
            <IconSm icon={facebookIcon} alt="facebook" />
            <IconSm icon={twitterIcon} alt="facebook" />
            <IconSm icon={instegramIcon} alt="facebook" />
            <IconSm icon={linkedinIcon} alt="facebook" />
          </div>
        </div>
      </div>

      <div className="text-primary1 text-center">
        &copy; Copyright Rimel {date.getFullYear()}. All right reserved
      </div>
    </div>
  );
};

export default Footer;
