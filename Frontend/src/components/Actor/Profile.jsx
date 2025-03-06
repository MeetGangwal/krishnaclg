import React, { useEffect, useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Contact, Mail, Pen, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTabel from "@/components/Actor/AppliedJobTabel";
import UpdateProfileDailog from "@/components/Actor/UpdateProfileDailog";
import { useSelector } from "react-redux";
import { Popcorn, Projector } from "lucide-react";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // New state to track modal visibility
  const { user } = useSelector((store) => store.auth);
  const [refresh, setRefresh] = useState(false);

  if (!user || !user.profile) {
    return (
      <div className="text-center text-red-500">
        Error: User data is missing
      </div>
    );
  }

  useEffect(() => {
    console.log("Updated User Profile:", user);
    setRefresh((prev) => !prev);
  }, [user]);

  const handleAvatarClick = () => {
    if (user.profile.profilePhoto) {
      setIsImageModalOpen(true); // Open the modal when the avatar is clicked
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false); // Close the modal
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="flex-grow "
        style={{
          backgroundImage: `url("/DesignItems/CINEMA1.jfif")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <Navbar />
          <div className="max-w-4xl mx-auto text-black bg-white border-opacity-0 border-gray-200 rounded-2xl my-5 p-8 backdrop-blur-xl bg-white/45">
            <div className="flex justify-between">
              <div className="flex items-center gap-3 ml-4 font-semibold">
                <Avatar
                  className="h-16 w-16 object-cover"
                  onClick={handleAvatarClick}
                >
                  <AvatarImage
                    className="object-cover"
                    key={refresh}
                    src={user.profile.profilePhoto || ""}
                  />
                </Avatar>
                <div>
                  <h1 className="font-extrabold text-gray-900 text-xl">
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

            {/* Email */}
            <div className="ml-6 my-2 flex items-center gap-5 font-bold">
              <Mail />
              <span>{user.email}</span>
            </div>

            {/* Phone Number */}
            <div className="ml-6 my-2 flex items-center gap-5 font-bold">
              <Contact />
              <span>{user.phoneNumber || "No number provided"}</span>
            </div>

            {/* Location */}
            <div className="ml-6 my-2 flex items-center gap-5 font-bold">
              <MapPin />
              <span>{user.profile.location || "Location not set"}</span>
            </div>

            {/* Skills */}
            <div className="ml-6 my-5 font-extrabold flex items-center gap-4">
              <Popcorn />
              <div className="flex items-center gap-1">
                {user.profile.skills?.length > 0 ? (
                  user.profile.skills.map((item, index) => (
                    <Badge
                      className="text-base text-cyan-300 px-3 py-0.1"
                      key={index}
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span>N/A</span>
                )}
              </div>
            </div>

            {/* Age */}
            <div className="flex w-full font-bold max-w-sm items-center gap-5 ml-6 my-3">
              <Calendar />
              {user.profile.age ? (
                user.profile.age
              ) : (
                <span className="text-red-500">Age not Defined</span>
              )}
            </div>

            {/* Gender */}
            <div className="flex w-full font-bold max-w-sm items-center gap-5 ml-6 my-3">
              <User />
              {user.profile.gender || (
                <span className="text-red-500">Gender not defined</span>
              )}
            </div>
            {/* Display Instagram, Facebook, and Website Links */}
            {user.profile.instagramId && (
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
            )}

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

            {/* Display Uploaded Photos */}
            <div className="ml-6 my-5">
              <h2 className="font-bold text-lg mb-4">Uploaded Photos</h2>
              <div className="flex gap-4 flex-wrap">
                {user.profile.photos && user.profile.photos.length > 0 ? (
                  user.profile.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 overflow-hidden rounded-lg shadow-lg"
                    >
                      <img
                        src={photo}
                        alt={`Uploaded Photo ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">No photos uploaded yet</span>
                )}
              </div>
            </div>
          </div>
          {/* Applied Jobs Section */}
          <div className="max-w-4xl mx-auto text-black bg-white border-opacity-0 border-gray-200 rounded-2xl my-5 p-8 backdrop-blur-xl bg-white/45">
            <h1 className="font-bold text-lg my-5 p-5">Applied Jobs</h1>
            <AppliedJobTabel />
          </div>

          <UpdateProfileDailog open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Profile;