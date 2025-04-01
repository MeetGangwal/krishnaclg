import { User } from "../Models/User.model.js";
import { Job } from "../Models/job.model.js";
import { Company } from "../Models/company.model.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { SendVerficationCode, Welcome_Email } from "../middlewares/Email.js";//added for email sendig 
import UnverifiedUser from "../Models/unverifiedUser.model.js"//added for non-verified emails

// register
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const files = req.files;
    const fileUri = getDataUri(req.files.profilePhoto[0]);
    const cloudResponse= await cloudinary.uploader.upload(fileUri.content);

    // Check if email already exists in UnverifiedUser
    const existingUnverifiedUser = await UnverifiedUser.findOne({ email });//added 
    if (existingUnverifiedUser) {
      return res.status(400).json({
        message: "Please signup after 10 min ",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User alerady exits with this email",
        success: false,
      });
    }


    const hasehedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();//added 
    const unverifiedUser = new UnverifiedUser({
      fullname,
      email,
      phoneNumber,
      password: hasehedPassword,
      role,
      verificationCode,
      profilePhoto: cloudResponse.secure_url,
    });
    await unverifiedUser.save();
    SendVerficationCode(email, verificationCode); // Send OTP

    return res.status(201).json({
      message: "Accoutn created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user in the temporary storage
    const unverifiedUser = await UnverifiedUser.findOne({ email });

    if (!unverifiedUser) {
      return res.status(400).json({ message: "User not found or OTP expired", success: false });
    }

    // Check OTP
    if (unverifiedUser.verificationCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    // Move user from `UnverifiedUsers` to `User` collection
    const newUser = new User({
      fullname: unverifiedUser.fullname,
      email: unverifiedUser.email,
      phoneNumber: unverifiedUser.phoneNumber,
      password: unverifiedUser.password,
      role: unverifiedUser.role,
      isVerified: true, // Mark user as verified
      profile: { profilePhoto: unverifiedUser.profilePhoto },
    });

    await newUser.save();

    // Remove user from temporary storage
    await UnverifiedUser.deleteOne({ email });

    return res.status(200).json({ message: "Email verified successfully! You can now log in.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    // ✅ Check if user is verified before proceeding
    if (!user.isVerified) {//added 
      return res.status(403).json({
        message: "User not verified. Please check your email and verify your account.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    //check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exits with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await JWT.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Corrected spelling here
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// LOGOUT
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find user by ID and populate the profile based on their role
    const userProfile = await User.findById(userId).populate("profile");

    if (!userProfile) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the user is an actor or director
    if (userProfile.role === "Actor") {
      // If it's an actor, return actor-specific data
      return res.status(200).json({ success: true, user: userProfile });
    } else if (userProfile.role === "Director") {
      // If it's a director, return director-specific data
      return res.status(200).json({ success: true, user: userProfile });
    } else {
      // If role is neither actor nor director
      return res.status(400).json({ success: false, message: "Invalid user role" });
    }
  } catch (error) {
    console.error("Error fetching user profile", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getAllActors = async (req, res) => {
  try {
    const actors = await User.find({ role: 'Actor' }); // Fetch all actors (You can modify this to filter by role or profile type)
    if (!actors.length) {
      return res.status(404).json({ success: false, message: "No actors found" });
    }
    res.status(200).json(actors); // Return all actors in the response
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllDirector = async (req, res) => {
  try {
    const actors = await User.find({ role: 'Director' }); // Fetch all actors (You can modify this to filter by role or profile type)
    if (!actors.length) {
      return res.status(404).json({ success: false, message: "No Director found" });
    }
    res.status(200).json(actors); // Return all actors in the response
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const {
      fullname,
      phoneNumber,
      dateOfBirth,
      gender,
      languagesSpoken,
      location,
      age,
      height,
      weight,
      skinTone,
      tattoosOrScars,
      actingExperience,
      skills,
      videosOnInternet,
      videos,
      instagramId,
      facebookId,
      webistelink,
      preferredRoles,
      bestActingIn,
      bio,
    } = req.body;

    // Convert fields to arrays if necessary
    const skillsArray = skills ? skills.split(",") : null;
    const languagesArray = languagesSpoken ? languagesSpoken.split(",") : null;
    const preferredRolesArray = preferredRoles ? preferredRoles.split(",") : null;
    const videosArray = videosOnInternet ? videosOnInternet.split(",") : null;
    //const videos = videos ? videos.split(",") : existingUser.profile.videos;

    // Upload profile photo and resume to Cloudinary
    // Upload profile photo to Cloudinary
    if (req.files?.profilePhoto?.length > 0) {
      console.log("Uploading profile photo...");
      const fileUri = getDataUri(req.files.profilePhoto[0]);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      existingUser.profile.profilePhoto = cloudResponse.secure_url;
    }

    // Upload photos with a limit of 5
    if (req.files?.photos && req.files.photos.length > 0) {
      const currentPhotos = existingUser.profile.photos || [];

      if (currentPhotos.length + req.files.photos.length > 5) {
        return res.status(400).json({ success: false, message: "You can only upload a maximum of 5 photos." });
      }

      for (const photoFile of req.files.photos) {
        const fileUri = getDataUri(photoFile);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        currentPhotos.push(cloudResponse.secure_url);
      }
      existingUser.profile.photos = currentPhotos;
    }

    // Update user profile fields
    existingUser.fullname = fullname || existingUser.fullname;
    existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber;
    existingUser.profile.dateOfBirth = dateOfBirth ||null;
    existingUser.profile.gender = gender ||null;//existingUser.profile.gender
    existingUser.profile.languagesSpoken = languagesArray ||null;
    existingUser.profile.location = location ||null;
    existingUser.profile.age = age ||null;
    existingUser.profile.height = height ||null;
    existingUser.profile.weight = weight ||null;
    existingUser.profile.skinTone = skinTone ||null;
    existingUser.profile.tattoosOrScars = tattoosOrScars ||null;
    existingUser.profile.actingExperience = actingExperience ||null;
    existingUser.profile.skills = skillsArray||null;
    existingUser.profile.videosOnInternet = videosArray ||null;
    existingUser.profile.videos = videos ||null;
    existingUser.profile.instagramId = instagramId ||null;
    existingUser.profile.facebookId = facebookId ||null;
    existingUser.profile.webistelink = webistelink ||null;
    existingUser.profile.preferredRoles = preferredRolesArray||null;
    existingUser.profile.bestActingIn = bestActingIn ||null;
    existingUser.profile.bio = bio ||null;


    await existingUser.save();
    return res.status(200).json({ success: true, message: "Profile updated successfully", user: existingUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const removePhoto = async (req, res) => {
  try {
    const userId = req.id;  // Extract user ID from token
    const { photoUrl } = req.body;  // Get photo URL to delete

    if (!photoUrl) {
      return res.status(400).json({ message: "Photo URL is required" });
    }

    // Extract public_id from Cloudinary URL
    const publicId = photoUrl.split("/").pop().split(".")[0];

    // Delete photo from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Update the user document in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { "profile.photos": photoUrl } },  // Remove the photo from array
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Photo deleted successfully", user: updatedUser });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDirectorProfile = async (req, res) => {
  try {
    const userId = req.id;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (existingUser.role !== "Director") {
      return res.status(403).json({ success: false, message: "Access denied. Only directors can update this profile." });
    }

    const { fullname, phoneNumber, bio, projects, awards ,skills ,instagramId,
      facebookId,webistelink, } = req.body;

    // Convert projects and awards to arrays if necessary
    const skillsArray = skills ? skills.split(",") : null;
    const projectsArray = projects ? projects.split(",") : null;
    const awardsArray = awards ? awards.split(",") : null;

    // Upload profile photo if provided
    if (req.files && req.files.profilePhoto && req.files.profilePhoto.length > 0) {
      console.log("Uploading profile photo...");
      const fileUri = getDataUri(req.files.profilePhoto[0]); // Access first file
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      existingUser.profile.profilePhoto = cloudResponse.secure_url;
    }

    // Update only director-related fields
    existingUser.fullname = fullname || existingUser.fullname;
    existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber;
    existingUser.profile.bio = bio || existingUser.profile.bio;
    existingUser.profile.projects = projectsArray || existingUser.profile.projects;
    existingUser.profile.awards = awardsArray || existingUser.profile.awards;
    existingUser.profile.skills = skillsArray||null;
    existingUser.profile.instagramId = instagramId ||null;
    existingUser.profile.facebookId = facebookId ||null;
    existingUser.profile.webistelink = webistelink ||null;

    await existingUser.save();
    return res.status(200).json({ success: true, message: "Director profile updated successfully", user: existingUser });
  } catch (error) {
    console.error("Error updating director profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteAccount = async (req, res) => {//added
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await Job.deleteMany({ created_by: userId });
    await Company.deleteMany({ userId: userId });


    await User.findByIdAndDelete(userId);

    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "Account deleted successfully." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to delete account" });
  }
};