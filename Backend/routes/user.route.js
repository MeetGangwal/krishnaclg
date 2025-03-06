import express from "express";
import { login, logout, register, updateProfile , getUserProfile , getAllActors, getAllDirector,updateDirectorProfile,deleteAccount, removePhoto, verifyEmail} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/multer.js";
import { User } from "../Models/User.model.js";

const router = express.Router();

router.route("/register").post(multipleUpload,register);
router.route("/Verifyemail").post(verifyEmail);//added
router.post("/check-user", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (user) {
      return res.json({ exists: true, role: user.role });
    }
    res.json({ exists: false });
  });
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multipleUpload, updateProfile);
router.route("/profile/:id").get(getUserProfile);
router.route("/actors").get(getAllActors); // Fetch all actors
router.route("/director").get(getAllDirector);
router.route("/Director/profile/:id").get(getUserProfile);
router.route("/CDprofile/update").post(isAuthenticated,multipleUpload,updateDirectorProfile)
router.delete("/delete-account", isAuthenticated, deleteAccount);//added 
router.put("/profile/remove-photo", isAuthenticated, removePhoto);//added


export default router;