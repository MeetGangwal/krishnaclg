// import React, { useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { RadioGroup } from "../ui/radio-group";
// import { Button } from "../ui/button";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUser } from "@/Redux/authSlice";
// import { Loader2 } from "lucide-react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { USER_API_END_POINT } from "@/util/constant";
// import Navbar from "./Navbar";

// const LandingPage = ({ isLogin }) => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "Actor",
//     file: null,
//   });

//   const location = useLocation();
//   const googleUser = location.state || {};
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const Loading = useSelector((store) => store.auth.loading);

//   // Handle Input Changes
//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   // Handle Google Login Success
//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       if (!credentialResponse.credential) {
//         throw new Error("Google credential is missing");
//       }
  
//       const decoded = jwtDecode(credentialResponse.credential);
//       console.log("Decoded Google User:", decoded);
  
//       const googleUser = {
//         fullname: decoded.name,
//         email: decoded.email,
//         profilePhoto: decoded.picture,
//       };
  
//       // Step 1: Check if user exists in the database
//       const res = await axios.post(`${USER_API_END_POINT}/check-user`, { email: googleUser.email });
  
//       if (res.data.exists) {
//         console.log("User exists, logging in...");
//         // Step 2: Log in the user with GoogleAuth
//         const loginRes = await axios.post(
//           `${USER_API_END_POINT}/login`,
//           {
//             email: googleUser.email,
//             password: "GoogleAuth", // Special GoogleAuth password
//             role: res.data.role
//           },
//           { withCredentials: true }
//         );
  
//         if (loginRes.data.success) {
//           dispatch(setUser(loginRes.data.user));
  
//           // Step 3: Navigate to correct page based on role
//           navigate(res.data.role === "Director" ? "/admin/companies" : "/Home");
//           toast.success("Logged in successfully!");
//         } else {
//           toast.error("Login failed. Please try again.");
//         }
//       } else {
//         console.log("New user, navigating to signup...");
//         navigate("/signup", { state: googleUser });
//       }
//     } catch (error) {
//       console.error("Google login error:", error);
//       toast.error("You have created your account by google");
//     }
//   };

//   // Handle Form Submission
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     dispatch(setLoading(true));
//     try {
//       if (isLogin) {
//         const res = await axios.post(`${USER_API_END_POINT}/login`, input, { withCredentials: true });
//         if (res.data.success) {
//           dispatch(setUser(res.data.user));
//           navigate(res.data.user.role === "Director" ? "/admin" : "/Home");
//           toast.success(res.data.message);
//         }
//       } else {
//         const formData = new FormData();
//         Object.keys(input).forEach((key) => formData.append(key, input[key]));
//         if (input.file) formData.append("profilePhoto", input.file);
//         const res = await axios.post(`${USER_API_END_POINT}/register`, formData, { withCredentials: true });
//         if (res.data.success) {
//           localStorage.setItem("userEmail", input.email);
//           navigate("/otp");
//           toast.success(res.data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       dispatch(setLoading(false));
//     }

//   };
//   useEffect(() => {
//     if (user) {
//       navigate(user.role === "Director" ? "/admin/companies" : "/Home");
//     }
//   }, [user, navigate]);
  

