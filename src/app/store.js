import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/authSlice";
import userSliceReducer from "../features/userSlice";
import allUsersSliceReducer from "../features/allUsersSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    users: allUsersSliceReducer,
  },
});
