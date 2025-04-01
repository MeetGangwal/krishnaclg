import React, { useEffect, useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Contact, Mail, Pen, MapPin, User, SquareX, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTabel from "@/components/Actor/AppliedJobTabel";
import UpdateProfileDailog from "@/components/Actor/UpdateProfileDailog";
import { useDispatch, useSelector } from "react-redux";
import { Popcorn, Projector  } from "lucide-react";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { USER_API_END_POINT } from "@/util/constant";
import axios from "axios";
import { toast } from "sonner";
import { updateUserProfile } from "@/Redux/authSlice";
import BackButton from "../Shared/BackButton";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);//added
  const [selectedPhoto, setSelectedPhoto] = useState(null);//added
  const [newPhotos, setNewPhotos] = useState([]); // For new uploads added
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // New state to track modal visibility
  const { user } = useSelector((store) => store.auth);
  const [existingPhotos, setExistingPhotos] = useState(user?.profile?.photos || []);
  // Existing photos added
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();//added for multipal photo

  if (!user || !user.profile) {
    return (
      <div className="text-center text-red-500">
        Error: User data is missing
      </div>
    );
  }
  const openPhotoModal = (photo) => {//added
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  
  const deletePhoto = async (photoUrl) => {//added 
    try {
      // Optimistically update UI
      const updatedPhotos = existingPhotos.filter((url) => url !== photoUrl);
      setExistingPhotos(updatedPhotos);
  
      // Send delete request to the backend
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/remove-photo`,
        { photoUrl },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
  
      if (res.status === 200) {
        toast.success("Photo deleted successfully!");
  
        // Update Redux state with the new user profile
        dispatch(updateUserProfile(res.data.user));
        setModalOpen(false);
  
      } else {
        toast.error(res.data.message || "Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to delete photo. Please try again.");
    }
  };

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
              <div
            className="absolute -top-4 -left-4 w-12 h-12 bg-black flex items-center justify-center rounded-full shadow-lg"
            style={{ clipPath: "circle(50%)" }}
          >
            <BackButton />
          </div>
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
          
            
            {/* Display Instagram, Facebook, and Website Links
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

            {/* Display Uploaded Photos */}
          <div className="ml-6 my-5">
            <h2 className="font-bold text-lg mb-4">Uploaded Photos</h2>
            <div className="flex gap-4 flex-wrap">
              {existingPhotos && existingPhotos.length > 0 ? (
                existingPhotos.map((photo, index) => (
                  <div key={index} className="w-24 h-24 overflow-hidden rounded-lg shadow-lg cursor-pointer transition transform hover:scale-110"
                  onClick={() => openPhotoModal(photo)}>
                    <img
                      src={photo}
                      alt={`Uploaded Photo ${index + 1}`}
                      className="object-cover w-full h-full "
                    />
                  </div>
                ))
              ) : (
                <span className="text-red-500">No photos uploaded yet</span>
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
        {/* Modal for Enlarged Image */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4">
            <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
              <button className="absolute top-1 right-2 text-gray-600 hover:text-red-500" onClick={() => setModalOpen(false)}>
                <SquareX/>
              </button>
              <div className="w-full h-80 flex justify-center">
                <img src={selectedPhoto} alt="Enlarged" className="w-full h-full object-contain" />
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="destructive" onClick={() => deletePhoto(selectedPhoto)}>
                  <Trash2 className="mr-2" /> Delete
                </Button>
                {/* <Button variant="outline" onClick={replacePhoto}>
                  <RefreshCcw className="mr-2" /> Replace
                </Button> */}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Profile;