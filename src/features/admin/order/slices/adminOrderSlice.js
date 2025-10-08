import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { cancelOrderApi } from "../../../order/services/orderService";
import { showError, showSuccess } from "../../../../utils/toastUtils";
import {
  confirmOrderApi,
  getAllOrdersApi,
} from "../services/adminOrderService";

export const getAllOrders = createAsyncThunk(
  "adminOrders/getAllOrders",
  async ({ status, search, page, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const params = {};
      if (status && status !== "all") params.status = status;
      if (search) params.search = search;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const res = await getAllOrdersApi(token, params);
      if (res.success) return res.data;
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "adminOrders/cancelOrder",
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
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

export const confirmOrderSlice = createAsyncThunk(
  "adminOrders/confirmOrder",
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await confirmOrderApi(token, orderId);
      if (res.success) {
        showSuccess("Order confirmed successfully");
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

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    allOrders: [],
    pagination: null,
    loading: false,
    error: null,
    canceling: false,
    confirming: false,
  },
  extraReducers: (builder) => {
    builder
      // getAllOrders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload.data || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // cancelOrder
      .addCase(cancelOrder.pending, (state) => {
        state.canceling = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.canceling = false;
        state.allOrders = state.allOrders.map((order) =>
          order._id === action.payload._id
            ? { ...order, status: "cancelled" }
            : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.canceling = false;
        state.error = action.payload;
      })

      // confirmOrder
      .addCase(confirmOrderSlice.pending, (state) => {
        state.confirming = true;
      })
      .addCase(confirmOrderSlice.fulfilled, (state, action) => {
        state.confirming = false;
        state.allOrders = state.allOrders.map((order) =>
          order._id === action.payload._id
            ? { ...order, status: "confirmed" }
            : order
        );
      })
      .addCase(confirmOrderSlice.rejected, (state, action) => {
        state.confirming = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
