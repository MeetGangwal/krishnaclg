import React, { useEffect, useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import Filtercard from "@/components/Actor/Filtercard";
import Job from "./JobCompo";
import { useSelector } from "react-redux";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job); //to fetch jobs
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        // Ensure that job properties are strings before calling toLowerCase
        const title = job.title || ""; // Fallback to empty string if undefined
        const description = job.description || ""; // Fallback to empty string if undefined
        const location = job.location || ""; // Fallback to empty string if undefined
  
        return (
          title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  
  return (
    <div className="bg-[var(--main-bg)]  min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <Filtercard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <Job job={job} />//Job compos
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
