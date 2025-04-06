// import React, { useState } from "react";
// import Navbar from "../Shared/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { RadioGroup } from "../ui/radio-group";
// import { Button } from "../ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/util/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUser } from "@/Redux/authSlice";
// import { Loader2 } from "lucide-react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import BackButton from "../Shared/BackButton";

// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//   });
//   const Loading = useSelector((store) => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

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
//           navigate(res.data.role === "Director" ? "/admin/" : "/Home");
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
//   // const predefinedAdmin = {
//   //   email: "admin@example.com",
//   //   password: "admin123",
//   // };


//   // const submitHandler = async (e) => {
//   //   e.preventDefault();
//   //   if (//added this to check if the user is admin
//   //     input.email === predefinedAdmin.email &&
//   //     input.password === predefinedAdmin.password
//   //   ) {
//   //     toast.success("Admin logged in successfully!");
//   //     navigate("/adminpanel"); // Ensure this matches the correct admin route
//   //     return;
//   //   }
//   //   try {
//   //     dispatch(setLoading(true));
//   //     const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       withCredentials: true,
//   //     });
  
//   //     if (res.data.success) {
//   //       const user = res.data.user;
//   //       dispatch(setUser(user));
  
//   //       // Redirect based on user role
//   //       if (user.role === "Director") {
//   //         navigate("/admin"); // Change this to your actual CD-Home route
//   //       } else {
//   //         navigate("/Home");
//   //       }
  
//   //       toast.success(res.data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error(error.response?.data?.message || "Login failed");
//   //   } finally {
//   //     dispatch(setLoading(false));
//   //   }
//   // };
//   const predefinedAdmin = {
//     email: "admin@example.com",
//     password: "admin123",
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Check for hardcoded admin login
//     if (
//       input.email === predefinedAdmin.email &&
//       input.password === predefinedAdmin.password
//     ) {
//       toast.success("Admin logged in successfully!");
//       navigate("/adminpanel"); // Ensure this matches the correct admin route
//       return;
//     }

//     try {
//       dispatch(setLoading(true));

//       const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         const user = res.data.user;
//         dispatch(setUser(user));

//         // Redirect based on user role
//         if (user.role === "Director") {
//           navigate("/admin"); // Director dashboard route
//         } else if (user.role === "Actor") {
//           navigate("/Home"); // Actor home
//         } else {
//           toast.error("Access denied. Only valid roles can log in.");
//         }

//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="bg-[url('/public/authbggg.svg')] bg-cover min-h-screen flex flex-col ">
//       <div className="min-h-screen">
//         <div className="mt-10">
//                   {/* <Navbar /> */}
                  
//         <div className="flex items-center justify-center  mx-auto mt-36  backdrop- text-black">
          
//           <form
//             onSubmit={handleLogin}
//             className="w-1/2 max-w-lg border border-white/30 rounded-xl p-6 bg-white/10 backdrop-blur-lg shadow-lg"
//           ><BackButton />
//             <h1 className="font-bold text-xl mb-5 text-center">Login </h1>

//             <div className="my-2 ">
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 value={Input.fullemail}
//                 name="email"
//                 onChange={changeEventHandler}
//                 placeholder="Starconnect@gmail.com"
//                 className="w-full rounded-md p-2 bg-white/40 backdrop-blur-sm text-black focus:outline-none"
//               />
//             </div>

//             <div className="my-2 ">
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 value={Input.password}
//                 name="password"
//                 onChange={changeEventHandler}
//                 placeholder="**********"
//                 className="w-full rounded-md p-2 bg-white/40 backdrop-blur-sm text-black focus:outline-none"
//               />
//             </div>

//             <div className="flex items-center justify-between ">
//               <RadioGroup className="flex items-center gap-5 my-5">
//                 <div className="flex items-center space-x-2 ">
//                   <Input
//                     type="radio"
//                     name="role"
//                     value="Actor"
//                     checked={input.role === "Actor"}
//                     onChange={changeEventHandler}
//                     className="cursor-pointer "
//                   />
//                   <Label htmlFor="r1">Actor</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     type="radio"
//                     name="role"
//                     value="Director"
//                     checked={input.role === "Director"}
//                     onChange={changeEventHandler}
//                     className="cursor-pointer"
//                   />
//                   <Label htmlFor="r2">Director</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//             <div className="flex justify-center">

