import React, { useEffect, useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import axios from "axios";
import { motion, useScroll } from "framer-motion";
import BackButton from "../Shared/BackButton";

const News = () => {
  const [newsArray, setNewsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { scrollYProgress } = useScroll(); 
   const backgroundImages = [
      "/Images/newsbg5.jfif",
      "/Images/newsbg1.jfif",
      "/Images/newsbg2.jfif",
      "/Images/newsbg3.jfif",
      "/Images/newsbg4.jfif",
     
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

  // Fetching the news data
  useEffect(() => {
    
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              apiKey: "1ed90e81936946609454418f6fbed00e", // Replace with your API key
              category: "entertainment", // News related to entertainment
              language: "en", // English news
              country: "us", // Filter for US-based news (optional)
            },
          }
        );
        setNewsArray(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news");
        setLoading(false);
      }
    };fetchNews();
    return scrollYProgress.onChange((progress) => {
      const index = Math.min(
        Math.floor(progress * backgroundImages.length), 
        backgroundImages.length - 1
      );
      setBgIndex(index);
    });
  }, [scrollYProgress]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div
    className="relative min-h-screen bg-cover bg-fixed "
    style={{ backgroundImage:`url(${backgroundImages[bgIndex]})`,
    transition: "background-image 0.5s ease-in-out", }} // Ensure the image path is correct
  >
    <div className="absolute inset-0 bg-black opacity-50 "></div>
    <div className="text-white relative z-10 max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 flex items-center gap-4 px-6 py-10">
          <BackButton /> Entertainment Industry News
        </h1>
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-3">Top News</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArray.map((news, index) => (
            <div
              key={index}
              className="bg-[#ffffff60] rounded-3xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 object-cover"
            >
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={news.urlToImage || "https://via.placeholder.com/150"} // Placeholder if no image
                  alt={news.title}
                  className="w-full h-56 object-cover p-3 rounded-3xl" // Consistent height for images
                />
                <div className="p-4 h-full">
                  <h2 className="text-l font-medium mb-2 line-clamp-2">{news.title}</h2> {/* Added line-clamp to limit title length */}
                  <p className="text-sm text-black mb-4 line-clamp-3">{news.description}</p> {/* Added line-clamp to limit description length */}
                  <div className="flex justify-between items-center text-sm text-gray-900">
                    <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
                    <span className="bg-[#6A38C2] hover:bg-[#30fff8] transition duration-200 text-white px-2 py-1 rounded-3xl">
                      {news.source.name}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
  
  );
};

export default News;
