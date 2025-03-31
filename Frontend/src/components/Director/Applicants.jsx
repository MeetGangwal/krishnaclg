import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/util/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/Redux/applicationSlice";
import BackButton from "../Shared/BackButton";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div className="bg-main-bg min-h-screen">
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto bg-white rounded-2xl px-10 py-10 mt-10 relative">
          {/* Circular Background for Back Button */}
          <div
            className="absolute -top-4 -left-4 w-12 h-12 bg-black flex items-center justify-center rounded-full shadow-lg"
            style={{ clipPath: "circle(50%)" }}
          >
            <BackButton />
          </div>

          <h1 className="font-bold text-xl my-5">
            Applicants {applicants?.applications?.length}
          </h1>
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
