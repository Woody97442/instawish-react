import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _FetchDataStrapi from "../tools/_FetchDataStrapi";

const initialState = {
  allCountries: [],
};

export const fetchCountries = createAsyncThunk("fetchInitialCountries", async () => {
  try {
    const countries = await _FetchDataStrapi("http://localhost:1337/api/countries?populate=*");

    const dataRefactoriser = countries.data.map((country) => {
      return {
        id: country.id,
        name: country.attributes.name,
        restaurants: country.attributes.restaurants.data.map((restaurant) => {
          return restaurant.id;
        }),
      };
    });
    return dataRefactoriser;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

export const countriesSlice = createSlice({
  name: "allCountries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.allCountries = payload;
    });
  },
});

export const {} = countriesSlice.actions;

export default countriesSlice.reducer;
