import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";

const AuditionVideos = () => {
  const { jobId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/job/${jobId}/auditions`,
          { withCredentials: true }
        );
        setVideos(res.data.videos);
      } catch (error) {
        toast.error("Failed to load audition videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [jobId]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Audition Videos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <h3 className="font-semibold text-lg">{video.applicantName}</h3>
                <video controls className="w-full mt-2">
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          ) : (
            <p>No audition videos available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AuditionVideos;
