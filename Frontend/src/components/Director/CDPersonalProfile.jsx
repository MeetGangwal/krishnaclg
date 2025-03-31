
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import { Mail, Contact, Projector, Loader2, Award, ProjectorIcon } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import BackButton from "../Shared/BackButton";

const CDPersonalProfile = () => {
  const { id } = useParams();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <span className="text-gray-700">
                {director.phoneNumber || "No number provided"}
              </span>
            </div>

            {/* Director's Skills
            <div className="my-5 font-extrabold flex items-center gap-4">
              <Label className="text-black">
                <Projector />
              </Label>
              <div className="flex items-center gap-1">
                {director.profile?.skills &&
                director.profile.skills.length > 0 ? (
                  director.profile.skills.map((skills, index) => (
                    <Badge className="text-base px-3 py-0.1" key={index}>
                      {skills}
                    </Badge>
                  ))
                ) : (
                  <span>No skills listed</span>
                )}
              </div>
            </div> */}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDPersonalProfile;
