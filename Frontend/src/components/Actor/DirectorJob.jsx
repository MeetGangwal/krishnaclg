import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import Navbar from "../Shared/Navbar";

const DirectorJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { allAdminJobs } = useSelector((state) => state.job);
  const directorJobs = allAdminJobs.filter(
    (job) => job.created_by?._id === id || job.created_by === id
  );
  

  const daysAgo = (createdAt) => {
    const jobDate = new Date(createdAt);
    const now = new Date();
    const diff = now - jobDate;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-[var(--main-bg)] py-6 px-4 text-black">
      <Navbar/>
      <div className=" py-5 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Director's Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directorJobs.length === 0 ? (
            <p className="text-white">No jobs found for this director.</p>
          ) : (
            directorJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl p-5 shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <p className="text-sm text-gray-500 mb-2">
                  {daysAgo(job.createdAt) === 0
                    ? "Today"
                    : `${daysAgo(job.createdAt)} days ago`}
                </p>

                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={job?.company?.logo || "/default-company-logo.png"}
                      alt="logo"
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-semibold text-md">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                  </div>
                </div>

                <h2 className="font-bold text-lg mb-1">{job?.title}</h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-4">
                  {job?.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="ghost" className="text-blue-700 font-bold">
                    {job?.projectType}
                  </Badge>
                  <Badge variant="ghost" className="text-blue-700 font-bold">
                    {job?.roleType}
                  </Badge>
                  <Badge variant="ghost" className="text-blue-700 font-bold">
                    {job?.salaryPerDay}/-
                  </Badge>
                </div>

                <Button
                  className="bg-black text-white hover:bg-gray-900"
                  onClick={() => navigate(`/description/${job._id}`)}
                >
                  Details
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectorJob;