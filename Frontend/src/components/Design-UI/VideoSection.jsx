import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { ChevronLeft, ChevronRight } from "lucide-react"; // Lucide icons

const videos = [
  {
    title: "TIPS ON ACTING | McConaughey Takes",
    url: "https://www.youtube.com/embed/fWIB_Iymgg0",
  },
  {
    title: "HOW TO PRODUCE REAL EMOTION ",
    url: "https://www.youtube.com/embed/A-PDoo2BXLQ",
  },
  {
    title: "Bryan Cranston’s Advice To Aspiring Actors ",
    url: "https://www.youtube.com/embed/iC5Ef7smWKs",
  },
];

const VideoSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const navigate = useNavigate();

  // Handle the next video
  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  // Handle the previous video
  const handlePrev = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen transition-all ">
      <div className="max-w-5xl w-full p-6 md:p-8 bg-gray-900 shadow-lg rounded-2xl border border-gray-700 text-white mt-44 font-semibold relative">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Enjoy These Videos!</h2>
          <p className="mt-3 text-lg text-gray-300">
            Here are some amazing videos for you to watch.
          </p>

          {/* Video player section */}
          <div className="relative mt-6 flex justify-center items-center">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={handlePrev}
              className="absolute left-0 z-10 bg-transparent"
              disabled={currentVideoIndex === 0}
            >
              <ChevronLeft size={24} />
            </Button>

            {/* YouTube Iframe Player */}
            <div className="w-full max-w-4xl">
              <h3 className="text-2xl font-semibold text-gray-200 mb-3">
                {videos[currentVideoIndex].title}
              </h3>
              <iframe
                width="100%"
                height="400"
                src={videos[currentVideoIndex].url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={handleNext}
              className="absolute right-0 z-10 bg-transparent"
              disabled={currentVideoIndex === videos.length - 1}
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          {/* Video Indicators */}
          <div className="mt-4 flex justify-center space-x-2">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentVideoIndex === index
                    ? "bg-blue-500"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
