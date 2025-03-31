import React, { useEffect, useState } from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";

const AnimatedTestimonialsDemo = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="text-center text-white">Loading actors...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const testimonials = actors.map((actor) => ({
    quote: actor.profile?.bio || "No bio available.",
    name: (
      <span className="text-white font-semibold">{actor.fullname}</span>
    ),
    designation: "Actor at STARCONNECT",
    src: actor.profile?.profilePhoto || "/default-profile.jpg", // Default image if none provided
  }));

  return <AnimatedTestimonials testimonials={testimonials} />;
};

export default AnimatedTestimonialsDemo;
