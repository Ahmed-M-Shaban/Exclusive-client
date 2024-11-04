import IconSm from "../components/IconSm";
import { arrowLeftIcon } from "../utils/constants";

const FeaturesTitle = ({ title, onClickLeft, onClickRight }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="capitalize text-text2 text-3xl font-bold tracking-widest">
        {title}
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center bg-secondary w-12 h-12 rounded-full cursor-pointer"
          onClick={onClickLeft}
        >
          <IconSm icon={arrowLeftIcon} alt="arrow-left" />
        </div>

        <div
          className="flex items-center justify-center bg-secondary w-12 h-12 rounded-full cursor-pointer rotate-180"
          onClick={onClickRight}
        >
          <IconSm icon={arrowLeftIcon} alt="arrow-right" />
        </div>
      </div>
    </div>
  );
};

export default FeaturesTitle;
