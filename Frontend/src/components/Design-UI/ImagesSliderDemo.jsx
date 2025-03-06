import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";

export function ImagesSliderDemo() {
  const images = [
    "/Images/theater.jpg",//done
    "/Images/shooting.jpg",//done
    "/Images/img3.jpg",
    "/Images/imggg1.jpg",
    "/Images/img14.jpg",//done
    "/Images/flimset.jpg",//done
    "/Images/imggg.jpg",
    "/Images/image6.jpg",


  ];

  return (
    
    // The pointer-events-none class on this container ensures that the background slider doesn’t capture clicks.
    <ImagesSlider
      className="absolute inset-0 h-full pointer-events-none bg-opacity-40" 
      images={images}
    >
      {/* The overlay content is wrapped with pointer-events-auto so it can capture clicks */}
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-50 flex flex-col justify-center items-center pointer-events-auto"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          {/* The hero section slideshow text can be added here if needed */}
        </motion.p>
        {/* You can add any interactive elements here, and they’ll be clickable */}
      </motion.div>
    </ImagesSlider>
  );
}

export default ImagesSliderDemo;
