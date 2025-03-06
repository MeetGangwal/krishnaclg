import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        // setSearchJobByText:(state,action) => {
        //     state.searchJobByText = action.payload;
        // },
        setSearchJobByCompany: (state, action) => {//added
            state.searchJobByCompany = action.payload;
        },
        setSearchJobByTitle: (state, action) => {//added
            state.searchJobByTitle = action.payload;
        },
        // setAllAppliedJobs:(state,action) => {
        //     state.allAppliedJobs = action.payload;
        // },
        setAllAppliedJobs: (state, action) => {
            // 🔹 Automatically remove deleted jobs before updating state
            state.allAppliedJobs = action.payload.filter(job => job.job !== null);
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setFilterByAuditionType:(state,action)=>{
            state.FilterByAuditionType = action.payload;
        },
       
        
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByTitle,
    setSearchJobByCompany, 
    setAllAppliedJobs,
    setSearchedQuery,
    setFilterByAuditionType,
    
} = jobSlice.actions;
export default jobSlice.reducer;