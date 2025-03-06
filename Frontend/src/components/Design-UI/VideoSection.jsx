import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { ChevronLeft, ChevronRight } from "lucide-react"; // Lucide icons

const videos = [
  {
    title: "Video 1",
    url: "your-video-url-1.mp4",
  },
  {
    title: "Video 2",
    url: "your-video-url-2.mp4",
  },
  {
    title: "Video 3",
    url: "your-video-url-3.mp4",
  },
  // Add more videos as needed
];

const VideoSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const navigate = useNavigate();

  // Button to navigate to Find Directors page
  const handleNavigate = () => {
    navigate("/FindDirector");
  };

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
    <div className="flex justify-center items-center min-h-screen transition-all bg-inherit">
      <div className="max-w-3xl w-full p-6 md:p-8 bg-gray-950 shadow-lg rounded-2xl border border-white-700 text-white font-semibold relative transition-opacity duration-1000">
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
              className="flex justify-center items-center absolute left-0 z-10 bg-transparent"
            >
              <ChevronLeft size={24} />
            </Button>

            {/* Video player */}
            <div className="w-full max-w-[700px]">
              <h3 className="text-2xl font-semibold text-gray-200">
                {videos[currentVideoIndex].title}
              </h3>
              <video width="100%" controls>
                <source
                  src={videos[currentVideoIndex].url}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={handleNext}
              className="flex justify-center items-center absolute right-0 z-10 bg-transparent"
            >
              <ChevronRight size={24} />
            </Button>

            {/* Dots for video index */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
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

          {/* Navigation Button */}
          {/* <button
            onClick={handleNavigate}
            className="mt-6 px-6 py-3 bg-[#6A38C2] hover:bg-[#9365E5] text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md"
          >
            View Directors
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
