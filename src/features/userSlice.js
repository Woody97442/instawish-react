import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  email: "",
  imageProfil: "",
  myFollows: [],
};

export const fetchUser = createAsyncThunk("fetchInitialUser", async () => {
  let headersList = {
    "Accept": "*/*",
    "Authorization": "Bearer " + localStorage.getItem("token"),
  };

  try {
    let response = await fetch(
      "https://symfony-instawish.formaterz.fr/api/me",
      {
        method: "GET",
        headers: headersList,
      }
    );
    let data = await response.json();
    return data;
  } catch (error) {
    localStorage.removeItem("token");
    console.error("Erreur lors de la requête :", error);
  }
});

export const fetchMyFollows = createAsyncThunk(
  "fetchInitialMyFollows",
  async () => {
    let headersList = {
      "Accept": "*/*",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    };

    try {
      let response = await fetch(
        "https://symfony-instawish.formaterz.fr/api/home",
        {
          method: "GET",
          headers: headersList,
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.username = payload.username;
      state.email = payload.email;
      state.imageProfil = payload.imageUrl;
    });
    builder.addCase(fetchMyFollows.fulfilled, (state, { payload }) => {
      state.myFollows = payload;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
