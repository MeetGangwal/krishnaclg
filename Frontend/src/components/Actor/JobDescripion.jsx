
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Shared/Navbar";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/util/constant";
import { setSingleJob } from "@/Redux/JobSlice";
import { toast } from "sonner";
import BackButton from "../Shared/BackButton";
import { setSingleCompany } from "@/Redux/CompanySlice";//added for viewing company details 

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [driveUrl, setDriveUrl] = useState(""); // added For storing the entered URL
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const company = useSelector((state) => state.company.singleCompany);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const handleUrlChange = (e) => {
    setDriveUrl(e.target.value); // Capture the URL entered by the user
  };

  const applyJobHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("auditionVideo", videoFile); // Append video file to FormData
      if (singleJob?.specialSubmissionAuditions?.includes("Online")) {
        if (!driveUrl) {
          toast.error("Please enter a Drive URL for your audition video.");
          return;
        }
        formData.append("urlvideo", driveUrl); // Ensure driveUrl is appended
      }
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); // Log all form fields
      }

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          console.log(res.data.job);
          dispatch(setSingleJob(res.data.job));
          dispatch(setSingleCompany(res.data.job.company));//added for company details 
          // Check if the user has applied
          const appliedApplication = res.data.job.applications.find(
            (application) => application.applicant === user?._id
          );

          if (appliedApplication) {
            setIsApplied(true);
            setDriveUrl(appliedApplication.urlvideo || ""); // Store URL if available
          }
        }
      } catch (error) {
        toast.error("Failed to fetch job details");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);


  // Handle Video Upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (15MB limit)
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Video size must be less than 15MB");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("auditionVideo", file);

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/${jobId}/upload-audition`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Video uploaded successfully");
        setIsVideoUploaded(true); // Set video upload status to true
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  const renderField = (label, value) => {
    if (!value && value !== 0) return null;
    return (
      <div className="my-4 px-4 py-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-extrabold text-gray-600 mb-2">{label}</h2>
        <p className="text-black  text-lg break-words whitespace-pre-wrap">{value}</p>
      </div>
    );
  };


  const renderRangeField = (label, min, max, unit = "") => {
    if (!min && !max) return null;
    return (
      <div className="my-4 px-4 py-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200">

        <h1 className="font-extrabold text-gray-600 text-lg my-1">
          {label}:{" "}
          <span className="pl-4 font-medium text-black text-lg">
            {min} - {max}
            {unit}
          </span>
        </h1>
      </div>
    );
  };

  const renderArrayField = (label, array) => {
    if (!array?.length) return null;
    return (
      <div className="my-4 px-4 py-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h1 className="font-extrabold text-gray-600 text-lg my-1">
          {label}:{" "}
          <span className="pl-4 font-medium text-black text-lg">
            {array.join(", ")}
          </span>
        </h1></div>
    );
  };

  return (
    <div className="bg-main-bg min-h-screen">
      <div className="bg-overlay-bg min-h-screen">
        <Navbar />

        {/* White Box Wrapper - Make it Relative to Keep BackButton Inside */}
        <div className="relative max-w-7xl mx-auto mt-10 rounded-2xl bg-white py-8 px-6 shadow-lg">

          {/* 🔹 Corrected Back Button Position */}
          <div
            className="absolute -top-5 -left-5 w-14 h-14 bg-black flex items-center justify-center rounded-full shadow-lg"
          >
            <BackButton />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl text-gray-900">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  {singleJob?.projectType}
                </Badge>
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  {singleJob?.roleType}
                </Badge>
                <Badge className="text-white font-semibold px-3 py-1 rounded-full border border-purple-950 shadow-purple-300 shadow-md">
                  ₹{singleJob?.salaryPerDay}/day
                </Badge>
              </div>
            </div>

            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg px-6 py-2 text-lg font-semibold transition ${isApplied
                  ? "bg-gray-300 text-gray-700 cursor-default"
                  : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
                }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          {/* Job Description */}
          <h1 className="border-b-2 border-b-gray-300 font-bold text-lg py-4 text-black">
            Job Description
          </h1>

          <div className="my-6 gap-4 font-semibold  ">
            {renderField("Project", singleJob?.title)}
            {renderField("Description", singleJob?.description)}
            {renderField("Project Type", singleJob?.projectType)}
            {renderField("Sub Project Type", singleJob?.subProjectType)}
            {renderArrayField("Genres", singleJob?.subGenres)}
            {renderField("Role Type", singleJob?.roleType)}
            {renderField("Role Name", singleJob?.roleName)}
            {renderField("Gender", singleJob?.gender)}
            {renderRangeField(
              "Age",
              singleJob?.age?.min,
              singleJob?.age?.max,
              " years"
            )}
            {renderRangeField(
              "Height",
              singleJob?.height?.min,
              singleJob?.height?.max
            )}
            {renderRangeField(
              "Weight",
              singleJob?.weight?.min,
              singleJob?.weight?.max,
              " kg"
            )}
            {renderArrayField("Skills Required", singleJob?.skills)}
            {renderField("Role Description", singleJob?.roleDescription)}
            {renderArrayField(
              "Media Requirements",
              singleJob?.mediaRequirement
            )}
            {renderField("Salary Per Day", `₹${singleJob?.salaryPerDay}`)}
            {renderField(
              "Expected Work Hours",
              `${singleJob?.expectedWorkHours} hours`
            )}
            {renderField(
              "Expected Completion Time",
              singleJob?.expectedCompletionTime
            )}
            {renderField(
              "Audition Type",
              singleJob?.specialSubmissionAuditions
            )}
          </div>

          {/* Audition Details */}
          {singleJob?.auditionDetails && (
            <div className="mt-6 bg-gray-50 p-5 rounded-lg shadow-md">
              <h2 className="font-semibold text-lg mb-3">
                🎭 Audition Details
              </h2>

              {singleJob?.specialSubmissionAuditions &&
                String(singleJob.specialSubmissionAuditions).trim() ===
                "Offline" ? (
                // 📌 Show only Location and Date for Offline Auditions
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {singleJob.auditionDetails.location && (
                    <h1 className="font-bold">
                      Location:{" "}
                      <span className="font-normal">
                        {singleJob.auditionDetails.location}
                      </span>
                    </h1>
                  )}
                  {singleJob.auditionDetails.date && (
                    <h1 className="font-bold">
                      Date:{" "}
                      <span className="font-normal">
                        {new Date(
                          singleJob.auditionDetails.date
                        ).toLocaleDateString()}
                      </span>
                    </h1>
                  )}
                </div>
              ) : (
                // 📌 Show Script Download & Video Upload for Online Auditions
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {singleJob.auditionDetails.script && (
                    <>
                      <h1 className="font-bold">Script:</h1>
                      <p

                        className="font-normal text-gray-600 "
                      >
                        {singleJob.auditionDetails.script}
                      </p>
                    </>
                  )}

                  <h1 className="font-bold">Upload Drive URL</h1> {/*upload video url */}
                  <input
                    type="text"
                    className="mt-2 p-2 border rounded-md w-full"
                    placeholder="Enter your audition video link"
                    value={driveUrl}
                    onChange={handleUrlChange} // Update state when user types
                    disabled={isApplied} // Disable if job is applied
                    style={{ backgroundColor: isApplied ? "#f3f3f3" : "white" }} // Light grey when disabled
                  />

                  <h1 className="font-bold">
                    Upload Audition Video (Max: 15MB)
                  </h1>
                  {/* <Button
                    type="file"
                    accept="video/*"
                    onClick={handleVideoUpload}
                    disabled={isUploading || !videoFile}
                    className="mt-2 p-2 border rounded-md w-full"
                  >
                    Upload Video
                  </Button> */}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="mt-2 p-2 border rounded-md w-full"
                  />
                  <Button onClick={handleVideoUpload}>Upload</Button>
                </div>
              )}
            </div>
          )}

          {/* Company Details */}
          <div className="mt-6 bg-gray-100 p-5 shadow-purple-300 shadow-lg rounded-lg">
            <h2 className="font-semibold text-lg mb-3">🏢 Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                "Company",
                company?.name || "Company name not available"
              )}
              {renderField(
                "Posted Date",
                singleJob?.createdAt
                  ? new Date(singleJob.createdAt).toLocaleDateString()
                  : null
              )}
              {renderField(
                "Description",
                company?.description || "No description available"
              )}
              {renderField(
                "Website",
                company?.website ? (
                  <a
                    href={company?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {company.website}
                  </a>
                ) : (
                  "No website available"
                )
              )}

              {renderField(
                "Total Applications",
                singleJob?.applications?.length
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;