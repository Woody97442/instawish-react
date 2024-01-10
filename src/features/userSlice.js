import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  email: "",
  imageProfil: "",
  myPosts: [],
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
    let dataUser = await response.json();
    if (response.status === 200) {
      let response = await fetch(
        "https://symfony-instawish.formaterz.fr/api/home/" + dataUser.id,
        {
          method: "GET",
          headers: headersList,
        }
      );
      let data = await response.json();
      return { post: data, user: dataUser };
    }
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
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
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
      state.id = payload.user.id;
      state.username = payload.user.username;
      state.email = payload.user.email;
      state.imageProfil = payload.user.imageUrl;
      state.myPosts = payload.post;
    });
    builder.addCase(fetchMyFollows.fulfilled, (state, { payload }) => {
      state.myFollows = payload;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
