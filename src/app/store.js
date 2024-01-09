import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "../features/CountriesSlice";

export const store = configureStore({
  reducer: {
    country: countriesReducer,
  },
});
