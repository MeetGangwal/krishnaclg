import { useState, useEffect } from "react";
import { useGetAdminStats } from "../hooks/useGetAdminStats";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT, JOB_API_END_POINT, COMPANY_API_END_POINT } from "@/util/constant";
import axios from "axios";
import ActorList from "../components/Actor/ActorList";
import CDPersonalProfile from "../components/Director/CDPersonalProfile";

const AdminDashboard = ({ userType }) => {
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [totalCompanies, setTotalCompanies] = useState(0);
    const stats = useGetAdminStats();
    const navigate = useNavigate();
    const API_ENDPOINT = `${USER_API_END_POINT}/${userType}`;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [API_ENDPOINT]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(JOB_API_END_POINT);
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await axios.get(COMPANY_API_END_POINT);
                setTotalCompanies(response.data.length);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchJobs();
        fetchCompanies();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                    <CardContent>
                        <h2 className="text-lg font-semibold">Total Jobs</h2>
                        <p>{stats?.totalJobs || 0}</p>
                    </CardContent>
                </Card>
                <Card className="p-4">
                    <CardContent>
                        <h2 className="text-lg font-semibold">Total Companies</h2>
                        <p>{totalCompanies}</p>
                    </CardContent>
                </Card>
            </div>
            <h2 className="text-lg font-bold mt-6">Job Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {jobs.map((job) => (
                    <Card key={job._id} className="p-4">
                        <CardContent>
                            <h3 className="text-md font-semibold">{job.title}</h3>
                            <p>Applications: {job.applications.length}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <h2 className="text-lg font-bold mt-6">Actors List</h2>
            <ActorList />
            <h2 className="text-lg font-bold mt-6">Directors List</h2>
            <CDPersonalProfile />
        </div>
    );
};

export default AdminDashboard;
