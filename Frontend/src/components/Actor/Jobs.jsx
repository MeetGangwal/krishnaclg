import React, { useEffect, useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import Filtercard from "@/components/Actor/Filtercard";
import Job from "./JobCompo";
import { useSelector } from "react-redux";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job); //to fetch jobs
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    // Check if searchedQuery is empty (no filters selected)
    const isEmptyFilter =
      !searchedQuery || Object.values(searchedQuery).every((arr) => arr.length === 0);
  
    if (isEmptyFilter) {
      setFilterJobs(allJobs); // Show all jobs when no filters are selected
      return;
    }
  
    const filteredJobs = allJobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const description = job.description?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";
      const roleType = job.roleType?.toLowerCase() || "";
      const genre = job.genre?.toLowerCase() || "";
      const gender = job.gender?.toLowerCase() || "";
      const ageRange = job.ageRange?.toLowerCase() || "";
  
      return Object.entries(searchedQuery).some(([filterType, values]) => {
        if (!values || values.length === 0) return false;
        const lowerCaseValues = values.map((val) => val.toLowerCase());
  
        switch (filterType) {
          case "Location":
            return lowerCaseValues.includes(location);
          case "Role Type":
            return lowerCaseValues.includes(roleType);
          case "Genre":
            return lowerCaseValues.includes(genre);
          case "Gender":
            return lowerCaseValues.includes(gender);
          case "Age Range":
            return lowerCaseValues.includes(ageRange);
          default:
            return false;
        }
      });
    });
  
    setFilterJobs(filteredJobs);
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
