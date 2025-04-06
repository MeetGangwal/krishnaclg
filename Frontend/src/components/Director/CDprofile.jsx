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
  const { allAdminJobs } = useSelector((store) => store.job);//added for no.of post by director 
  const { user } = useSelector((store) => store.auth);
  const [refresh, setRefresh] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // New state to track modal visibility
  const jobsPostedByUser = allAdminJobs?.filter(job => job.created_by === user._id);//added for no.of post by director 

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

  const handleAvatarClick = () => {
    if (user.profile.profilePhoto) {
      setIsImageModalOpen(true); // Open the modal when the avatar is clicked
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false); // Close the modal
  };

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
                  onClick={handleAvatarClick}
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
          {/*added for no.of post by director*/}
          <div className="ml-6 my-5 font-extrabold flex items-center gap-4"> 
            <Label className="text-white">
              <ProjectorIcon />
            </Label>
            <div>
              {jobsPostedByUser.length > 0 ? (
                <span>{jobsPostedByUser.length} Job{jobsPostedByUser.length > 1 ? 's' : ''} Posted</span>
              ) : (
                <span>No Jobs Posted</span>
              )}
            </div>
          </div>
          {/* Display Instagram, Facebook, and Website Links */}
          {/* {user.profile.instagramId && (
              <div className="flex w-full font-bold max-w-sm items-center gap-5 ml-6 my-3">
                <span className="font-bold">Instagram: </span>
                <a
                  href={`https://www.instagram.com/${user.profile.instagramId}`} // Direct Instagram link
                  className="text-cyan-300 hover:underline"
                  target="_blank" // Open in new tab
                  rel="noopener noreferrer" // Security measure
                >
                  {user.profile.instagramId}
                </a>
              </div>
            )}

            {user.profile.facebookId && (
              <div className="flex w-full font-bold max-w-sm items-center gap-5 ml-6 my-3">
                <span className="font-bold">Facebook: </span>
                <a
                  href={`https://www.facebook.com/${user.profile.facebookId}`} // Direct Facebook link
                  className="text-cyan-300 hover:underline"
                  target="_blank" // Open in new tab
                  rel="noopener noreferrer" // Security measure
                >
                  {user.profile.facebookId}
                </a>
              </div>
            )}

            {user.profile.webistelink && (
              <div className="flex w-full font-bold max-w-sm items-center gap-5 ml-6 my-3">
                <span className="font-bold">Website: </span>
                <a
                  href={user.profile.webistelink} // Direct Website link
                  className="text-cyan-300 hover:underline"
                  target="_blank" // Open in new tab
                  rel="noopener noreferrer" // Security measure
                >
                  {user.profile.webistelink}
                </a>
              </div>
            )} */}

          {/* Display Modal for Profile Photo */}
          {isImageModalOpen && user.profile.profilePhoto && (
              <div
                className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                onClick={closeImageModal}
              >
                <div className="relative w-96 max-h-auto overflow-hidden bg-white rounded-lg shadow-lg p-5">
                  <img
                    src={user.profile.profilePhoto}
                    alt="Profile"
                    className="w-96 h-96 object-contain transition-all duration-300 ease-in-out transform hover:scale-105"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-2 text-gray-800 hover:text-white hover:bg-red-500 transition-all duration-200"
                    onClick={closeImageModal}
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
        </div>

        <CDUpdateProfileDailog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default CDprofile;
