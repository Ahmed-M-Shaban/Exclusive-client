import { searchIcon } from "../utils/constants";

const SeacrchBox = ({ className }) => {
  return (
    <div
      className={`${className} items-center gap-2 bg-secondary rounded-[4px] py-2 pl-5 pr-3`}
    >
      <input
        type="text"
        placeholder="What are you looking for?"
        className="h-full w-full text-xs border-none outline-none bg-transparent text-text2"
      />
      <img src={searchIcon} alt="search" className="w-6 h-6" />
    </div>
  );
};

export default SeacrchBox;
