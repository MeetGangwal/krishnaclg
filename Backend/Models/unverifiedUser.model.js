import mongoose from "mongoose";

const unverifiedUserSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  password: String,
  role: String,
  verificationCode: String, // Stores OTP
  profilePhoto: String, // Cloudinary URL
  createdAt: { type: Date, expires: "10m", default: Date.now }, // Auto-delete after 10 mins
});

export default mongoose.model("UnverifiedUser", unverifiedUserSchema);