//   return (
//     <div>
//       <Navbar />
//     <div className="bg-[url('/public/authbgg.svg')] bg-cover min-h-screen flex items-center justify-center">
//       <form onSubmit={submitHandler} className="w-1/2 max-w-lg border border-white/30 rounded-xl p-6 bg-white/10 backdrop-blur-lg shadow-lg">
//         <h1 className="font-bold text-xl mb-5 text-center">{isLogin ? "Login" : "Sign Up"}</h1>
//         {!isLogin && (
//           <div className="my-2">
//             <Label>Full Name</Label>
//             <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} className="w-full p-2" />
//           </div>
//         )}
//         <div className="my-2">
//           <Label>Email</Label>
//           <Input type="email" name="email" value={input.email} onChange={changeEventHandler} className="w-full p-2" />
//         </div>
//         {!isLogin && (
//           <div className="my-2">
//             <Label>Contact No</Label>
//             <Input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="w-full p-2" />
//           </div>
//         )}
//         <div className="my-2">
//           <Label>Password</Label>
//           <Input type="password" name="password" value={input.password} onChange={changeEventHandler} className="w-full p-2" />
//         </div>
//         <RadioGroup className="flex items-center gap-4 my-5">
//           <div className="flex items-center">
//             <Input type="radio" name="role" value="Actor" checked={input.role === "Actor"} onChange={changeEventHandler} />
//             <Label>Actor</Label>
//           </div>
//           <div className="flex items-center">
//             <Input type="radio" name="role" value="Director" checked={input.role === "Director"} onChange={changeEventHandler} />
//             <Label>Director</Label>
//           </div>
//         </RadioGroup>
//         {!isLogin && (
//           <div className="my-2">
//             <Label>Profile Photo</Label>
//             <Input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer" />
//           </div>
//         )}
//         {Loading ? (
//           <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
//         ) : (
//           <Button type="submit" className="w-full my-4 hover:bg-white hover:text-black">{isLogin ? "Login" : "Sign Up"}</Button>
//         )}
//         <div className="text-sm text-center">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <Link to={isLogin ? "/signup" : "/login"} className="text-blue-400">{isLogin ? "Sign Up" : "Login"}</Link>
//         </div>
//         <div className="flex justify-center mt-4">
//           <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google authentication failed!")} />
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };
// export default LandingPage;

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../Shared/Navbar";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="text-black
      ">
      <Navbar />
      </div>
      

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 items-center gap-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-red-400">Make it happen</span> with{" "}
            <span className="text-purple-400">Star Connect</span>
          </h1>
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold">Top Talent Awaits</h3>
              <p className="text-gray-300">
                Find skilled professionals by browsing their portfolios and
                diving into the reviews on their profiles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Instant Bids</h3>
              <p className="text-gray-300">
                Receive rapid, commitment-free quotes from top freelancers. 80%
                of projects get bids within a minute.
              </p>
            </div>
          </div>
          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg"
            onClick={() => navigate("/login")} // Navigate to signup page
          >
            Get started now
          </Button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="public/Images/theater.jpg" alt="Star Connect showcase"
            className="rounded-lg shadow-xl w-full max-w-md"
          />
        </div>
      </section>

      {/* Bento Image Grid Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[200px]">
          <div className="col-span-2 md:col-span-3 row-span-2">
            <img
              src="public/Images/cinematic.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Western set"
            />
          </div>
          <div className="col-span-1 md:col-span-1 row-span-1">
            <img
              src="public/Images/img3.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Director clapper"
            />
          </div>
          <div className="col-span-1 md:col-span-2 row-span-1">
            <img
              src="public/Images/imgg1.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Action camera shot"
            />
          </div>
          <div className="col-span-1 md:col-span-2 row-span-1">
            <img
              src="public/Images/img5.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Red light camera"
            />
          </div>
          <div className="col-span-1 md:col-span-1 row-span-2">
            <img
              src="public/Images/imgggg.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Studio light"
            />
          </div>
          <div className="col-span-1 md:col-span-1 row-span-1">
            <img
              src="public/Images/imgg4.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Indoor shooting"
            />
          </div>
          <div className="col-span-2 md:col-span-3 row-span-1">
            <img
              src="public/Images/image6.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Behind the scenes"
            />
          </div>
          <div className="col-span-2 md:col-span-2 row-span-1">
            <img
              src="public/Images/imgg10.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Outdoor shoot"
            />
          </div>
          <div className="col-span-2 md:col-span-2 row-span-1">
            <img
              src="/Images/img14.jpg"
              className="h-full w-full object-cover rounded-lg"
              alt="Director in studio"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;