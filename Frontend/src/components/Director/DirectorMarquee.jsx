import Marquee from "react-fast-marquee";

const DirectorMarquee = () => {
  const taglines = [
    "The camera is rolling – Find your perfect cast today!",
    "Your vision. Your cast. Your masterpiece in the making!",
    "Great films start with great actors – Let’s find yours!",
    "From script to screen, build the dream cast effortlessly!",
    "The right talent makes all the difference – Start casting now!",
    "Direct your vision, cast your stars, and create magic!",
    "Your search for talent ends here – Lights, camera, action!",
    "Every role deserves the perfect actor – Let’s make it happen!",
    "Bringing directors and talent together – One role at a time!",
    "Your story is waiting – Find the stars who will bring it to life!",
  ];

  return (
    <div className="bg-transparent text-white py-2 max-w-7xl">
      <Marquee speed={50} gradient={false} pauseOnHover>
        {taglines.map((line, index) => (
          <span key={index} className="mx-5 text-4xl font-extrabold">
            {line} 🎬
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default DirectorMarquee;
