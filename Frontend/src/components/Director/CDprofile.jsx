import React, { useEffect, useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Award, Contact, Mail, Pen, ProjectorIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import { useSelector } from "react-redux";
import { Popcorn } from "lucide-react";
import { Projector } from "lucide-react";
import CDUpdateProfileDailog from "./CDupdateProfileDailog";
import BackButton from "../Shared/BackButton";

// const Skills = [
//   "Dramatic Acting",
//   "Martial Arts",
//   "Horseback Riding",
//   "Public Speaking",
// ];
// const isResume = true;
const isProfilePhoto = true;

const CDprofile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [refresh, setRefresh] = useState(false);

  // Ensure user is defined before accessing properties
  if (!user || !user.profile) {
    return (
      <div className="text-center text-red-500">
        Error: User data is missing
      </div>
    );
  }

  // When profile updates, toggle refresh state
  useEffect(() => {
    console.log("Updated User Profile:", user);
    setRefresh((prev) => !prev);
  }, [user]); // This ensures component updates when user data changes

  return (
    <div className="bg-main-bg min-h-screen flex flex-col">
      <div className="bg-overlay-bg flex-grow">
        <Navbar />
        <div className="max-w-4xl mx-auto text-black bg-white border-opacity-0 border-gray-200 rounded-2xl my-5 p-8 backdrop-blur-xl bg-white/45">
          <div className="flex justify-between">
            <div className="flex items-center gap-3 ml-4 font-semibold">
            <div
            className="absolute -top-4 -left-4 w-12 h-12 bg-black flex items-center justify-center rounded-full shadow-lg"
            style={{ clipPath: "circle(50%)" }}
          >
            <BackButton />
          </div>
              <Avatar className="h-16 w-16">
                <AvatarImage className="object-cover"
                  key={refresh}
                  src={user.profile.profilePhoto || ""}
                />
              </Avatar>
              <div>
                <h1 className="font-extrabold text-gray-00 text-xl">
                  {user.fullname}
                </h1>
                <p>{user.profile.bio || "No bio available"}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="text-right"
              variant="outline"
            >
              <Pen />
            </Button>
          </div>
          <div className="ml-6 my-2">
            <div className="flex items-center gap-5 my-2 font-bold">
              <Label className="text-white">
                <Mail />
              </Label>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-5 font-bold">
              <Label className="text-black">
                <Contact />
              </Label>
              <span className="text-white">
                {user.phoneNumber || "No number provided"}
              </span>
            </div>
          </div>

          <div className="ml-6 my-5 font-extrabold flex items-center gap-4">
            <Label className="text-white">
              <Popcorn />
            </Label>
            <div className="flex items-center gap-1">
              {user.profile.skills && user.profile.skills.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge className="text-base px-3 py-0.1" key={index}>
                    {item}
                  </Badge>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
          

          <div className="ml-6 my-5 font-extrabold flex items-center gap-4">
            <Label className="text-white">
              <Award />
            </Label>
            <div>{user.profile.awards || "No awards listed"}</div>
          </div>

          <div className="ml-6 my-5 font-extrabold flex items-center gap-4">
            <Label className="text-white">
              <ProjectorIcon />
            </Label>
            <div>
              {user.profile.projects && user.profile.projects.length > 0 ? (
                <span>{user.profile.projects}</span>
              ) : (
                <span>No projects listed</span>
              )}
            </div>
          </div>
          <div className="flex w-full max-w-sm items-center gap-5 ml-6">
            <Label className="text-md font-extrabold text-white">
              <Projector />
            </Label>
            {user.profile.profilePhoto ? (
              <a
                target="_blank"
                href={user.profile.profilePhoto}
                className="font-bold w-full hover:underline cursor-pointer"
              >
                View Profile Photo
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <CDUpdateProfileDailog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default CDprofile;
