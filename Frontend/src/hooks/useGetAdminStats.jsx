import { useEffect, useState } from "react";
import axios from "axios";

const useGetAdminStats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchAdminStats = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/admin/stats", { withCredentials: true });
                if (res.data.success) {
                    setStats(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching admin stats", error);
            }
        };
        fetchAdminStats();
    }, []);

    return stats;
};

export default useGetAdminStats
