import React, { useEffect, useState } from "react";
import Navbar from "@/components/Shared/Navbar";
import Job from "./JobCompo";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/Redux/JobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Set how many jobs to show per page

  // Calculate total pages
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  // Get jobs for the current page
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = allJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="bg-main-bg min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {currentJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="font-bold text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
