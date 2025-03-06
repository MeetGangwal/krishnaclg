import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import { Mail, Contact, Popcorn, Projector, Loader2, MapPin, Calendar, User } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";

const PersonalProfile = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${USER_API_END_POINT}/profile/${id}`)
        .then((res) => {
          setActor(res.data.user);
          setLoading(false);  // ✅ Stop loading when data is received
        })
        .catch((err) => {
          console.error("Error fetching actor profile", err);
          setError("Profile not found or an error occurred.");
          setLoading(false);  // ✅ Stop loading if error occurs
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
            <div className="flex items-center gap-3 ml-4 font-semibold">
              <Avatar className="h-16 w-16">
                <AvatarImage className="object-cover" src={actor.profile?.profilePhoto || ""} />
              </Avatar>
              <div>
                <h1 className="font-extrabold text-gray-900 text-xl">
                  {actor.fullname}
                </h1>
                <div>

                <Label className="text-black"></Label>
                {actor.profile.bio  ||(
                <span className="font-semibold text-red-950">No bio available </span>
              )}
                </div>
                {/* <p className="text-black">{actor.profile.bio || "No bio available"}</p> */}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="ml-6 my-2">
            <div className="flex items-center gap-5 my-2 font-bold">
              <Label className="text-black">
                <Mail />
              </Label>
              <span>{actor.email}</span>
            </div>
            <div className="flex items-center gap-5 font-bold">
              <Label className="text-black">
                <Contact />
              </Label>
              {actor.phoneNumber ||(
                <span className="font-semibold text-red-950">No number provided </span>
              )}
            </div>

            
            <div className="my-2">
              <div className="flex items-center gap-5 my-2 font-bold">
              <Label className="text-black">
              <Popcorn />
            </Label>
            {actor.profile.skills?.length > 0 ? (
            actor.profile?.skills?.map((skill, index) => (
              <Badge className="text-base" key={index}>
                {skill}
              </Badge>
              
            ))):(<span className="text-red-950 font-semibold"> No skills </span>)}
            
              </div>
            </div>
              {/* Location */}
          <div className="my-2 flex items-center gap-5 ">
            <MapPin />
            {actor.profile.location ||(

              <span  className="text-red-950 font-semibold"> Location not set</span>
            )}
          </div>
           {/* Age */}
           <div className="flex w-full max-w-sm items-center gap-5  my-3">
            <Calendar />
            {actor.profile.age ? (
              actor.profile.age
            ) : (
              <span className="text-red-950 font-semibold" >Age not Defined</span>
            )}
          </div>

          {/* Gender */}
          <div className="flex w-full max-w-sm items-center gap-5  my-3">
            <User />
            {actor.profile.gender || (
              <span className="text-red-950 font-semibold">Gender not defined</span>
            )}
          </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
