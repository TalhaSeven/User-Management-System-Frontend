import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const setAddress = createAsyncThunk('address', async(payload:any) => {
    const response = await axios.post('http://localhost:3050/address',payload)
    return response.data
})

export const appAddressSlice = createSlice({
  name: "appAddress",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setAddress.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(setAddress.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default appAddressSlice.reducer;
