import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/Redux/JobSlice";
import ImagesSliderDemo from "@/components/Design-UI/ImagesSliderDemo";
import Navbar from "@/components/Shared/Navbar";
import DirectorMarquee from "./DirectorMarquee";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className=" w-full h-screen">
      {/* Background Image Slider with inline pointer-events style */}
      {/* Navbar included within HeroSection so it shares the background */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-auto">
        <Navbar />
      </div>
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{ pointerEvents: "none" }}
      >
        <ImagesSliderDemo />
      </div>

      {/* Hero Section Content */}
      {/* <div className="absolute inset-0 flex flex-col justify-center items-center z-30 text-center px-4 pointer-events-auto ">
        <h1 className="text-7xl font-bold text-Blue  text-shadow-white">
        Discover, Hire & <br /> Cast The <span className="text-Beige">Perfect Talent</span>
        </h1> */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-30 text-center px-4 pointer-events-auto ">
        <h1 className="text-7xl font-bold text-Blue  text-shadow-white">
        Your Vision, Your Cast <br /><span className="text-Beige">Your Masterpiece</span>
        </h1>
        <h2 className="font-medium text-white mt-4 ">
        Discover and hire top-tier talent to bring your vision to life
        </h2>
        {/* <DirectorMarquee /> */}
        

        {/* Post auditions, manage applications, and discover the best actors for your projects—all in one place. */}
      </div>
    </div>
  );
};

export default HeroSection;
