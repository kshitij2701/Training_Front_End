import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValues, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.signin(formValues);
      toast.success("Login Succefully");
      navigate("/");
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({ formValues, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.signup(formValues);
      toast.success("Registered Succefully");
      navigate("/");
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
export const googleLogIn = createAsyncThunk(
  "auth/googleLogIn",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.googleLogIn(result);
      toast.success("Google Log in Succefull");
      navigate("/");
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
const authSLice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
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
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      console.log(action.payload);
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload.message;
    },
    [googleLogIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleLogIn.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      console.log(action.payload);
      state.user = action.payload;
    },
    [googleLogIn.rejected]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSLice.actions;

export default authSLice.reducer;