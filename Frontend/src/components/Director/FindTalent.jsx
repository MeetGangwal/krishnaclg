import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant"; // Import the endpoint
import Navbar from "../Shared/Navbar";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const Talent = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll(); // scroll position hook
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const backgroundImages = [
    "/DesignItems/ABG.jfif",
    "/DesignItems/POSTER.jfif",
    // "/DesignItems/cardbg4.jpg" // Add more backgrounds if needed
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
    const fetchActors = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/actors`);
        const actors = response.data.filter((actor) => actor.role === "Actor");
        setActors(actors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actors:", error);
        setError("Could not load actors.");
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

  const handleViewProfile = (actorId) => {
    navigate(`/actor/profile/${actorId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      className="relative min-h-screen bg-cover bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImages[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="px-10 gap-2 relative z-10">
        <Navbar />

        <div className="mx-20 text-2xl font-bold py-10">
          <h2 className="text-white">Talents on STARCONNECT</h2>
        </div>

        {/* Grid Layout for Actor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
          {actors.map((actor, index) => (
            <motion.div
              key={actor._id}
              className="relative text-white overflow-hidden rounded-xl "
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 bg-white/10   dark:bg-white/10 rounded-xl z-0 backdrop-blur-md shadow-xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                      opacity: 1,
                      scale: 1.03,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1,
                      transition: { duration: 0.2, delay: 0.1 },
                    }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 p-4 shadow-xl rounded-xl">
                <div className="flex justify-center">
                  <img
                    src={actor.profile?.profilePhoto || "default-profile.jpg"}
                    alt={actor.fullname}
                    className="w-32 h-32 object-cover rounded-full mt-5 shadow-[0_0_100px_rgba(255,255,255,0.3)]"
                  />
                </div>
                <CardContent className="text-center">
                  <CardTitle className="text-xl font-semibold pt-2">
                    {actor.fullname}
                  </CardTitle>
                  <CardDescription className="text-white mt-2">
                    {actor.profile?.skills?.join(", ") || "No skills listed"}
                  </CardDescription>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewProfile(actor._id)}
                    className="mt-4 px-6 py-2 bg-[#48cfcb8e] text-white font-semibold rounded-full hover:bg-[#9173f591] transition"
                  >
                    View Profile
                  </motion.button>
                </CardContent>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Talent;
