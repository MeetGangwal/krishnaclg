
import mongoose from "mongoose";
import { Application } from "../Models/application.model.js";
import { User } from "../Models/User.model.js "
import { Job } from "../Models/job.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { StatusEmail } from "../middlewares/StatusEmail.js"
import nodemailer from "nodemailer"

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    const urlvideo = req.body.urlvideo; // Extract audition video URL
    console.log("Extracted URL:", urlvideo); // Debugging line
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // If job is online and urlvideo is missing
    if (job.projectType === "Online" && !urlvideo) {
      return res.status(400).json({
        message: "Audition video URL is required for online jobs.",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      urlvideo: urlvideo || null, // Store URL if available  // Store the audition video URL

    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    // Ensure `urlvideo` is included in the response
    const applicationsWithVideo = job.applications.map(app => ({
      ...app.toObject(),
      urlvideo: app.urlvideo || null, // Ensure it’s included
    }));

    return res.status(200).json({
      job: { ...job.toObject(), applications: applicationsWithVideo },
      success: true,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // const application = await Application.findOne({ _id: applicationId });
    const application = await Application.findOne({ _id: applicationId }).populate("applicant"); // Populate actor details
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();
    StatusEmail(application.applicant.email, status); // Send OTP

    return res.status(200).json({
      message: "Status updated successfully & email sent..",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const uploadAuditionVideo = async (req, res) => {
  try {
    const jobId = req.params.id; // Job ID
    const userId = req.id; // Actor ID
    console.log("Job ID:", jobId);
    console.log("Actor ID:", userId);

    // Use findOne to retrieve a single application
    let application = await Application.find({ job: jobId, applicant: userId });

    if (!application) {
      console.log("No application found for Job ID:", jobId, "and Actor ID:", userId);
      return res.status(404).json({
        message: "Application not found for this job.",
        success: false,
      });
    }

    // Ensure file exists
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a video.",
        success: false,
      });
    }

    // Convert file to Data URI
    const fileUri = getDataUri(req.file);

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content,
      {
        resource_type: "video",
        folder: "audition_videos",
      }
    );
    console.log("✅ Upload successful:", cloudinaryResponse.secure_url);

    // Save video URL in the application model
    application.auditionVideo = cloudinaryResponse.secure_url;
    await application.save();

    return res.status(200).json({
      message: "Audition video uploaded successfully!",
      success: true,
      videoUrl: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


export const getAuditionVideos = async (req, res) => {
  try {
    const { id } = req.params; // Job ID

    // Fetch the job and populate applications with audition videos
    const job = await Job.findById(id).populate({
      path: "applications",
      populate: {
        path: "applicant",
        select: "name email", // Only fetch required details
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Map applications to return only audition videos
    const auditionVideos = job.applications
      .filter((app) => app.auditionVideo) // Only applications with videos
      .map((app) => ({
        applicant: app.applicant,
        videoUrl: app.auditionVideo,
      }));

    return res.status(200).json({
      success: true,
      auditionVideos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
