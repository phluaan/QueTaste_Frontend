import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cancelOrderApi, getMyOrdersApi, requestCancelOrderApi } from "../services/orderService";
import { showError, showSuccess } from "../../../utils/toastUtils";

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

export const cancelOrder = createAsyncThunk("order/cancelOrder",
  async (orderId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;

      const res = await cancelOrderApi(token, orderId);
      if (res.success) {
        showSuccess("Order cancelled successfully");
        return res.data;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

export const requestCancelOrder = createAsyncThunk("order/requestCancelOrder",
  async ({ orderId, reason }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;
      const res = await requestCancelOrderApi(token, orderId, reason);
      if (res.success) {
        showSuccess("Request for order cancellation submitted successfully");
        return res.data;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,      // cho getMyOrders
    error: null,         // cho getMyOrders
    canceling: false,    // cho cancelOrder
    cancelError: null,   // cho cancelOrder
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
    // cancelOrder
    .addCase(cancelOrder.pending, (state) => {
      state.canceling = true;
      state.cancelError = null;
    })
    .addCase(cancelOrder.fulfilled, (state, action) => {
      state.canceling = false;
      state.orders = state.orders.map((order) =>
        order._id === action.payload._id
          ? { ...order, status: "cancelled" }
          : order
      );
    })
    .addCase(cancelOrder.rejected, (state, action) => {
      state.canceling = false;
      state.cancelError = action.payload;
    })
    // requestCancelOrder
    .addCase(requestCancelOrder.pending, (state) => {
      state.canceling = true;
      state.cancelError = null;
    })
    .addCase(requestCancelOrder.fulfilled, (state, action) => {
      state.canceling = false;
      state.orders = state.orders.map((order) =>
        order._id === action.payload._id
          ? { ...order, status: "cancel_requested" }
          : order
      );
    })
    .addCase(requestCancelOrder.rejected, (state, action) => {
      state.canceling = false;
      state.cancelError = action.payload;
    });
  }
});

export default orderSlice.reducer;
