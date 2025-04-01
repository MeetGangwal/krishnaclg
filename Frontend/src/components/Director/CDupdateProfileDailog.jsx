import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import { setUser } from "@/Redux/authSlice";

const CDUpdateProfileDailog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill),
    projects: user?.profile?.projects || "",
    // instagramId: user?.profile?.instagramId || "",
    instagramId: user?.instagramId,
    // facebookId: user?.profile?.facebookId || "",
    facebookId: user?.facebookId,
    awards: user?.profile?.awards || "",
    profilePhoto: null,
  });

  const [isDirty, setIsDirty] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setIsDirty(true); // Mark as dirty when a field is changed
  };

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (e.target.name === "profilePhoto") {
      setInput({ ...input, profilePhoto: file });
      setIsDirty(true); // Mark as dirty when a file is selected
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (input[key]) {
        if (Array.isArray(input[key])) {
          formData.append(key, input[key].join(",")); // Convert arrays to strings
        } else {
          formData.append(key, input[key]);
        }
      }
    });

    try {
      setLoading(true);
      const requiredFields = ["fullname", "email", "phoneNumber"];
      const missingFields = requiredFields.filter((field) => {
        const keys = field.split(".");

        let value = input;
        keys.forEach((key) => {
          value = value[key];
        });

        return !value;
      });

      if (missingFields.length > 0) {
        toast.error(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
        return;
      }

      const res = await axios.post(
        `${USER_API_END_POINT}/CDprofile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  const handleCloseDialog = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Do you really want to leave without saving?"
      );
      if (confirmLeave) {
        setOpen(false); // Close the dialog if confirmed
      }
    } else {
      setOpen(false); // Close the dialog if no changes were made
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (open) {
      setCurrentStep(1);
    }
    setInput({
      fullname: user.fullname || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      bio: user.profile?.bio || "",
      // skills: user.profile?.skills?.join(", ") || "",
      skills: user?.profile?.skills || [],
      instagramId: user?.profile?.instagramId || "",
      facebookId: user?.profile?.facebookId || "",
      projects: user.profile?.projects || "",
      contact: user.profile?.contact || "", // here reomve this and add insta and FB.
      awards: user.profile?.awards || "",
      profilePhoto: null, // You can update this based on how profile photos are managed
    });
    setIsDirty(false);
  }, [open, user]);

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent
        className="sm:max-w-[600px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form>
          {currentStep === 1 && (
            <div className="grid gap-4">
              <Label>Name</Label>
              <Input
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
              />
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
              />
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="grid gap-4">
              <Label>About Me</Label>
              <Input
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
              />
              <Label>Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
              />
              <Label>Projects</Label>
              <Input
                name="projects"
                value={input.projects}
                onChange={changeEventHandler}
              />
            </div>
          )}
          {currentStep === 3 && (
            <div className="grid gap-4">
              <Label  htmlFor="instagramId">Instagram ID</Label>
              <Input
                id="instagramId"
                name="instagramId"
                value={input.instagramId}
                onChange={changeEventHandler}
                placeholder="Enter Instagram Link"
                type="url"
              />
              <Label>Facebook ID</Label>
              <Input
                name="facebookId"
                value={input.facebookId}
                onChange={changeEventHandler}
              />
              <Label>Website</Label>
              <Input
                name="webistelink"
                value={input.webistelink}
                onChange={changeEventHandler}
              />
              <Label>Awards & Achievements</Label>
              <Input
                name="awards"
                value={input.awards}
                onChange={changeEventHandler}
              />
              <Label>Profile Photo</Label>
              <Input
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={fileChangeHandler}
              />
            </div>
          )}
          <DialogFooter>
            <div className="flex justify-end w-full py-4 gap-2">
              {currentStep > 1 && (
                <Button type="button" onClick={prevStep} className="w-auto">
                  Previous
                </Button>
              )}
              {currentStep < 3 ? (
                <Button type="button" onClick={nextStep} className="w-auto">
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={submitHandler} // Update should only happen on clicking this button
                  className="w-auto"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Update"
                  )}
                </Button>
              )}
              <Button
                type="button"
                onClick={handleCloseDialog}
                className="w-auto"
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CDUpdateProfileDailog;
