import express from "express";
import { getAdminStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/stats").get(getAdminStats);


export default router;
