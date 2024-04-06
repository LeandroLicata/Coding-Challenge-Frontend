import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = await axios.get("/brands");
  return response.data;
});

const initialState = {
  brands: [],
  status: "idle",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default brandSlice.reducer;
