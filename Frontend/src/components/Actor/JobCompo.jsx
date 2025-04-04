import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const JobCompo = ({ job, savedJobs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if job is saved
 

  // Function to calculate days since job was posted
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
  };

  return (
    <div className="p-4 rounded-3xl bg-white h-full w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {job?.createdAt
            ? daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`
            : "No date available"}
        </p>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || "/default-company-logo.png"} // ✅ Fallback image
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg text-black my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-5">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.projectType}
        </Badge>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.roleType}
        </Badge>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.salaryPerDay}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className=""
        >
          Details
        </Button>
       
      </div>
    </div>
  );
};

export default JobCompo;


 {/* Grid Layout for Actor Cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {actors.map((actor) => (
            <motion.div
              key={actor._id}
              className="relative text-white shadow-xl border border-white overflow-hidden rounded-xl"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url('/DesignItems/cardbg3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center">
                <img
                  src={actor.profile?.profilePhoto || "default-profile.jpg"}
                  alt={actor.fullname}
                  className="w-32 h-32 object-cover rounded-full mt-5 shadow-[0_0_100px_rgba(255,255,255,0.3)]"
                />
              </div>
              <CardContent className="text-center">
                <CardTitle className="text-xl font-semibold pt-2">
                  {actor.fullname}
                </CardTitle>
                <CardDescription className="text-white mt-2">
                  {actor.profile?.skills?.join(", ") || "No skills listed"}
                </CardDescription>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => handleViewProfile(actor._id)}
                  className="mt-4 px-6 py-2 bg-[#48cfcb8e] text-white font-semibold rounded-full transition duration-200 hover:bg-[#9173f591]"
                >
                  View Profile
                </motion.button>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div> */}