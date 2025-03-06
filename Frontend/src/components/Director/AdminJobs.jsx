import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByTitle, setSearchJobByCompany, setFilterByAuditionType } from '@/Redux/JobSlice'
import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'


const AdminJobs = () => {
  useGetAllAdminJobs();
  const [companyInput, setCompanyInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  // const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setSearchJobByText(input));
  // }, [input]);
  useEffect(() => {//added
    dispatch(setSearchJobByCompany(companyInput));
  }, [companyInput]);

  useEffect(() => {//added
    dispatch(setSearchJobByTitle(titleInput));
  }, [titleInput]);

  const [auditionType, setAuditionType] = useState("All"); // Add state for audition type added
  
  useEffect(() => {
    dispatch(setFilterByAuditionType(auditionType)); // Dispatch filter change added 
  }, [auditionType]);


  return (
    <div className="bg-main-bg min-h-screen relative">
  {/* Overlay Background */}
  <div className="absolute inset-0 bg-black opacity-50"></div>
  
  {/* Main Content Section */}
  <div className="relative z-10">
    <Navbar />
    <div className="max-w-6xl mx-auto my-10 rounded-2xl bg-white p-10 shadow-2xl">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit"
          placeholder="Filter by Company"
          onChange={(e) => setCompanyInput(e.target.value)}
        />
        <Input
          className="w-fit"
          placeholder="Filter by Job Title"
          onChange={(e) => setTitleInput(e.target.value)}
        />
         <div>
              <Label>Filter by Audition Type:</Label>
              <RadioGroup className="flex py-4" value={auditionType} onValueChange={setAuditionType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="All" id="all" />
                  <Label htmlFor="all">All</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <RadioGroupItem value="Online" id="online" />
                  <Label htmlFor="online">Online</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <RadioGroupItem value="Offline" id="offline" />
                  <Label htmlFor="offline">Offline</Label>
                </div>
              </RadioGroup>
            </div>
        <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
      </div>
      <AdminJobsTable />
    </div>
  </div>
</div>

  )
}

export default AdminJobs