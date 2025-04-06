import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import APactorProfile from "./APactorProfile ";

const APactor = ({ onClose }) => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedActorId, setSelectedActorId] = useState(null); // Track selected actor for profile view
  const { scrollYProgress } = useScroll();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/actors`);
        setActors(response.data);
      } catch (error) {
        console.error("Error fetching actors:", error);
        setError("Could not load actors.");
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

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
    <div className="relative min-h-screen bg-white">
      {selectedActorId ? (
        // Render APactorProfile if an actor is selected
        <div className="p-4">
          <button
            onClick={() => setSelectedActorId(null)} // Go back to APactors
            className="mb-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Back
          </button>
          <APactorProfile id={selectedActorId} /> {/* Pass id as prop */}
        </div>
      ) : (
        // Render APactors list
        <motion.div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Browse Actors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {actors.map((actor, index) => (
              <motion.div
                key={actor._id}
                className="relative text-black overflow-hidden rounded-xl bg-gray-100 shadow-md"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute inset-0 bg-gray-200 rounded-xl z-0 backdrop-blur-md shadow-xl"
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

                <div className="relative z-10 p-4">
                  <div className="flex justify-center">
                    <img
                      src={actor.profile?.profilePhoto || "default-profile.jpg"}
                      alt={actor.fullname}
                      className="w-32 h-32 object-cover rounded-full shadow-md"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold">{actor.fullname}</h3>
                    <button
                      onClick={() => setSelectedActorId(actor._id)} // Open profile view
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default APactor;