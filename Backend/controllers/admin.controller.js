import {User} from "../Models/User.model.js";
import {Job} from "../Models/job.model.js";
import { Application } from "../Models/application.model.js";

export const getAdminStats = async (req, res) => {
    try {
        const totalActors = await User.countDocuments({ role: 'Actor' });
        const totalDirectors = await User.countDocuments({ role: 'Director' });
        const totalJobs = await Job.countDocuments();
        const activeJobs = await Job.countDocuments({ status: "Active" });
        const inactiveJobs = await Job.countDocuments({ status: "Inactive" });
        const totalApplications = await Application.countDocuments();
        const latestUsers = await User.find().sort({ createdAt: -1 }).limit(5);
        const recentApplications = await Application.find().sort({ createdAt: -1 }).limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalActors,
                totalDirectors,
                totalJobs,
                activeJobs,
                inactiveJobs,
                totalApplications,
                latestUsers,
                recentApplications
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
