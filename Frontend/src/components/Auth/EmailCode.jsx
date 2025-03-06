import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant.js";
import { toast } from "sonner";

const EmailCode = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail"); // Retrieve stored email

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found, please sign up again.");
      navigate("/signup");
      return;
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/Verifyemail`, { email, otp });

      if (res.data.success) {
        toast.success("Email verified successfully! You can now log in.");
        localStorage.removeItem("userEmail"); // Clear stored email
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error verifying email");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-indigo-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">OTP Verification</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailCode;