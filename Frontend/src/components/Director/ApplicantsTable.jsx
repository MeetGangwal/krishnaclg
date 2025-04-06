// import React from "react";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import { APPLICATION_API_END_POINT } from "@/util/constant";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BackButton from "../Shared/BackButton";

// const shortlistingStatus = ["Accepted", "Rejected"];

// const ApplicantsTable = () => {
//   const { applicants } = useSelector((store) => store.application);
//   const navigate = useNavigate();

//   const handleViewProfile = (actorId) => {
//     navigate(`/actor/profile/${actorId}`);
//   };

//   const statusHandler = async (status, id) => {
//     try {
//       axios.defaults.withCredentials = true;
//       const res = await axios.post(
//         `${APPLICATION_API_END_POINT}/status/${id}/update`,
//         { status }
//       );
//       if (res.data.success) {
//         localStorage.setItem("status", {status});//added
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div>
      
//       <Table>
//         <TableCaption>A list of your recent applied users</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Full Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact</TableHead>
//             <TableHead>Profile</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {applicants &&
//             applicants?.applications?.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell>{item?.applicant?.fullname}</TableCell>
//                 <TableCell>{item?.applicant?.email}</TableCell>
//                 <TableCell>{item?.applicant?.phoneNumber}</TableCell>
//                 <TableCell>
//                   <span
//                     className="text-blue-600 cursor-pointer"
//                     onClick={() => navigate(`/actor/profile/${item?.applicant?._id}`)}
//                   >
//                     View Profile
//                   </span>
//                 </TableCell>

//                 <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
//                 <TableCell className="float-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       {/* View Profile Option */}
//                       <div
//                         onClick={() =>
//                           navigate(`/actor/profile/${item?.applicant?._id}`)
//                         }
//                         className="flex w-fit items-center my-2 cursor-pointer text-blue-600"
//                       >
//                         <span>View Audition</span>
//                       </div>

//                       {/* Shortlisting Actions */}
//                       {shortlistingStatus.map((status, index) => (
//                         <div
//                           onClick={() => statusHandler(status, item?._id)}
//                           key={index}
//                           className="flex w-fit items-center my-2 cursor-pointer"
//                         >
//                           <span>{status}</span>
//                         </div>
//                       ))}
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ApplicantsTable;

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/util/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAllApplicants } from "@/Redux/applicationSlice";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [localApplicants, setLocalApplicants] = useState(applicants);

  useEffect(() => {
    setLocalApplicants(applicants);
  }, [applicants]);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setLocalApplicants((prevState) => {
          const updatedApplications = prevState?.applications?.map((app) =>
            app._id === id ? { ...app, status } : app
          );
          return { ...prevState, applications: updatedApplications };
        });

        dispatch(
          setAllApplicants({
            ...applicants,
            applications: applicants?.applications?.map((app) =>
              app._id === id ? { ...app, status } : app
            ),
          })
        );
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localApplicants?.applications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/actor/profile/${item?.applicant?._id}`)}
                >
                  View Profile
                </span>
              </TableCell>
              <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {/* View Audition */}
                    <div
                      className="flex w-fit items-center my-2 cursor-pointer text-blue-600"
                      onClick={() => {
                        if (item?.urlvideo) {
                          window.open(item.urlvideo, "_blank");
                        } else {
                          toast.error("No audition video available");
                        }
                      }}
                    >
                      <span>View Audition</span>
                    </div>
                    {/* Send Email (Only if Accepted) */}
                    {item.status === "Accepted" && (
                      <div
                        className="flex w-fit items-center my-2 cursor-pointer text-green-600"
                        onClick={() => (window.location.href = `mailto:${item?.applicant?.email}`)}
                      >
                        <span>Send Email</span>
                      </div>
                    )}
                    {/* Accept & Reject Buttons */}
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className={`flex w-fit items-center my-2 cursor-pointer ${
                          (status === "Accepted" && item.status === "Accepted") ||
                          (status === "Rejected" && item.status === "Rejected")
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
