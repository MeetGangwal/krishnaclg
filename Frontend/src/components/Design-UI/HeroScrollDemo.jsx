import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";


export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-extrabold text-white dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                STAR CONNECT
              </span>
            </h1>
          </>
        }
      >
        <div className="relative flex items-center justify-center w-full min-h-full bg-gray-900 text-white mb-10">
          <div className="relative">

          <img src="/Images/ActorRoadmap.svg" alt="" className="" />
          {/* Blackboard only, no items */}
        
        {/* Floating GIF (Outside the board) */}
        <img
          src="/public/gif2.gif"
          alt="Acting GIF"
          className="fixed top-[-40px] right-[-90px]  w-48 animate-bounce "
        />
        <img
          src="/public/gif2.gif"
          alt="Acting GIF"
          className="fixed top-[-40px] left-[-90px]  w-32 md:w-40 lg:w-48 animate-bounce"
        /></div>
          </div>
      </ContainerScroll>
    </div>
  );
}

export default HeroScrollDemo;
