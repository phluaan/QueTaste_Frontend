import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cancelOrderApi, getAllOrdersApi, getMyOrdersApi, requestCancelOrderApi } from "../services/orderService";
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

export const getAllOrders = createAsyncThunk("order/allOrders",
  async ({ status, search, page, limit }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;

      const params = {};
      if (status && status !== "all") params.status = status;
      if (search) params.search = search;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const res = await getAllOrdersApi(token, params);
    
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
    // User
    myOrders: [],
    myPagination: null,
    loadingMyOrders: false,
    errorMyOrders: null,

    // Admin
    allOrders: [],
    allPagination: null,
    loadingAllOrders: false,
    errorAllOrders: null,

    // Cancel
    canceling: false,
    cancelError: null,
  },
  extraReducers: (builder) => {
    builder
    // 🔹 getMyOrders
    .addCase(getMyOrders.pending, (state) => {
      state.loadingMyOrders = true;
      state.errorMyOrders = null;
    })
    .addCase(getMyOrders.fulfilled, (state, action) => {
      state.loadingMyOrders = false;
      state.myOrders = action.payload.data || [];
      state.myPagination = action.payload.pagination;
    })
    .addCase(getMyOrders.rejected, (state, action) => {
      state.loadingMyOrders = false;
      state.errorMyOrders = action.payload;
    })

    // 🔹 getAllOrders
    .addCase(getAllOrders.pending, (state) => {
      state.loadingAllOrders = true;
      state.errorAllOrders = null;
    })
    .addCase(getAllOrders.fulfilled, (state, action) => {
      state.loadingAllOrders = false;
      state.allOrders = action.payload.data || [];
      state.allPagination = action.payload.pagination;
    })
    .addCase(getAllOrders.rejected, (state, action) => {
      state.loadingAllOrders = false;
      state.errorAllOrders = action.payload;
    })

    // 🔹 cancelOrder
    .addCase(cancelOrder.pending, (state) => {
      state.canceling = true;
      state.cancelError = null;
    })
    .addCase(cancelOrder.fulfilled, (state, action) => {
      state.canceling = false;
      // Update trong cả myOrders và allOrders nếu có
      state.myOrders = state.myOrders.map((order) =>
        order._id === action.payload._id
          ? { ...order, status: "cancelled" }
          : order
      );
      state.allOrders = state.allOrders.map((order) =>
        order._id === action.payload._id
          ? { ...order, status: "cancelled" }
          : order
      );
    })
    .addCase(cancelOrder.rejected, (state, action) => {
      state.canceling = false;
      state.cancelError = action.payload;
    })

    // 🔹 requestCancelOrder
    .addCase(requestCancelOrder.pending, (state) => {
      state.canceling = true;
      state.cancelError = null;
    })
    .addCase(requestCancelOrder.fulfilled, (state, action) => {
      state.canceling = false;
      state.myOrders = state.myOrders.map((order) =>
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
