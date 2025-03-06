import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/Redux/JobSlice";
import ImagesSliderDemo from "@/components/Design-UI/ImagesSliderDemo";
import CategoryCarousel from "./CategoryCarousel";
import Navbar from "@/components/Shared/Navbar";

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
        className="absolute inset-0 bg-black w- h-full z-10"
        style={{ pointerEvents: "none" }}
      >
        
        <ImagesSliderDemo />
      </div>


      {/* Hero Section Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-30 text-center px-4 pointer-events-auto">
        <h1 className="text-5xl font-bold text-Blue  text-shadow-white">
          Search, Apply & <br /> Get Your <span className="text-Beige">Dream Role</span>
        </h1>
        <h2 className="font-medium text-white mt-4">
          The stage is set, and the spotlight is yours. 🌟
        </h2>

        {/* Search Bar */}
        <div className="flex text-white w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mt-6">
          <input
            type="text"
            placeholder="Find your DREAM Role"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full bg-inherit"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[var(--purple-col)]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Category Carousel */}
        <div className="py-10">
          <CategoryCarousel />
        </div>
      </div>
    </div>
  );
};


export default HeroSection;


