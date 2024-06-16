import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        currentUser: null,
        isFetching: false,
        error: false,
        followStatus: {}, // Add followStatus to store follow status

      
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            console.log(action.payload)
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.users = null;
            state.isFetching = false;
            state.error = false;
            localStorage.clear();
        },

        toggleFollowStatus: (state, action) => {
      const userId = action.payload;
      const updatedFollowStatus = { ...state.followStatus };
         // Toggle the follow status for the given user ID
      if (updatedFollowStatus[userId]) {
        delete updatedFollowStatus[userId];
      } else {
        updatedFollowStatus[userId] = true;
      }
      state.followStatus = updatedFollowStatus;
    },
    },
    
});


  
export const {loginStart, loginSuccess, loginFailure,logout, toggleFollowStatus } = userSlice.actions;
export default userSlice.reducer;