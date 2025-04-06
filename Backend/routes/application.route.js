// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
// const router = express.Router();

// router.route("/apply/:id").get(isAuthenticated, applyJob);
// router.route("/get").get(isAuthenticated, getAppliedJobs);
// router.route("/:id/applicants").get(isAuthenticated, getApplicants);
// router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

// export default router;

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    applyJob, 
    getApplicants, 
    getAppliedJobs, 
    updateStatus, 
    uploadAuditionVideo,  // New function for video upload
    getAuditionVideos // New function for fetching videos
} from "../controllers/application.controller.js";
import { videoUpload } from "../middlewares/multer.js"; // Import video upload middleware
import multer from "multer"; //addded for video url 

const router = express.Router();

const upload = multer(); // Add this for handling text fields
router.route("/apply/:id").post(isAuthenticated, upload.none(), applyJob);//added for video url
// router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

// **New Routes for Audition Video**
router.route("/:id/upload-audition").post(isAuthenticated, videoUpload, uploadAuditionVideo); // Upload video
router.route("/:id/audition-videos").get(isAuthenticated, getAuditionVideos); // Get uploaded videos

export default router;
