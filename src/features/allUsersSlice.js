import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allUser: [],
};

export const fetchAllUsersSlice = createAsyncThunk(
  "fetchInitialUsers",
  async () => {
    let headersList = {
      "Accept": "*/*",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    };

    try {
      let response = await fetch(
        "https://symfony-instawish.formaterz.fr/api/users",
        {
          method: "GET",
          headers: headersList,
        }
      );
      let data = await response.json();
      const users = Object.entries(data).map((key) => key[1]);
      return users;
    } catch (error) {
      localStorage.removeItem("token");
      console.error("Erreur lors de la requête :", error);
    }
  }
);

const allUsersSlice = createSlice({
  name: "allUsersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersSlice.fulfilled, (state, { payload }) => {
      state.allUser = payload;
    });
  },
});

export const {} = allUsersSlice.actions;
export default allUsersSlice.reducer;
