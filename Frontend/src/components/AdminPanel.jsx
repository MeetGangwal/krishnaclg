import React, { useState } from "react";
import APactor from "./Shared/APactors";
import APdirectors from "./Shared/APdirectors";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/Redux/authSlice";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const AdminPanel = () => {
  const [showActorsModal, setShowActorsModal] = useState(false);
  const [showDirectorsModal, setShowDirectorsModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGetAllJobs(); // Fetch all jobs
  const { allAdminJobs } = useSelector((state) => state.job); // Access all jobs from Redux

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success("Logged out successfully!");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Listed Jobs Section */}
      <div className="bg-white p-6 rounded shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Listed Jobs</h2>
        <p className="text-gray-700 mb-4">
          Total Jobs Listed by Directors: <span className="font-bold">{allAdminJobs?.length || 0}</span>
        </p>
        <button
          onClick={() => navigate("/director-jobs")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          View All Jobs
        </button>
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setShowActorsModal(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Actors
        </button>
        <button
          onClick={() => setShowDirectorsModal(true)}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
        >
          Directors
        </button>
      </div>

      {/* Actors Modal */}
      {showActorsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 h-3/4 overflow-auto">
            <button
              onClick={() => setShowActorsModal(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Close
            </button>
            <APactor onClose={() => setShowActorsModal(false)} />
          </div>
        </div>
      )}

      {/* Directors Modal */}
      {showDirectorsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 h-3/4 overflow-auto">
            <button
              onClick={() => setShowDirectorsModal(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Close
            </button>
            <APdirectors onClose={() => setShowDirectorsModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;