import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    // console.log(updatedTourData);
    try {
      const res = await api.createTour(updatedTourData);
      //   console.log(res);
      toast.success("Tour Added Succefully");
      navigate("/");
      return res.data;
    } catch (err) {
      //   console.log(err);
      return rejectWithValue(err?.response?.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    loading: false,
    error: "",
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tourSlice.reducer;