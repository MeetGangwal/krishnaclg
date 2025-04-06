// import { createSlice } from "@reduxjs/toolkit";

// const jobSlice = createSlice({
//     name: "job",
//     initialState: {
//         allJobs: [],
//         allAdminJobs: [],
//         singleJob: null,
//         searchJobByText: "",
//         allAppliedJobs: [],
//         searchedQuery: "",
//     },
//     reducers: {
//         // actions
//         setAllJobs: (state, action) => {
//             state.allJobs = action.payload;
//         },
//         setSingleJob: (state, action) => {
//             state.singleJob = action.payload;
//         },
//         setAllAdminJobs: (state, action) => {
//             state.allAdminJobs = action.payload;
//         },
//         // setSearchJobByText:(state,action) => {
//         //     state.searchJobByText = action.payload;
//         // },
//         setSearchJobByCompany: (state, action) => {//added
//             state.searchJobByCompany = action.payload;
//         },
//         setSearchJobByTitle: (state, action) => {//added
//             state.searchJobByTitle = action.payload;
//         },
//         // setAllAppliedJobs:(state,action) => {
//         //     state.allAppliedJobs = action.payload;
//         // },
//         setAllAppliedJobs: (state, action) => {
//             // 🔹 Automatically remove deleted jobs before updating state
//             state.allAppliedJobs = action.payload.filter(job => job.job !== null);
//         },
//         setSearchedQuery: (state, action) => {
//             state.searchedQuery = action.payload;
//         },
//         setFilterByAuditionType: (state, action) => {
//             state.filterByAuditionType = action.payload;
//         },
//         setJob: (state, action) => {  // added for Job deleting 
//             state.allAdminJobs = action.payload; // Update the job list in Redux
//         },


//     }
// });
// export const {
//     setAllJobs,
//     setSingleJob,
//     setAllAdminJobs,
//     setSearchJobByTitle,
//     setSearchJobByCompany,
//     setAllAppliedJobs,
//     setSearchedQuery,
//     setFilterByAuditionType,
//     setJob, // added for Job deleting 

// } = jobSlice.actions;
// export default jobSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    searchJobByCompany: "", // 🔹 Ensure these exist
    searchJobByTitle: "",
    filterByAuditionType: "All", // ✅ Add this 
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload.map((job) => ({
        ...job,
        isOnlineAudition: job?.auditionDetails?.videoRequirement === true, // ✅ Ensures boolean value
      }));
    },

    // setSearchJobByText:(state,action) => {
    //     state.searchJobByText = action.payload;
    // },
    setSearchJobByCompany: (state, action) => {
      //added
      state.searchJobByCompany = action.payload;
    },
    setSearchJobByTitle: (state, action) => {
      //added
      state.searchJobByTitle = action.payload;
    },
    // setAllAppliedJobs:(state,action) => {
    //     state.allAppliedJobs = action.payload;
    // },
    setAllAppliedJobs: (state, action) => {
      // 🔹 Automatically remove deleted jobs before updating state
      state.allAppliedJobs = action.payload.filter((job) => job.job !== null);
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setFilterByAuditionType: (state, action) => {
      state.filterByAuditionType = action.payload;
    },
  },
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