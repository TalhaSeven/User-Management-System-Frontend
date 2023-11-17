import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk('users', async() => {
    const response = await axios.get('http://localhost:3050/users')
    return response.data
})

export const appUserSlice = createSlice({
  name: "appUser",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default appUserSlice.reducer;
