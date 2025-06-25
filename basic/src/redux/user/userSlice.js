import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinstart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    }
  }
});

export const { signinstart, signinSuccess, signinFailure, signout } = userSlice.actions;
export default userSlice.reducer;