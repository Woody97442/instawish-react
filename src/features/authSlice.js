import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload;
      window.location.reload();
    },
    logout: (state) => {
      state.jwt = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
