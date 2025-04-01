import React, { lazy, Suspense, useEffect, useState } from "react";
import Footer from "@/components/Shared/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion, useScroll } from "framer-motion";
import HeroScrollDemo from "./Design-UI/HeroScrollDemo";

const HeroSection = lazy(() => import("./Actor/HeroSection"));
const LatestJobs = lazy(() => import("./Actor/LatestJobs"));
const InfiniteMovingCardsDemo = lazy(() =>
  import("./Design-UI/InfiniteMovingCardsDemo")
);
const VideoSection = lazy(() => import("./Design-UI/VideoSection"));
const ScrollingTips = lazy(() => import("./Design-UI/ScrollingTips"));


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const backgroundImages = [
    "/Images/image1.jpg",
    "/Images/img17.jpg",
    "/Images/img13.jpg",
    "/Images/img2.jpg",
    "/Images/imgg6.jpg",
    "/Images/crew.jpg",
    "/Images/img16.jpg",
   
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((progress) => {
      const index = Math.min(
        Math.floor(progress * backgroundImages.length),
        backgroundImages.length - 1
      );
      setBgIndex(index);
    });
  }, [scrollYProgress]);
  useEffect(() => {
    const imagePromises = backgroundImages.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        })
    );
  
    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);  // All images are loaded
    });
  }, [backgroundImages]);
  if (!imagesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section without background change */}
      <div className=" z-10">
        <Suspense
          fallback={<div className="text-center text-white">Loading...</div>}
        >
          <HeroSection />
        </Suspense>
      </div>

      {/* Background transition with opacity effect */}
      <motion.div
        className="relative min-h-screen bg-cover bg-black bg-fixed "
        style={{
          backgroundImage: `url(${backgroundImages[bgIndex]})`,
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        {/* Overlay for opacity effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content above background */}
        <div className="relative z-10">
          <Suspense
            fallback={<div className="text-center text-white">Loading...</div>}
          >
            
            <VideoSection />
            <HeroScrollDemo />
            <InfiniteMovingCardsDemo />
            <LatestJobs />
            <ScrollingTips />
            {/* <DailyActingChallenge /> */}
            
          </Suspense>
          <Footer />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
