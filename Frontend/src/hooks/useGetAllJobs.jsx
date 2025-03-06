import { setAllJobs } from '@/Redux/JobSlice'
import { JOB_API_END_POINT } from '@/util/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    dispatch(setAllJobs([]));  // Clear jobs if no jobs exist
                }
            } catch (error) {
                console.log(error);
                dispatch(setAllJobs([]));
            }
        }
        fetchAllJobs();
    },[dispatch, searchedQuery]);
    return null;
}

export default useGetAllJobs