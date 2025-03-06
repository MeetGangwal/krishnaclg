import { setSingleCompany } from "@/Redux/CompanySlice";
import { COMPANY_API_END_POINT } from "@/util/constant";
import { setAllJobs } from '@/Redux/JobSlice'
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                console.log(res.data.company);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompanies();
    }, [companyId, dispatch])
}

export default useGetCompanyById