import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountry = createAsyncThunk('country', async() => {
    const response = await axios.get('http://localhost:3050/country')
    return response.data
})

export const appCountrySlice = createSlice({
  name: "appCountry",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCountry.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getCountry.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default appCountrySlice.reducer;
