import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyOrdersApi } from "../services/orderService";

export const getMyOrders = createAsyncThunk("order/myOrders",
  async ({ status, search, page, limit }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;

      const params = {};
      if (status && status !== "all") params.status = status;
      if (search) params.search = search;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const res = await getMyOrdersApi(token, params);
    
      console.log(res.data);

      if (res.success) return res.data;
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    orders: [],
  },
extraReducers: (builder) => {
  builder
    // getMyOrders
    .addCase(getMyOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.pagination = action.payload.pagination;
    })
    .addCase(getMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
});

export default orderSlice.reducer;
