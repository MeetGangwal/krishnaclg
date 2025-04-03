// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { LogOut, Trash, User2 } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/util/constant";
// import { setUser } from "@/Redux/authSlice";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activePage, setActivePage] = useState("/");

//   useEffect(() => {
//     setActivePage(location.pathname);
//   }, [location.pathname]);

//   const profilePath = user?.role === "Director" ? `/admin/CDprofile/${user._id}` : "/profile";

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const deleteAccountHandler = async () => {
//     if (!user) return;
//     if (!window.confirm("Are you sure? This action is irreversible!")) return;
//     try {
//       const res = await axios.delete(`${USER_API_END_POINT}/delete-account`, { withCredentials: true });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete account");
//     }
//   };

//   return (
//     <motion.div 
//       className="pt-5 w-full z-20 bg-transparent"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="flex items-center justify-between mx-auto max-w-[1200px] h-16 px-4">
//         {/* Logo */}
//         <motion.div className="w-180" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
//           <Link to={user?.role === "Director" ? "/admin" : "/Home"}>
//             <img src="/Images/STARCONNECT.svg" alt="StarConnect Logo" className="w-[180px] max-w-fit" />
//           </Link>
//         </motion.div>

//         {/* Navigation */}
//         <motion.ul 
//           className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-white font-bold text-lg"
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ delay: 0.5 }}
//         >
//           {user && user.role === "Director"
//             ? ["/admin", "/admin/Companies", "/admin/jobs", "/admin/TALENT"].map((path, index) => (
//                 <motion.li key={index} whileHover={{ scale: 1.1 }}>
//                   <Link to={path} className={`pb-1 ${activePage === path ? "border-b-2 border-white" : "hover:border-b-2 hover:border-white"}`}>{
//                     path === "/admin" ? "HOME" : path.split("/admin/")[1].toUpperCase()
//                   }</Link>
//                 </motion.li>
//               ))
//             : ["/", "/JOBS", "/ACTORS", "/DIRECTOR"].map((path, index) => (
//                 <motion.li key={index} whileHover={{ scale: 1.1 }}>
//                   <Link to={path} className={`pb-1 ${activePage === path ? "border-b-2 border-white" : "hover:border-b-2 hover:border-white"}`}>{
//                     path === "/" ? "HOME" : path.replace("/", "")
//                   }</Link>
//                 </motion.li>
//               ))}
//         </motion.ul>

