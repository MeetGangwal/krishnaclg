import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verficationCode:{//added 
      type:String,
    },
    isVerified:{//added 
      type:Boolean,
      default:false,
    },
    role: {
      type: String,
      enum: ["Actor", "Director"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],

      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: { type: String },
      
      // Personal Information
      dateOfBirth: { type: Date },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      languagesSpoken: [{ type: String }],
      location: { type: String },
      
      // Physical Attributes
      age: { type: Number },
      height: { type: Number },//added for string to number 
      weight: { type: Number },//added from string to number 
      skinTone: { type: String },
      tattoosOrScars: { type: String,enum:["Yes" , "No"] },
      
      // Professional Details
      actingExperience: { type: String },
      videosOnInternet: [{ type: String }], // URLs to videos
      videos: [{ type: String }], // URLs to uploaded videos
      
      // Media & Portfolio
      instagramId: { type: String },
      facebookId: { type: String },
      photos: [{ type: String }],
      webistelink: {type:String},
      
      // Preferences
      preferredRoles: [{ type: String }], // e.g., Lead, Supporting, Background
      bestActingIn: { type: String },

      // Only Director
      projects:[{type:String}],
      awards:[{type:String}],

       // Add the quizCompleted field
      // quizCompleted: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);