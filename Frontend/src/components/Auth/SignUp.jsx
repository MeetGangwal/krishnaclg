import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/util/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/Redux/authSlice";
import { Loader2, Store } from "lucide-react";
import BackButton from "../Shared/BackButton";

const SignUp = () => {
  const location = useLocation();
  const googleUser = location.state || {}; // Get data if redirected from Google signup
  const [input, setInput] = useState({
    fullname: googleUser.fullname || "",
    email: googleUser.email || "",
    phoneNumber: "",
    password: googleUser.email ? "GoogleAuth" : "", // Pre-fill for Google users
  });
  const Loading = useSelector((Store) => Store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    // Append profile photo (must match backend field name)
    if (input.file) {
      formData.append("profilePhoto", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        localStorage.setItem("userEmail", input.email); //added
        navigate("/otp"); //change from login to otp
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-[url('/public/authbgg.svg')] bg-cover min-h-screen flex flex-col">
      <div className=" min-h-screen">
        <div className="mt-10">
          {/* <Navbar /> */}
          <div className="flex items-center justify-center  mx-auto mt-32 backdrop- text-black">
            <form
              onSubmit={submitHandler}
              className="w-1/2 max-w-lg border border-white/30 rounded-xl p-6 bg-white/10 backdrop-blur-lg shadow-lg "
            ><BackButton />
              <h1 className="font-bold text-xl text-center mb-5">SignUp</h1>
              <div className="my-2 ">
                <Label>Full Name</Label>
                <Input
                  className="w-full rounded-md p-2 bg-white/40 backdrop-blur-sm text-black focus:outline-none"
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder=""
                />
              </div>
              <div className="my-2 ">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder=""
                  className="w-full rounded-md p-2 bg-white/40 backdrop-blur-sm text-black focus:outline-none"
                  disabled={googleUser.email}
                />
              </div>
              <div className="my-2">
                <Label>Contact No</Label>
                <Input
                  type="text"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder=""
                  className="w-full rounded-md p-2 bg-white/40 backdrop-blur-sm text-black focus:outline-none"
                />
              </div>
              <div className="my-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder=""
                  className="w-full rounded-md p-2 bg-white/40 backdrop-blur-sm text-black focus:outline-none"
                  disabled={googleUser.email}
                />
              </div>

              <div className="flex flex-col gap-4">
                {/* Role Selection */}
                <RadioGroup className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="Actor"
                      checked={input.role === "Actor"}
                      onChange={changeEventHandler}
                      className="cursor-pointer"
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

                {/* Profile Photo Section */}
                <div className="flex flex-col gap-2">
                  <Label>Profile</Label>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="cursor-pointer text-white file:bg-white file:text-black file:px-4 file:rounded"
                  />
                </div>
              </div>

              {Loading.loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-transparent transition duration-300 ease-in-out transform hover:bg-white hover:scale-105 hover:shadow-lg hover:text-black"
                >
                  SignUp
                </Button>
              )}

              <span className="text-sm">
                Already have account?{" "}
                <Link to="/login" className="text-blue-400 ml-1">
                  Login
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
