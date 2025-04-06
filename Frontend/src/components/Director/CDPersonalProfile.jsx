
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import { Mail, Contact, Projector, Loader2, Award, ProjectorIcon, Popcorn } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import BackButton from "../Shared/BackButton";
import { useSelector } from "react-redux";//added for no.of post by director 
import { useNavigate } from "react-router-dom";

const CDPersonalProfile = () => {
  const { id } = useParams();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const { allAdminJobs } = useSelector((state) => state.job);//added for no.of post by director 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const jobsPosted = allAdminJobs?.filter(job => job?.created_by?._id === id || job?.created_by === id);//added for no.of post by director 
  useEffect(() => {
    if (id) {
      axios
        .get(`${USER_API_END_POINT}/profile/${id}`)
        .then((res) => {
          setDirector(res.data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching director profile", err);
          setError("Profile not found or an error occurred.");
          setLoading(false);
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
        <Navbar />
        <div className="max-w-4xl mx-auto text-black bg-white border-opacity-0 border-gray-200 rounded-2xl my-5 p-8 backdrop-blur-xl bg-white/45">
          {/* Profile Header */}
          <div className="flex justify-between">
          <div
            className="absolute -top-4 -left-4 w-12 h-12 bg-black flex items-center justify-center rounded-full shadow-lg"
            style={{ clipPath: "circle(50%)" }}
          >
            <BackButton />
          </div>
            <div className="flex items-center gap-3 ml-4 font-semibold">
              <Avatar className="h-16 w-16">
                <AvatarImage src={director.profile?.profilePhoto || ""} />
              </Avatar>
              <div>
                <h1 className="font-extrabold text-gray-900 text-xl">
                  {director.fullname}
                </h1>
                <p>{director.profile.bio || "No bio available"}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="ml-6 my-2">
            <div className="flex items-center gap-5 my-2 font-bold">
              <Label className="text-black">
                <Mail />
              </Label>
              <span>{director.email}</span>
            </div>
            <div className="flex items-center gap-5 font-bold">
              <Label className="text-black">
                <Contact />
              </Label>
              <span className="text-black">
                {director.phoneNumber || "No number provided"}
              </span>
            </div>

            {/* Director's Skills */}
            <div className="my-5 font-extrabold flex items-center gap-4">
            <Label className="">
              <Popcorn />
            </Label>
            <div className="flex items-center gap-1">
              {director.profile.skills && director.profile.skills.length > 0 ? (
                director.profile.skills.map((item, index) => (
                  <Badge className="text-base px-3 py-0.1" key={index}>
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-red-950">N/A</span>
              )}
            </div>
          </div>

            {/* Director's Active Projects */}
            <div className=" my-5 font-extrabold flex items-center gap-4">
              <Label className="">
                <ProjectorIcon />
              </Label>
              <div>
                {director.profile.projects && director.profile.projects.length > 0 ? (
                  <span>{director.profile.projects}</span>
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
              <div>{director.profile?.awards && director.profile.awards.length >0 ?
               (<span>{director.profile?.awards} </span> ):( <span>No awards listed </span>)}</div>
            </div>
            {/*added for no.of post by director  */}
            <div className="my-5 font-extrabold flex items-center gap-4 cursor-pointer hover:underline text-blue-600" 
                  onClick={() => navigate(`/director-jobs/${id}`)}>
              <Label className="text-black">
                <ProjectorIcon />
              </Label>
              <div>
                {jobsPosted?.length > 0 ? (
                  <span>{jobsPosted.length} Job{jobsPosted.length > 1 ? 's' : ''} Posted</span>
                ) : (
                  <span>No Jobs Posted</span>
                )}
              </div>
            </div>
            {/* Display Instagram, Facebook, and Website Links */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 w-full max-w-sm">
            {director.profile.instagramId && (
                <>
                  <span className="font-bold">Instagram</span>
                  <a
                    href={`https://www.instagram.com/${director.profile.instagramId}`}
                    className="text-cyan-200 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    : {director.profile.instagramId}
                  </a>
                </>
              )}

              {director.profile.facebookId && (
                <>
                  <span className="font-bold">Facebook</span>
                  <a
                    href={`https://www.facebook.com/${director.profile.facebookId}`}
                    className="text-cyan-200 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    : {director.profile.facebookId}
                  </a>
                </>
              )}

              {director.profile.webistelink && (
                <>
                  <span className="font-bold">Website</span>
                  <a
                    href={director.profile.webistelink}
                    className="text-cyan-200 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    : {director.profile.webistelink}
                  </a>
                </>
              )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDPersonalProfile;
