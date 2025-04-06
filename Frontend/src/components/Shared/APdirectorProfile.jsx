import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import {
  Mail,
  Contact,
  Popcorn,
  Projector,
  Loader2,
  MapPin,
  Calendar,
  User,
  CalendarCheck,
  Ruler,
  Dumbbell,
  SquareX,
  ProjectorIcon,
  Award,
} from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const APdirectorProfile = ({ id }) => {
  // Accept id as a prop
  const [directors, setDirectors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { allAdminJobs } = useSelector((state) => state.job);//added for no.of post by director 
  const jobsPosted = allAdminJobs?.filter(job => job?.created_by?._id === id || job?.created_by === id);//added for no.of post by director 


  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${USER_API_END_POINT}/profile/${id}`)
        .then((res) => {
          setDirectors(res.data.user);
          setLoading(false); // ✅ Stop loading when data is received
        })
        .catch((err) => {
          console.error("Error fetching actor profile", err);
          setError("Profile not found or an error occurred.");
          setLoading(false); // ✅ Stop loading if error occurs
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
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
    <div className="bg-main-bg min-h-screen flex flex-col">
      <div className="bg-overlay-bg flex-grow">
        {/* <Navbar /> */}
        <div className="max-w-4xl mx-auto text-black bg-white border-opacity-0 border-gray-200 rounded-2xl my-5 p-8 backdrop-blur-xl bg-white/45">
          {/* Profile Header */}
          <div className="flex justify-between">
            <div
              className="absolute -top-4 -left-4 w-12 h-12 bg-black flex items-center justify-center rounded-full shadow-lg"
              style={{ clipPath: "circle(50%)" }}
            >
              {/* <BackButton /> */}
            </div>
            <div className="flex items-center gap-3 ml-4 font-semibold">
              <Avatar className="h-16 w-16">
                <AvatarImage src={directors.profile?.profilePhoto || ""} />
              </Avatar>
              <div>
                <h1 className="font-extrabold text-gray-900 text-xl">
                  {directors.fullname}
                </h1>
                <p>{directors.profile.bio || "No bio available"}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="ml-6 my-2">
            <div className="flex items-center gap-5 my-2 font-bold">
              <Label className="text-black">
                <Mail />
              </Label>
              <span>{directors.email}</span>
            </div>
            <div className="flex items-center gap-5 font-bold">
              <Label className="text-black">
                <Contact />
              </Label>
              <span className="text-gray-700">
                {directors.phoneNumber || "No number provided"}
              </span>
            </div>

            {/* Director's Skills */}
            <div className="my-5 font-extrabold flex items-center gap-4">
              <Label className="text-black">
                <Projector />
              </Label>
              <div className="flex items-center gap-1">
                {directors.profile?.skills &&
                directors.profile.skills.length > 0 ? (
                  directors.profile.skills.map((item, index) => (
                    <Badge className="text-base px-3 py-0.1" key={index}>
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span>No skills listed</span>
                )}
              </div>
            </div>

            {/* Director's Active Projects */}
            <div className=" my-5 font-extrabold flex items-center gap-4">
              <Label className="">
                <Projector />
              </Label>
              <div>
                {directors.profile.projects &&
                directors.profile.projects.length > 0 ? (
                  <span>{directors.profile.projects}</span>
                ) : (
                  <span>No Projects listed</span>
                )}
              </div>
            </div>

            {/* Director's Awards */}
            <div className="my-5 font-extrabold flex items-center gap-4">
              <Label className="text-black">
                <Award />
              </Label>
              <div>
                {directors.profile?.awards &&
                directors.profile.awards.length > 0 ? (
                  <span>{directors.profile?.awards} </span>
                ) : (
                  <span>No awards listed </span>
                )}
              </div>
            </div>

            {/*added for no.of post by director  */}
            <div
              className="my-5 font-extrabold flex items-center gap-4 cursor-pointer hover:underline text-blue-600"
              onClick={() => navigate(`/director-jobs/${id}`)}
            >
              <Label className="text-black">
                <ProjectorIcon />
              </Label>
              <div>
                {jobsPosted?.length > 0 ? (
                  <span>
                    {jobsPosted.length} Job{jobsPosted.length > 1 ? "s" : ""}{" "}
                    Posted
                  </span>
                ) : (
                  <span>No Jobs Posted</span>
                )}
              </div>
              {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4">
                  <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                    <button
                      className="absolute top-1 right-2 text-gray-600 hover:text-red-500"
                      onClick={() => setModalOpen(false)}
                    >
                      <SquareX />
                    </button>
                    <div className="w-full h-80 flex justify-center">
                      <img
                        src={selectedPhoto}
                        alt="Enlarged"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APdirectorProfile;