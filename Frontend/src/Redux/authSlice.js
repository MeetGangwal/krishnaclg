import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        updateUserProfile: (state, action) => {//added for multipal photo 
            state.user = action.payload;  // Update user data in Redux
        },
    }
});
export const { setLoading, setUser,updateUserProfile } = authSlice.actions;
export default authSlice.reducer;