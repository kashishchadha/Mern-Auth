import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
  user: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   signinstart:(state)=>{
    state.loading = true;
   },
    signinSuccess:(state, action)=>{
     state.user = action.payload;
     state.loading = false;
     state.error = false;
    },
    signinFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
  },
  updateProfilePicture: (state, action) => {
    if (state.user) {
      state.user.profilePicture = action.payload;
    }
  },
  signout: (state) => {
    state.user = null;
    state.loading = false;
    state.error = false;
  },
  }
});

export const { signinstart, signinSuccess, signinFailure, updateProfilePicture, signout } = userSlice.actions;
export default userSlice.reducer;
