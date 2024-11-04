import gsap from "gsap";

import IconLg from "./IconLg";

const CategoryCard = ({ category }) => {
  const animateCard = (card, backgroundColor, textColor) =>
    gsap.to(card, {
      duration: 0.3,
      backgroundColor,
      color: textColor,
      ease: "slow.inOut",
    });

  const animateSvg = (svg, filterValue, scale) =>
    gsap.to(svg, {
      duration: 0.5,
      scale,
      filter: filterValue,
      ease: "slow.inOut",
    });

  const handleMouseEvent = (event) => {
    const card = event.currentTarget;
    const svg = card.querySelector("img");

    const isHovering = event.type === "mouseenter";
    const backgroundColor = isHovering ? "#DB4444" : "#FFFFFF";
    const textColor = isHovering ? "#FFFFFF" : "black";
    const scale = isHovering ? 1.25 : 1;
    const svgFilter = isHovering
      ? "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(241deg) brightness(103%) contrast(103%)"
      : "brightness(0) saturate(100%) invert(0%) sepia(1%) saturate(8%) hue-rotate(159deg) brightness(109%) contrast(100%)";

    animateCard(card, backgroundColor, textColor);
    animateSvg(svg, svgFilter, scale);
  };

  return (
    <div
      className="w-[170px] h-[145px] rounded border border-gray-300 flex flex-col items-center justify-center shrink-0 gap-3 cursor-pointer"
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      <IconLg icon={category.image} iconClass="icon-black" />
      <p className="capitalize text-sm font-Poppins">{category.name}</p>
    </div>
  );
};

export default CategoryCard;