//             {Loading.loading ? (
//               <Button className="w-full my-4 ">
//                 {" "}
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full my-4 bg-transparent transition duration-300 ease-in-out transform hover:bg-white hover:scale-105 hover:shadow-lg hover:text-black">
//                 Login
//               </Button>
//             )}
//             </div>
//             <span className="text-sm gap-2 flex">
//               Don't have account ? {" "}
//               <Link to="/SignUp" className="text-blue-400 ml-1">
//                 SignUp
//               </Link>
//             </span >
//             <div className="flex justify-center mt-4">
//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={() => toast.error("Google authentication failed!")}
//             />
//           </div>
//             {/* <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google authentication failed!")} /> */}
//           </form>
//         </div>
//       </div>
//     </div>
//         </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/Redux/authSlice";
import { Loader2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import BackButton from "../Shared/BackButton";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const Loading = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Google credential is missing");
      }
  
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google User:", decoded);
  
      const googleUser = {
        fullname: decoded.name,
        email: decoded.email,
        profilePhoto: decoded.picture,
      };
  
      // Step 1: Check if user exists in the database
      const res = await axios.post(`${USER_API_END_POINT}/check-user`, { email: googleUser.email });
  
      if (res.data.exists) {
        console.log("User exists, logging in...");
        // Step 2: Log in the user with GoogleAuth
        const loginRes = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            email: googleUser.email,
            password: "GoogleAuth", // Special GoogleAuth password
            role: res.data.role
          },
          { withCredentials: true }
        );
  
        if (loginRes.data.success) {
          dispatch(setUser(loginRes.data.user));
  
          // Step 3: Navigate to correct page based on role
          navigate(res.data.role === "Director" ? "/admin/companies" : "/");
          toast.success("Logged in successfully!");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        console.log("New user, navigating to signup...");
        navigate("/signup", { state: googleUser });
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("You have created your account by google");
    }
  };

  const predefinedAdmin = {
    email: "admin@example.com",
    password: "admin123",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for hardcoded admin login
    if (
      input.email === predefinedAdmin.email &&
      input.password === predefinedAdmin.password
    ) {
      toast.success("Admin logged in successfully!");
      navigate("/adminpanel"); // Ensure this matches the correct admin route
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        const user = res.data.user;
        dispatch(setUser(user));

        // Redirect based on user role
        if (user.role === "Director") {
          navigate("/admin"); // Director dashboard route
        } else if (user.role === "Actor") {
          navigate("/Home"); // Actor home
        } else {
          toast.error("Access denied. Only valid roles can log in.");
        }

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-[url('/public/authbggg.svg')] bg-cover min-h-screen flex flex-col ">
      <div className="min-h-screen">
        <div className="mt-10">
                  {/* <Navbar /> */}
                  
        <div className="flex items-center justify-center  mx-auto mt-36  backdrop- text-black">
          
          <form
            onSubmit={handleLogin}
            className="w-1/2 max-w-lg border border-white/30 rounded-xl p-6 bg-white/10 backdrop-blur-lg shadow-lg"
          >
            <BackButton navigateTo="/" /> {/* Updated BackButton */}
            <h1 className="font-bold text-xl mb-5 text-center">Login </h1>

            <div className="my-2 ">
              <Label>Email</Label>
              <Input
                type="email"
                value={Input.fullemail}
                name="email"
                onChange={changeEventHandler}
                placeholder="Starconnect@gmail.com"
                className="w-full rounded-md p-2 bg-white/40 backdrop-blur-sm text-black focus:outline-none"
              />
            </div>

            <div className="my-2 ">
              <Label>Password</Label>
              <Input
                type="password"
                value={Input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="**********"
                className="w-full rounded-md p-2 bg-white/40 backdrop-blur-sm text-black focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between ">
              <RadioGroup className="flex items-center gap-5 my-5">
                <div className="flex items-center space-x-2 ">
                  <Input
                    type="radio"
                    name="role"
                    value="Actor"
                    checked={input.role === "Actor"}
                    onChange={changeEventHandler}
                    className="cursor-pointer "
                  />
                  <Label htmlFor="r1">Actor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="Director"
                    checked={input.role === "Director"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Director</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex justify-center">

            {Loading.loading ? (
              <Button className="w-full my-4 ">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-transparent transition duration-300 ease-in-out transform hover:bg-white hover:scale-105 hover:shadow-lg hover:text-black">
                Login
              </Button>
            )}
            </div>
            <span className="text-sm gap-2 flex">
              Don't have account ? {" "}
              <Link to="/SignUp" className="text-blue-400 ml-1">
                SignUp
              </Link>
            </span >
            <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google authentication failed!")}
            />
          </div>
            {/* <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google authentication failed!")} /> */}
          </form>
        </div>
      </div>
    </div>
        </div>
  );
};

export default Login;