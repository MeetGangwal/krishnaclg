import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create default admin when the server starts
const createDefaultAdmin = async () => {
    const Admin = mongoose.model("Admin", AdminSchema);
    const existingAdmin = await Admin.findOne({ email: "admin@starconnect.com" });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("Admin@123", 10);
        await Admin.create({ email: "admin@starconnect.com", password: hashedPassword });
        console.log("✅ Default Admin Created: admin@starconnect.com / Admin@123");
    }
};

export const Admin = mongoose.model("Admin", AdminSchema);
export { createDefaultAdmin };
