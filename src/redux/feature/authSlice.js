import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValues, navigate, toast }) => {
    try {
      const res = await api.signin(formValues);
      toast.success("Login Succefully");
      navigate("/");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const authSLice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    laoding: false,
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      console.log(action.payload);
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      console.log(action.payload);
      state.laoding = false;
      state.error = action.payload.message;
    },
  },
});

export default authSLice.reducer;