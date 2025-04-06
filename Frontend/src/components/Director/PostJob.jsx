import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "../ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from "axios";
import { JOB_API_END_POINT } from "@/util/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "", description: "", projectType: "", roleType: "", subGenres: [],//changed  
    roleName: "", gender: "", subProjectType: "", age: { min: "", max: "" }, height: { min: "", max: "" },
    weight: { min: "", max: "" }, mediaRequirement: [], salaryPerDay: "", expectedWorkHours: "", roleDescription: "",
    expectedCompletionTime: "", expectedWorkTime: "", specialSubmissionAuditions: "",
    auditionDetails: {
      script: "",//added
      videoRequirement: false,//added
      location: "",
      date: "",
    }, company: "",
  });
  useGetAllCompanies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    const { name, value, checked, type } = e.target;

    if (name.startsWith("age")) {
      setInput((prev) => ({
        ...prev,
        age: { ...prev.age, [name.replace("age", "").toLowerCase()]: value },
      }));
    } else if (name.startsWith("height")) {
      setInput((prev) => ({
        ...prev,
        height: { ...prev.height, [name.replace("height", "").toLowerCase()]: value },
      }));
    } else if (name.startsWith("weight")) {
      setInput((prev) => ({
        ...prev,
        weight: { ...prev.weight, [name.replace("weight", "").toLowerCase()]: value },
      }));
    } else if (name === "mediaRequirement") {
      setInput((prev) => ({
        ...prev,
        mediaRequirement: checked
          ? [...prev.mediaRequirement, value]
          : prev.mediaRequirement.filter((item) => item !== value),
      }));
    }else if (name === "videoRequirement") {//added
      setInput((prev) => ({
        ...prev,
        videoRequirement: checked,
      }));
    }
     else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "title", "description", "projectType", "roleType", "roleName", "gender", "age.min", "age.max", "height.min", "height.max",
      "weight.min", "weight.max", "mediaRequirement",
      "salaryPerDay", "expectedWorkHours", "roleDescription",
      "expectedCompletionTime", "specialSubmissionAuditions","company",
    ];
    const missingFields = requiredFields.filter((field) => {
      const keys = field.split(".");
      let value = input;

      keys.forEach((key) => {
        value = value[key];
      });

      return !value; // Check if the field is empty or undefined
    });
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }
    const pathParts = window.location.pathname.split('/');
    const jobId = pathParts[pathParts.length - 1];
    const isEditMode = Boolean(jobId && jobId !== 'create');
    const flattenedInput = {//added
      ...input,
      company:input.company,
      ageMin: input.age.min,
      ageMax: input.age.max,
      heightMin: input.height.min,
      heightMax: input.height.max,
      weightMin: input.weight.min,
      weightMax: input.weight.max,
      auditionDetails: {
        type: input.specialSubmissionAuditions,
        script: input.script || null,
        videoRequirement: input.videoRequirement === true,//updated
        location: input.auditionLocation || null,
        date: input.auditionDate || null
      }
    };
    try {
      setLoading(true);
      const url = isEditMode
        ? `${JOB_API_END_POINT}/update/${jobId}`
        : `${JOB_API_END_POINT}/post`;

      const method = isEditMode ? 'put' : 'post';

      const res = await axios[method](url, flattenedInput, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchJobDetails = async (jobId) => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const job = res.data.job;

          // Map fetched job data to form fields
          setInput({
            title: job.title || "",
            description: job.description || "",
            projectType: job.projectType || "",
            roleType: job.roleType || "",
            subGenres: Array.isArray(job.subGenres) ? job.subGenres : [], // Ensure subGenres is an array
            roleName: job.roleName || "",
            gender: job.gender || "",
            subProjectType: job.subProjectType || "",
            age: job.age || { min: "", max: "" },
            height: job.height || { min: "", max: "" },
            weight: job.weight || { min: "", max: "" },
            mediaRequirement: Array.isArray(job.mediaRequirement) ? job.mediaRequirement : [],
            salaryPerDay: job.salaryPerDay || "",
            expectedWorkHours: job.expectedWorkHours || "",
            roleDescription: job.roleDescription || "",
            expectedCompletionTime: job.expectedCompletionTime || "",
            skills: job.skills || "",
            specialSubmissionAuditions: Array.isArray(job.specialSubmissionAuditions)
              ? job.specialSubmissionAuditions[0] || ""
              : "",///added for radio button 
            auditionLocation: job.auditionDetails?.location || "",
            videoRequirement:job.auditionDetails?.videoRequirement || false,//added
            script: job.auditionDetails?.script || "",//added
            auditionDate: job.auditionDetails?.date
              ? new Date(job.auditionDetails.date).toISOString().split("T")[0]
              : "",
              company: job.company || "", // Pre-select company
          });
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    const pathParts = window.location.pathname.split("/");
    const jobId = pathParts[pathParts.length - 1];
    if (jobId && jobId !== "create") {
      fetchJobDetails(jobId);
    }
  }, []);
  return (
    <div className="bg-main-bg min-h-screen">
      <div className="bg-overlay-bg min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center w-full my-5 px-4">
          <form
            onSubmit={submitHandler}
            className="p-8 w-full max-w-6xl border border-gray-200 shadow-lg rounded-md bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>PROJECT</Label>
                <Input name="title" value={input.title} onChange={changeEventHandler} className="w-full" />
              </div>
              <div>
                <Label>PROJECT DESCRIPTION </Label>
                <Input name="description" value={input.description} onChange={changeEventHandler} className="w-full" />
              </div>
              <div>
                <Label>Project Type</Label>
                <DropdownMenu name="projectType">
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">{input.projectType || "Select Project Type"}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["Film", "Digital Content", "TV Series", "Theater"].map((type) => (
                      <DropdownMenuItem key={type} onSelect={() => setInput({ ...input, projectType: type })}>
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Label>Role Type</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">{input.roleType || "Select Role"}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["Lead Role", "Supporting Role", "Background Role"].map((role) => (
                      <DropdownMenuItem key={role} onClick={() => setInput({ ...input, roleType: role })}>
                        {role}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {
                input.projectType === "Film" && (
                  <>
                    <div>
                      <Label>SELECT THE TYPE OF FILM</Label>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button className="w-full">{input.subProjectType || "Select Type"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {["Feature Film", "Short Film", "Documentary Film"].map((film) => (
                            <DropdownMenuItem key={film} onClick={() => setInput({ ...input, subProjectType: film })}>
                              {film}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                )
              }
              {
                input.projectType === "Digital Content" && (
                  <>
                    <div>
                      <Label>SELECT THE TYPE OF DIGITAL CONTENT</Label>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button className="w-full">{input.subProjectType || "Select Type"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {["TV Commercial", "Brand Promotion", "YouTube Series", "Live Streaming Events", "Online Skits & Comedy Shows"].map((digital) => (
                            <DropdownMenuItem key={digital} onClick={() => setInput({ ...input, subProjectType: digital })}>
                              {digital}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                )
              }
              {
                input.projectType === "TV Series" && (
                  <>
                    <div>
                      <Label>SELECT THE TYPE OF TV SERIES</Label>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button className="w-full">{input.subProjectType || "Select Project Type"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {["Reality Shows", "Talk Shows", "Documentary Series", "Game Shows"].map((tv) => (
                            <DropdownMenuItem key={tv} onClick={() => setInput({ ...input, subProjectType: tv })}>
                              {tv}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                )
              }
              {
                input.projectType === "Theater" && (
                  <>
                    <div>
                      <Label>SELECT THE TYPE OF THEATER</Label>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button className="w-full">{input.subProjectType || "Select Project Type"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {["Play", "Community Theater", "Children’s Theater", "Educational & School Productions"].map((theater) => (
                            <DropdownMenuItem key={theater} onClick={() => setInput({ ...input, subProjectType: theater })}>
                              {theater}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                )
              }
              <div>
                <Label>SELECT THE TYPE OF GENRES</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">
                      {Array.isArray(input.subGenres) && input.subGenres.length > 0
                        ? input.subGenres.join(", ")
                        : "Select Genres"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["DRAMA", "COMEDY", "SCIENCE FICTION", "FANTASY", "HORROR", "THRILLER", "WESTERN", "MUSICAL","ACTION","ADVENTURE","ROMANCE","MYSTERY","CRIME","HISTORICAL","SUPERHERO","ANIMATION","DOCUMENTARY"].map((genre) => (
                      <DropdownMenuItem key={genre} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={input.subGenres.includes(genre)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setInput((prev) => ({
                              ...prev,
                              subGenres: isChecked
                                ? [...prev.subGenres, genre]
                                : prev.subGenres.filter((g) => g !== genre),
                            }));
                          }}
                        />
                        <span>{genre}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Label>ROLL NAME</Label>
                <Input name="roleName" value={input.roleName} onChange={changeEventHandler} className="w-full" />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup className=" py-4 flex" value={input.gender} onValueChange={(value) => setInput({ ...input, gender: value })}>
                  <div className="space-y-2">
                    <RadioGroupItem value="Male" id="Male" />
                    <Label htmlFor="day" className="pl-2">Male</Label>
                  </div>
                  <div className="space-y-2 pl-6">
                    <RadioGroupItem value="Female" id="Female" />
                    <Label htmlFor="week" className="pl-2">Female</Label>
                  </div>
                  <div className="space-y-2 pl-6">
                    <RadioGroupItem value="Other" id="Other" />
                    <Label htmlFor="month" className="pl-2">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Age Range</Label>
                <div className="flex gap-4">
                  <Input type="number"  min="0" placeholder="Min" value={input.age.min} name="ageMin" onChange={changeEventHandler} className="w-1/2" />
                  <Input type="number"  min="0" placeholder="Max" value={input.age.max} name="ageMax" onChange={changeEventHandler} className="w-1/2" />
                </div>
              </div>
              <div>
                <Label>HEIGHT In Centimeter</Label>
                <div className="flex gap-4">
                  <Input type="number" min="20" placeholder="Min" value={input.height.min} name="heightMin" onChange={changeEventHandler} className="w-full" />
                  <Input type="number" min="20" placeholder="Max" value={input.height.max} name="heightMax" onChange={changeEventHandler} className="w-full" />
                </div>
              </div>
              <div>
                <Label>WEIGHT</Label>
                <div className="flex gap-4">
                  <Input type="number"  min="1" placeholder="Min" value={input.weight.min} name="weightMin" onChange={changeEventHandler} className="w-full" />
                  <Input type="number"  min="1" placeholder="Max" value={input.weight.max} name="weightMax" onChange={changeEventHandler} className="w-full" />
                </div>
              </div>
              <div>
                <Label>SKILLS</Label>
                <Input type="string" name="skills" value={input.skills} onChange={changeEventHandler} className="w-full" min="0" />
              </div>
              <div>
                <Label>ROLE DESCRIPTION</Label>
                <Input name="roleDescription" value={input.roleDescription} onChange={changeEventHandler} className="w-full" />
              </div>
              <div className="flex gap-4">
                <Label>Media Requirement</Label>
                {["Headshot", "Video", "Photo"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="mediaRequirement"
                      value={option}
                      checked={input.mediaRequirement.includes(option)}
                      onChange={changeEventHandler}
                    />
                    <span >{option}</span>
                  </label>
                ))}
              </div>
              <div>
                <Label>SALLARY PER DAY</Label>
                <Input name="salaryPerDay" value={input.salaryPerDay} onChange={changeEventHandler} className="w-full" />
              </div>
              <div>
                <Label>EXPECTED WORK HRS </Label>
                <Input name="expectedWorkHours" value={input.expectedWorkHours} onChange={changeEventHandler} className="w-full" min="0" />
              </div>
              <div>
                <Label>Expected Completion Time</Label>
                <RadioGroup className="grid grid-cols-2 py-4 " name="expectedCompletionTime" value={input.expectedCompletionTime} onValueChange={(value) => setInput({ ...input, expectedCompletionTime: value })}>
                  <div className="space-y-2 ">
                    <RadioGroupItem value="Less than a day" id="day" />
                    <Label htmlFor="day" className="pl-2">Less than a day</Label>
                  </div>
                  <div className="space-y-2">
                    <RadioGroupItem value="Less than a week" id="week" />
                    <Label htmlFor="week" className="pl-2">Less than a week</Label>
                  </div>
                  <div className="space-y-2">
                    <RadioGroupItem value="Less than a month" id="month" />
                    <Label htmlFor="month" className="pl-2">Less than a month</Label>
                  </div>
                  <div className="space-y-2">
                    <RadioGroupItem value="More than a month" id="more" />
                    <Label htmlFor="more" className="pl-2">More than a month</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Special Submission Auditions</Label>
                <RadioGroup
                  value={input.specialSubmissionAuditions}
                  onValueChange={(value) => setInput({ ...input, specialSubmissionAuditions: value })} className="flex py-5">
                  <RadioGroupItem value="Online" id="online" />
                  <Label htmlFor="online">Online</Label>
                  <RadioGroupItem value="Offline" id="offline" />
                  <Label htmlFor="offline">Offline</Label>
                </RadioGroup>
              </div>
              {input.specialSubmissionAuditions === "Online" && (//added in line 462and 466
                <>
                  <div>
                    <Label>Upload Audition Script</Label>
                    <Input type="text" value={input.script} name="script" onChange={changeEventHandler} />{/*added  */}
                  </div>
                  <div>
                    <Label>Receive Audition Video</Label>
                    <Input type="checkbox" name="videoRequirement" onChange={changeEventHandler} checked={input.videoRequirement} />
                  </div>
                </>
              )}
              {input.specialSubmissionAuditions === "Offline" && (
                <>
                  <div>
                    <Label>Audition Location</Label>
                    <Input name="auditionLocation" value={input.auditionLocation} onChange={changeEventHandler} className="w-full" />
                  </div>
                  <div>
                    <Label>Audition Date</Label>
                    <Input type="date" name="auditionDate" value={input.auditionDate} onChange={changeEventHandler} className="w-full" />
                  </div>
                </>
              )}
              <div>
                <Label>Select the Company</Label>
                {companies.length > 0 && (
                  <Select
                    onValueChange={(value) => setInput({ ...input, company: value })}
                    value={input.company} // Ensure this is bound to the state
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem key={company._id} value={company._id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>

            </div>
            <div className="mt-6">
              {loading ? (
                <Button className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Post New Job
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;