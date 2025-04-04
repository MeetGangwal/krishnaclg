import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx"; // Use clsx for conditional classNames

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []); // Run once on mount

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setAnimationProperties();
      setStart(true);
    }
  };

  const setAnimationProperties = () => {
    if (containerRef.current) {
      // Direction control
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );

      // Speed control
      let duration;
      if (speed === "fast") duration = "20s";
      else if (speed === "normal") duration = "40s";
      else duration = "80s";

      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        "scroller relative max-w-7xl overflow-hidden mt-5 -mb-4",
        "mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={clsx(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[450px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-white px-10 py-8 md:w-[500px]"
          >
            {/* Background image with opacity overlay */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,  // Apply opacity only to the background image
                zIndex: -1,  // Ensure background stays behind the text
                filter: "sepia(0.5) brightness(0.8) contrast(1.5)",  // Vintage effect

              }}
            />
            <blockquote>
              <span className="relative z-20 text-l text-center leading-[1.6] text-white font-bold">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-50 font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-gray-200 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
