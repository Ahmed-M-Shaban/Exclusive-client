import Slider from "./Slider";
import { sliderImages } from "../utils/dummy";
import RingLoading from "./RingLoading";
import { useGetCategoriesQuery } from "../features/category/categorySlice";
import SmallError from "./SmallError";

const Hero = () => {
  const { data, isUninitialized, isLoading, isSuccess, isError } =
    useGetCategoriesQuery("category-list");

  let sidebarContent;
  if (isLoading || (isUninitialized && !data && !isError)) {
    sidebarContent = (
      <div className="flex items-center justify-center h-full">
        <RingLoading />
      </div>
    );
  } else if (isError) {
    sidebarContent = <SmallError />;
  } else if (isSuccess) {
    sidebarContent = data.data.map((item) => (
      <div key={item._id} className="flex items-center justify-between">
        <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-text2 capitalize font-Poppins cursor-pointer">
          {item.name}
        </span>
      </div>
    ));
  }

  return (
    <section className="flex items-end h-96 gap-14 mb-32">
      {/* left sidebar */}
      <div className="max-xl:hidden flex h-full pr-2 border-r-[0.5px] border-opacity-black">
        <div className="flex flex-col w-56 h-full pt-10 overflow-y-scroll gap-4">
          {sidebarContent}
        </div>
      </div>

      {/* image slider component */}
      <Slider images={sliderImages} />
    </section>
  );
};

export default Hero;