//         {/* Profile & Authentication */}
//         <div className="flex items-center justify-end">
//           {!user ? (
//             <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//               <Link to="/Login">
//                 <Button variant="outline" whileHover={{ scale: 1.05 }}>Login</Button>
//               </Link>
//               <Link to="/SignUp">
//                 <Button whileHover={{ scale: 1.05 }}>SignUp</Button>
//               </Link>
//             </motion.div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <motion.div whileHover={{ scale: 1.1 }}>
//                   <Avatar>
//                     <AvatarImage src={user?.profile?.profilePhoto} />
//                   </Avatar>
//                 </motion.div>
//               </PopoverTrigger>
//               <PopoverContent className="w-80" asChild>
//                 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
//                   <div className="flex gap-4">
//                     <Avatar className="object-cover"><AvatarImage src={user?.profile?.profilePhoto} /></Avatar>
//                     <div>
//                       <h4 className="font-medium">{user?.fullname}</h4>
//                       <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
//                     </div>
//                   </div>
//                   <div className="my-2">
//                     <div className="flex items-center gap-2">
//                       <User2 />
//                       <Button variant="link"><Link to={profilePath}>View profile</Link></Button>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <LogOut />
//                       <Button onClick={logoutHandler} variant="link">Logout</Button>
//                     </div>
//                     <div className="flex items-center gap-2 text-red-500">
//                       <Trash />
//                       <Button onClick={deleteAccountHandler} variant="link">Delete Account</Button>
//                     </div>
//                   </div>
//                 </motion.div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Trash, User2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { setUser } from "@/Redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState("/");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const profilePath = user?.role === "Director" ? `/admin/CDprofile/${user._id}` : "/profile";

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteAccountHandler = async () => {
    if (!user) return;
    if (!window.confirm("Are you sure? This action is irreversible!")) return;
    try {
      const res = await axios.delete(`${USER_API_END_POINT}/delete-account`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <motion.div 
      className="pt-5 w-full z-20 bg-transparent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mx-auto max-w-[1200px] h-16 px-4">
        {/* Logo */}
        <motion.div className="w-180" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Link to={user ? (user.role === "Director" ? "/admin" : "/Home") : "/"}>
            <img src="/Images/STARCONNECT.svg" alt="StarConnect Logo" className="w-[180px] max-w-fit" />
          </Link>
        </motion.div>

        {/* Show Login/Signup Only on Landing Page and No User */}
        {!user && location.pathname === "/" ? (
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link to="/Login">
              <Button variant="outline" whileHover={{ scale: 1.05 }}>Login</Button>
            </Link>
            <Link to="/SignUp">
              <Button whileHover={{ scale: 1.05 }}>Sign Up</Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Navigation */}
            <motion.ul 
              className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-white font-bold text-lg"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
            >
              {user?.role === "Director"
                ? ["/admin", "/admin/Companies", "/admin/jobs", "/admin/TALENT"].map((path, index) => (
                    <motion.li key={index} whileHover={{ scale: 1.1 }}>
                      <Link to={path} className={`pb-1 ${activePage === path ? "border-b-2 border-white" : "hover:border-b-2 hover:border-white"}`}>{
                        path === "/admin" ? "HOME" : path.split("/admin/")[1].toUpperCase()
                      }</Link>
                    </motion.li>
                  ))
                : ["/Home", "/JOBS", "/ACTORS", "/DIRECTOR"].map((path, index) => (
                    <motion.li key={index} whileHover={{ scale: 1.1 }}>
                      <Link to={path} className={`pb-1 ${activePage === path ? "border-b-2 border-white" : "hover:border-b-2 hover:border-white"}`}>{
                        path === "/Home" ? "HOME" : path.replace("/", "")
                      }</Link>
                    </motion.li>
                  ))}
            </motion.ul>

            {/* Profile & Authentication */}
            <div className="flex items-center justify-end">
              <Popover>
                <PopoverTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent className="w-80" asChild>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                    <div className="flex gap-4">
                      <Avatar className="object-cover"><AvatarImage src={user?.profile?.profilePhoto} /></Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className="my-2">
                      <div className="flex items-center gap-2">
                        <User2 />
                        <Button variant="link"><Link to={profilePath}>View profile</Link></Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                      </div>
                      <div className="flex items-center gap-2 text-red-500">
                        <Trash />
                        <Button onClick={deleteAccountHandler} variant="link">Delete Account</Button>
                      </div>
                    </div>
                  </motion.div>
                </PopoverContent>
              </Popover>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;



// import React, { useState } from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { LogOut, Trash, User2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/util/constant";
// import { setUser } from "@/Redux/authSlice";

// // disappare of login and signup button after its process is left other then this most of stuff is done
// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const profilePath =
//     user?.role === "Director"
//       ? `/admin/CDprofile/${user._id}` // Director Profile
//       : "/profile"; // Actor Profile
   
//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     };
  
//   };

//   const deleteAccountHandler = async () => {//added 
//     if (!user) return;
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your account? This action cannot be undone."
//     );
//     if (!confirmDelete) return;
  
//     try {
//       const res = await axios.delete(`${USER_API_END_POINT}/delete-account`, {
//         withCredentials: true,
//       });
  
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to delete account");
//     }
//   };

//   return (
//     <div className="pt-5 w-full z-20 bg-transparent">
//   <div className="flex items-center justify-between mx-auto max-w-[1200px] h-16 px-4">
//     {/* Logo */}
//     <div className="w-180">
//       <Link to={user?.role === "Director" ? "/admin" : "/"} className="inline-block">
//         <img
//           src="/Images/STARCONNECT.svg"
//           alt="StarConnect Logo"
//           className="w-[180px] max-w-fit"
//         />
//       </Link>
//     </div>

//     {/* Navigation Centered */}
//     <div className="absolute left-1/2 -translate-x-1/2 flex-1 flex justify-center pl-8">
//       <ul className="flex gap-6 items-center text-white font-bold text-lg">
//         {user && user.role === "Director" ? (
//           <>
//             <li><Link to="/admin">HOME</Link></li>
//             <li><Link to="/admin/Companies">COMPANIES</Link></li>
//             <li><Link to="/admin/jobs">JOBS</Link></li>
//             <li><Link to="/admin/FindTalent">TALENTS</Link></li>
//           </>
//         ) : (
//           <>
//             <li><Link to="/">HOME</Link></li>
//             <li><Link to="/JOBS">JOBS</Link></li>
//             <li><Link to="/NEWS">NEWS</Link></li>
//             <li><Link to="/FindDirector">DIRECTORS</Link></li>
//           </>
//         )}
//       </ul>
//     </div>

//     {/* Profile & Authentication Buttons on Right */}
//     <div className="w-fit flex items-center justify-end">
//       {!user ? (
//         <div className="flex items-center gap-2">
//           <Link to={"/Login"}>
//             <Button variant="outline" className="text-black rounded">
//               Login
//             </Button>
//           </Link>
//           <Link to={"/SignUp"}>
//             <Button className="text-white rounded">SignUp</Button>
//           </Link>
//         </div>
//       ) : (
//         <Popover>
//           <PopoverTrigger asChild>
//             <Avatar className="cursor-pointer object-cover ">
//               <AvatarImage className="object-cover" src={user?.profile?.profilePhoto} />
//             </Avatar>
//           </PopoverTrigger>
//           <PopoverContent className="w-80">
//             <div className="flex gap-4 space-y-2">
//               <Avatar className="cursor-pointer">
//                 <AvatarImage src={user?.profile?.profilePhoto} />
//               </Avatar>
//               <div>
//                 <h4 className="font-medium">{user?.fullname}</h4>
//                 <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
//               </div>
//             </div>
//             <div className="flex flex-col my-2 text-gray-600">
//               <div className="flex w-fit items-center gap-2 cursor-pointer">
//                 <User2 />
//                 <Button variant="link">
//                   <Link to={profilePath}>View profile</Link>
//                 </Button>
//               </div>
//               <div className="flex w-fit items-center gap-2 cursor-pointer">
//                 <LogOut />
//                 <Button onClick={logoutHandler} variant="link">
//                   Logout
//                 </Button>
//               </div>
//               <div className="flex w-fit items-center gap-2 cursor-pointer">
//                 <Trash />
//                 <Button onClick={deleteAccountHandler} variant="link" className="text-red-500">
//                   Delete Account
//                 </Button>
//               </div>
//             </div>
//           </PopoverContent>
//         </Popover>
//       )}
//     </div>
//   </div>
// </div>

//   );
// };

// export default Navbar;
