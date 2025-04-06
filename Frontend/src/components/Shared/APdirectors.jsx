import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import APdirectorProfile from "./APdirectorProfile";

const APdirectors = ({ onClose }) => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDirectorId, setSelectedDirectorId] = useState(null); // Track selected director for profile view
  const { scrollYProgress } = useScroll();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
const fetchDirectors = async () => {
  try {
    const response = await axios.get(`${USER_API_END_POINT}/director`);
    const directors = response.data.filter(
      (director) => director.role === "Director"
    );
    setDirectors(directors);
  } catch (error) {
    console.error("Error fetching directors:", error);
    setError("Could not load directors.");
  } finally {
    setLoading(false);
  }
};

    fetchDirectors();
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
      {selectedDirectorId ? (
        // Render APdirectorProfile if a director is selected
        <div className="p-4">
          <button
            onClick={() => setSelectedDirectorId(null)} // Go back to APdirectors
            className="mb-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Back
          </button>
          <APdirectorProfile id={selectedDirectorId} /> {/* Pass id as prop */}
        </div>
      ) : (
        // Render APdirectors list
        <motion.div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Browse Directors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {directors.map((director, index) => (
              <motion.div
                key={director._id}
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
                      src={director.profile?.profilePhoto || "default-profile.jpg"}
                      alt={director.fullname}
                      className="w-32 h-32 object-cover rounded-full shadow-md"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold">{director.fullname}</h3>
                    <p className="text-gray-600 mt-2">
                      {director.profile?.bio || "No bio available"}
                    </p>
                    <button
                      onClick={() => setSelectedDirectorId(director._id)} // Open profile view
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

export default APdirectors;