import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Shared/Navbar";
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
} from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import BackButton from "../Shared/BackButton";

const PersonalProfile = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${USER_API_END_POINT}/profile/${id}`)
        .then((res) => {
          setActor(res.data.user);
          // setActorPhotos(res.data.user.photos || []);
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
        <Navbar />
        <div className="max-w-4xl mx-auto text-black bg-white border-opacity-0 border-gray-200 rounded-2xl my-5 p-8 backdrop-blur-xl bg-white/45">
          {/* Profile Header */}
          <div className="flex justify-between">
            <div className="flex items-center gap-3 ml-4 font-semibold">
              <div
                className="absolute -top-4 -left-4 w-12 h-12 bg-black flex items-center justify-center rounded-full shadow-lg"
                style={{ clipPath: "circle(50%)" }}
              >
                <BackButton />
              </div>
              <Avatar className="h-16 w-16">
                <AvatarImage
                  className="object-cover"
                  src={actor.profile?.profilePhoto || ""}
                />
              </Avatar>
              <div>
                <h1 className="font-extrabold text-gray-900 text-xl">
                  {actor.fullname}
                </h1>
                <div>
                  <Label className="text-black"></Label>
                  {actor.profile.bio || (
                    <span className="font-semibold text-red-950">
                      No bio available{" "}
                    </span>
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
              {actor.phoneNumber || (
                <span className="font-semibold text-red-950">
                  No number provided{" "}
                </span>
              )}
            </div>

            <div className="my-2">
              <div className="flex items-center gap-5 my-2 font-bold">
                <Label className="text-black">
                  <Popcorn />
                </Label>
                {actor.profile.skills?.length > 0 ? (
                  actor.profile?.skills?.map((skill, index) => (
                    <Badge className="text-base text-[#9475F7]" key={index}>
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-red-950 font-semibold">
                    {" "}
                    No skills{" "}
                  </span>
                )}
              </div>
            </div>
            {/* Location */}
            <div className="my-2 flex items-center gap-5 ">
              <MapPin />
              {actor.profile.location || (
                <span className="text-red-950 font-semibold">
                  {" "}
                  Location not set
                </span>
              )}
            </div>
            {/* Age */}
            <div className="flex w-full max-w-sm items-center gap-5  my-3">
              <Calendar />
              {actor.profile.age ? (
                <span>
                  {actor.profile.age}
                  <span className="ml-1">years old</span>
                </span>
              ) : (
                <span className="text-red-900">No Weight added</span>
              )}
            </div>

            {/* Gender */}
            <div className="flex w-full max-w-sm items-center gap-5  my-3">
              <User />
              {actor.profile.gender || (
                <span className="text-red-950 font-semibold">
                  Gender not defined
                </span>
              )}
            </div>
            {/* heigth and wiegth */}
            <div className="flex w-full max-w-sm items-center gap-5  my-3">
              <Ruler />
              {actor.profile.height ? (
                <span>
                  {actor.profile.height}
                  <span className="ml-1">ft</span>
                </span>
              ) : (
                <span className="text-red-900">No Height added</span>
              )}
            </div>
            <div className="flex w-full max-w-sm items-center gap-5  my-3">
              <Dumbbell />
              {actor.profile.weight ? (
                <span>
                  {actor.profile.weight}
                  <span className="ml-1">kg</span>
                </span>
              ) : (
                <span className="text-red-900">No Weight added</span>
              )}
            </div>
            {/* Experience */}
            <div className="flex w-full  max-w-sm items-center gap-5 my-3">
              <CalendarCheck />
              {actor.profile.actingExperience ? (
                <span>
                  {actor.profile.actingExperience}
                  <span className="ml-1">Experience</span>
                </span>
              ) : (
                <span className="text-red-900">No Experience added</span>
              )}
            </div>
            {/* Preferred Roles */}
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 w-full max-w-sm">
              <span className="font-bold">Best Played Role</span>
              <span>
                :{" "}
                {actor.profile.bestActingIn || (
                  <span className="text-red-900">
                    Best Played Role not defined
                  </span>
                )}
              </span>

              <span className="font-bold">Preferred Roles</span>
              <span>
                :{" "}
                {actor.profile.preferredRoles || (
                  <span className="text-red-900">
                    Preferred Roles not defined
                  </span>
                )}
              </span>

              {/* Display Instagram, Facebook, and Website Links */}
              {actor.profile.instagramId && (
                <>
                  <span className="font-bold">Instagram</span>
                  <a
                    href={`https://www.instagram.com/${actor.profile.instagramId}`}
                    className="text-cyan-200 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    : {actor.profile.instagramId}
                  </a>
                </>
              )}

              {actor.profile.facebookId && (
                <>
                  <span className="font-bold">Facebook</span>
                  <a
                    href={`https://www.facebook.com/${actor.profile.facebookId}`}
                    className="text-cyan-200 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    : {actor.profile.facebookId}
                  </a>
                </>
              )}

              {actor.profile.webistelink && (
                <>
                  <span className="font-bold">Website</span>
                  <a
                    href={actor.profile.webistelink}
                    className="text-cyan-200 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    : {actor.profile.webistelink}
                  </a>
                </>
              )}
            </div>
            {/* Tattos or scar */}
            <div className="flex w-full max-w-sm items-center gap-5  my-3">
              <span className="font-bold">Tattoos or Scars </span>
              <span>
                :{" "}
                {actor.profile.tattoosOrScars || (
                  <span className="text-red-900">
                    Tattoos or Scars not defined
                  </span>
                )}
              </span>
            </div>
            {/* langaue */}
            <div className="flex w-full max-w-sm items-center gap-5  my-3">
              <span className="font-bold">Languages Spoken </span>
              <span>
                :{" "}
                {actor.profile.languagesSpoken || (
                  <span className="text-red-900">
                    Languages Spoken not defined
                  </span>
                )}
              </span>
            </div>
            {/* skin  */}
            <div className="flex w-full max-w-sm items-center gap-5  my-3">
              <span className="font-bold">Skin Tone </span>
              <span>
                :{" "}
                {actor.profile.skinTone || (
                  <span className="text-red-900">skinTone not defined</span>
                )}
              </span>
            </div>
            {/* USER PHOTOS */}
            <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Actor's Photos</h2>
      <div className=" flex gap-4 flex-wrap">
        {actor?.profile?.photos && actor.profile.photos.length > 0 ? (
          actor.profile.photos.map((photo, index) => (
            <div
              key={index}
              className="w-24 h-24 overflow-hidden rounded-lg shadow-lg cursor-pointer transition transform hover:scale-110"
              onClick={() => openPhotoModal(photo)}
            >
              <img
                src={photo}
                alt={`Uploaded Photo ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))
        ) : (
          <span className="text-red-900">No photos uploaded yet</span>
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

export default PersonalProfile;
