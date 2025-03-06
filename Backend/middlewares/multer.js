// import multer from "multer"

// const storage = multer.memoryStorage();
// export const multipleUpload = multer({ storage }).fields([
//   { name: "profilePhoto", maxCount: 1 },
//   // { name: "resume", maxCount: 1 }
// ]);

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../utils/cloudinary.js"; // Import Cloudinary setup

// // Storage for general files (profile photos, logos, scripts) in memory
// const memoryStorage = multer.memoryStorage();

// // File filter function (keeps existing logic)
// const fileFilter = (req, file, cb) => {
//   if (
//     !file.mimetype.startsWith("image/") &&
//     ![
//       "application/pdf",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ].includes(file.mimetype)
//   ) {
//     return cb(new Error("Only image, PDF, or DOCX files are allowed!"), false);
//   }
//   cb(null, true);
// };

// // Multer for handling images, PDFs, and DOCX files
// const upload = multer({
//   storage: memoryStorage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Increased to 10MB
//   fileFilter,
// });

// // Cloudinary storage for audition videos
// const videoStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "audition_videos", // Cloudinary folder
//     resource_type: "video", // Video files only
//     allowed_formats: ["mp4", "mov", "avi", "mkv"],
//   },
// });

// // Multer for audition video uploads

// // Existing multiple file upload logic
// export const multipleUpload = upload.fields([
//   { name: "profilePhoto", maxCount: 1 },
//   { name: "logo", maxCount: 1 },
//   { name: "photos", maxCount: 5 },
//   { name: "script", maxCount: 1 }, // For script uploads
// ]);
// export const uploadVideo = multer({ storage: videoStorage }).single(
//   "auditionVideo"
// );



//claudeAI
// multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

// Memory storage for temporary file handling
const memoryStorage = multer.memoryStorage();

// File filter for videos
const videoFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
  
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only video files (MP4, MOV, AVI, MKV) are allowed!'), false);
  }
  cb(null, true);
};

// Configure video upload settings
const videoUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
    files: 1
  },
  fileFilter: videoFileFilter
}).single('auditionVideo');

// Keep existing multipleUpload configuration
export const multipleUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.startsWith("image/") &&
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.mimetype)
    ) {
      return cb(new Error("Only image, PDF, or DOCX files are allowed!"), false);
    }
    cb(null, true);
  }
}).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "logo", maxCount: 1 },
  { name: "photos", maxCount: 5 },
  { name: "script", maxCount: 1 },
]);

export { videoUpload };