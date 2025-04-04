import React from "react";
import InfiniteMovingCards from "@/components/ui/infinite-moving-cards"; // Import your InfiniteMovingCards component

const InfiniteMovingCardsDemo = () => {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-t dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  );
};

// Updated testimonial list for STARCONNECT with acting-related quotes
const testimonials = [
  {
    quote: "Acting is not about being famous, it’s about exploring the human soul. 🎭",
    name: "Natalie Portman",
    title: "Academy Award-Winning Actress",
    imageUrl:"/Actors/NataliePortman.jfif"
  },
  {
    quote: "The best acting is instinctive. It's not intellectual, it's not mechanical, it's instinctive. 🏆",
    name: "Marlon Brando",
    title: "Legendary Actor",
    imageUrl:"/Actors/MarlonBrando.jpg"
  },
  {
    quote: "Dreams are not the things you see in sleep, dreams are things which do not let you sleep. 🌟",
    name: "Shah Rukh Khan",
    title: "Bollywood Superstar",
    imageUrl:"/Actors/Shahrukh.jfif"
  },
  {
    quote: "Work hard in silence, let success make the noise. 🎬",
    name: "Ranbir Kapoor",
    title: "Indian Actor",
    imageUrl:"/Actors/Ranbir.jpg"
  },
  {
    quote: "A director is the captain of the ship, but an actor is its soul. 🚢",
    name: "Christopher Nolan",
    title: "Hollywood Director",
    imageUrl:"/Actors/christophernolan.jpg"
  },
];

export default InfiniteMovingCardsDemo;
