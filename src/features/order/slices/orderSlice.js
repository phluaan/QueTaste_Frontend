import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyOrdersApi,
  cancelOrderApi,
  requestCancelOrderApi,
  reOrderApi,
  confirmReceivedOrderApi,
  getOrderTracking,
} from "../services/orderService";
import { showError, showSuccess } from "../../../utils/toastUtils";

export const getMyOrders = createAsyncThunk(
  "userOrders/getMyOrders",
  async ({ status, search, page, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const params = {};
      if (status && status !== "all") params.status = status;
      if (search) params.search = search;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const res = await getMyOrdersApi(token, params);
      console.log("GetMyOrdersApi: ", res);
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
  "userOrders/cancelOrder",
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const data = await cancelOrderApi(token, orderId);

      showSuccess("Hủy đơn hàng thành công");
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Server error";

      showError(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const requestCancelOrder = createAsyncThunk(
  "userOrders/requestCancelOrder",
  async ({ orderId, reason }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await requestCancelOrderApi(token, orderId, reason);
      if (res.success) {
        showSuccess("Yêu cầu hủy đơn hàng đã được gửi");
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

export const reOrder = createAsyncThunk(
  "orders/reOrder",
  async ({ orderId }, thunkAPI) => {
    const res = await reOrderApi(orderId);
    //console.log("response: ", res);

    if (!res.success) {
      const payload = {
        message: res.message,
        code: res.data?.code ?? "REORDER_BAD_REQUEST",
        cart: res.data?.cart ?? null,
        added: res.data?.added ?? [],
        skipped: res.data?.skipped ?? [],
      };
      showError(payload.message);
      return thunkAPI.rejectWithValue(payload);
    }

    showSuccess("Thêm lại sản phẩm vào giỏ hàng thành công!");
    return res.data; // { cart, added, skipped }
  }
);

export const confirmReceivedOrder = createAsyncThunk(
  "userOrders/confirmReceivedOrder",
  async ({ orderId }, thunkAPI) => {
    try {
      const res = await confirmReceivedOrderApi(orderId);
      console.log(res);
      if (res.success) {
        showSuccess("Xác nhận đã nhận hàng thành công!");
        return res.data; // đơn hàng sau khi update
      }

      showError(res.message || "Không thể xác nhận đơn hàng.");
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Server error";
      showError(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchOrderTracking = createAsyncThunk(
  "userOrders/fetchTrackingOrder",
  async (orderId, thunkAPI) => {
    try {
      const res = await getOrderTracking(orderId);
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userOrderSlice = createSlice({
  name: "userOrders",
  initialState: {
    myOrders: [],
    pagination: null,
    loading: false,
    error: null,
    canceling: false,
    cancelError: null,
    tracking: {
      data: null,
      loading: false,
      error: null,
    },
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
        state.myOrders = action.payload.data || [];
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
        state.myOrders = state.myOrders.map((order) =>
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
      })
      // confirmReceivedOrder
      .addCase(confirmReceivedOrder.pending, (state) => {
        state.canceling = true;
      })
      .addCase(confirmReceivedOrder.fulfilled, (state, action) => {
        state.canceling = false;
        state.myOrders = state.myOrders.map((order) =>
          order._id === action.payload._id
            ? { ...order, status: "completed" }
            : order
        );
      })
      .addCase(confirmReceivedOrder.rejected, (state, action) => {
        state.canceling = false;
        state.cancelError = action.payload;
      })
      //Order tracking
      .addCase(fetchOrderTracking.pending, (state) => {
        state.tracking.loading = true;
        state.tracking.error = null;
      })
      .addCase(fetchOrderTracking.fulfilled, (state, action) => {
        state.tracking.loading = false;
        state.tracking.data = action.payload;
      })
      .addCase(fetchOrderTracking.rejected, (state, action) => {
        state.tracking.loading = false;
        state.tracking.error = action.payload;
      });
  },
});

export default userOrderSlice.reducer;
