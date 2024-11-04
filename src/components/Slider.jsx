import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

import IconSm from "../components/IconSm";
import { arrowRightIcon } from "../utils/constants";

const Slider = ({ images }) => {
  const [imageId, setImageId] = useState(0);
  const delayCallRef = useRef(null);
  const dots = gsap.utils.toArray(".dot");
  const texts = gsap.utils.toArray(".texts");

  useGSAP(() => {
    gsap.to(".image", {
      transform: `translateX(${-100 * imageId}%)`,
      duration: 1.5,
      ease: "power4.inOut",

      onComplete: () => {
        delayCallRef.current = gsap.delayedCall(5, () => {
          setImageId((imageId + 1) % images.length);
        });
      },
    });

    if (texts.length)
      gsap.from(texts[imageId], {
        duration: 2,
        opacity: 0,
        y: 50,
        ease: "power4.inOut",
      });

    dots.forEach((dot, i) => {
      i === imageId
        ? gsap.to(dot, {
            duration: 0.9,
            backgroundColor: "#DB4444",
            border: "2px solid white",
            ease: "power4.inOut",
          })
        : gsap.to(dot, {
            duration: 0.9,
            backgroundColor: "#7D8184",
            border: "2px solid transparent",
            ease: "power4.inOut",
          });
    });

    return () => {
      delayCallRef.current?.kill();
    };
  }, [imageId]);

  const handleDotClick = (i) => {
    // Kill ongoing animations when the dot is clicked
    gsap.killTweensOf(".image");
    gsap.killTweensOf(".dot");
    delayCallRef.current?.kill();

    setImageId(i);
  };

  const handleDotMouseEnter = (e) => {
    gsap.to(e.target, {
      scale: 1.25,
      duration: 0.5,
    });
  };

  const handleDotMouseLeave = (e) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.5,
    });
  };

  return (
    <div className="bg-black relative w-full h-[344px] overflow-hidden">
      {/* image slider */}
      <div className="flex h-full">
        {images.map((image, i) => (
          // slide
          <div
            key={i}
            className="image flex justify-center w-full flex-shrink-0"
          >
            {/* image container */}
            <div className="relative w-[892px] h-full">
              {/* image */}
              <div className="slider-image">
                <img
                  src={image.image}
                  alt="slider-image"
                  className="relative w-full h-full object-contain"
                />
                <div className="absolute top-0 w-full h-full bg-light-radial blur-xl -z-10"></div>
              </div>

              {/* image info */}
              <div className="slider-image-info">
                <div className="flex flex-col gap-5 max-w-80 text-text">
                  <div className="flex items-center max-sm:justify-center gap-6">
                    <img
                      src={image.logo}
                      alt="logo"
                      className="w-10 h-12 object-contain"
                    />
                    <p>{image.title}</p>
                  </div>

                  <p className="text-5xl font-semibold leading-tight tracking-widest">
                    {image.body}
                  </p>

                  <Link to="/login">
                    <div className="flex items-center text-lg gap-4">
                      <span className="relative capitalize underline-slider-link">
                        shop now
                      </span>
                      <IconSm icon={arrowRightIcon} alt="arrow-right" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* nav dots */}
      <div className="flex gap-4 absolute w-fit bottom-3 right-0 left-0 mx-auto">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => handleDotClick(i)}
            onMouseEnter={handleDotMouseEnter}
            onMouseLeave={handleDotMouseLeave}
            className={`dot w-3.5 h-3.5 rounded-full cursor-pointer ${
              i === 0
                ? "bg-secondary2 border-2 border-text"
                : "bg-text1 border-2 border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
    // <div className="relative w-[892px]">
    //   {/* image slider */}
    //   <div className="flex h-[344px] overflow-hidden">
    //     {images.map((image, i) => (
    //       <div key={i} className="image relative flex-shrink-0 w-full bg-text2">
    //         <img
    //           src={image.image}
    //           alt="slider-image"
    //           className="slider-image"
    //         />

    //         <div className="slider-image-info">
    //           <div className="flex flex-col gap-5 max-w-80 text-text">
    //             <div className="flex items-center gap-6">
    //               <img
    //                 src={image.logo}
    //                 alt="logo"
    //                 className="w-10 h-12 object-contain"
    //               />
    //               <p>{image.title}</p>
    //             </div>

    //             <p className="text-5xl font-semibold leading-tight tracking-widest">
    //               {image.body}
    //             </p>

    //             <Link to="/login">
    //               <div className="flex items-center text-lg gap-4">
    //                 <span className="relative capitalize underline-slider-link">
    //                   shop now
    //                 </span>
    //                 <IconSm icon={arrowRightIcon} alt="arrow-right" />
    //               </div>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* nav dots */}
    //   <div className="flex gap-4 absolute w-fit bottom-3 right-0 left-0 mx-auto">
    //     {images.map((_, i) => (
    //       <span
    //         key={i}
    //         onClick={() => handleDotClick(i)}
    //         className={`dot w-3.5 h-3.5 rounded-full cursor-pointer ${
    //           i === 0
    //             ? "bg-secondary2 border-2 border-text"
    //             : "bg-text1 border-2 border-transparent"
    //         }`}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
};

export default Slider;
