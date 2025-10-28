import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { cancelOrderApi } from "../../../order/services/orderService";
import { showError, showSuccess } from "../../../../utils/toastUtils";
import {
  callShipperApi,
  cancelOrdersApi,
  confirmOrderApi,
  confirmOrdersApi,
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
      console.log(params);

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

export const confirmOrdersSlice = createAsyncThunk(
  "adminOrders/confirmOrders",
  async (listOrderIds, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await confirmOrdersApi(token, listOrderIds);

      if (!res?.success) {
        return thunkAPI.rejectWithValue(res?.message || "Unknown error");
      }

      const {
        updated = [],
        skippedInvalid = [],
        notFound = [],
      } = res.data || {};

      if (updated.length > 0) {
        showSuccess(`Xác nhận thành công: ${updated.length} đơn`);
      }
      if (skippedInvalid.length > 0) {
        showError(`Đơn hàng không hợp lệ: ${skippedInvalid.length} đơn`);
      }
      if (notFound.length) {
        showError(`Không tìm thấy: ${notFound.length} đơn`);
      }

      // ✅ trả về payload để fulfilled xử lý
      return {
        updatedIds: updated.map((o) => String(o._id)),
        skippedInvalid, // [{ id, status }]
        notFound, // [id]
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Server error";
      showError(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cancelOrdersSlice = createAsyncThunk(
  "adminOrders/cancelOrders",
  async (listOrderIds, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await cancelOrdersApi(token, listOrderIds);

      if (!res?.success) {
        return thunkAPI.rejectWithValue(res?.message || "Unknown error");
      }

      const {
        updated = [],
        skippedInvalid = [],
        notFound = [],
      } = res.data || {};

      if (updated.length > 0) {
        showSuccess(`Hủy đơn thành công: ${updated.length} đơn`);
      }
      if (skippedInvalid.length > 0) {
        showError(`Đơn hàng không hợp lệ: ${skippedInvalid.length} đơn`);
      }
      if (notFound.length) {
        showError(`Không tìm thấy: ${notFound.length} đơn`);
      }

      // ✅ trả về payload để fulfilled xử lý
      return {
        updatedIds: updated.map((o) => String(o._id)),
        skippedInvalid, // [{ id, status }]
        notFound, // [id]
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Server error";
      showError(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const callShipper = createAsyncThunk(
  "adminOrders/callShipper",
  async (orderIds, thunkAPI) => {
    try {
      console.log(orderIds);
      const res = await callShipperApi(orderIds);
      console.log(res);
      if (!res.success) {
        showError(res.message);
        return thunkAPI.rejectWithValue(res.message);
      }
      const {
        updated = [],
        skippedInvalid = [],
        notFound = [],
      } = res.data || {};

      if (updated.length > 0) {
        showSuccess(`Vận chuyển đơn thành công: ${updated.length} đơn`);
      }
      if (skippedInvalid.length > 0) {
        showError(`Đơn hàng không hợp lệ: ${skippedInvalid.length} đơn`);
      }
      if (notFound.length) {
        showError(`Không tìm thấy: ${notFound.length} đơn`);
      }

      // ✅ trả về payload để fulfilled xử lý
      return {
        updatedIds: updated.map((o) => String(o._id)),
        skippedInvalid, // [{ id, status }]
        notFound, // [id]
      };
    } catch (err) {
      showError("Lỗi khi gọi shipper");
      return thunkAPI.rejectWithValue(err.message);
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
    shipping: false,
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
      })

      // confirmOrders
      .addCase(confirmOrdersSlice.pending, (state) => {
        state.confirming = true;
      })
      .addCase(confirmOrdersSlice.fulfilled, (state, action) => {
        state.confirming = false;
        const { updatedIds } = action.payload || { updatedIds: [] };
        if (updatedIds?.length) {
          const setIds = new Set(updatedIds.map(String));
          state.allOrders = state.allOrders.map((order) =>
            setIds.has(String(order.id))
              ? { ...order, status: "confirmed" }
              : order
          );
        }
      })
      .addCase(confirmOrdersSlice.rejected, (state, action) => {
        state.confirming = false;
        state.error = action.payload;
      })
      // cancelOrders
      .addCase(cancelOrdersSlice.pending, (state) => {
        state.confirming = true;
      })
      .addCase(cancelOrdersSlice.fulfilled, (state, action) => {
        state.confirming = false;
        const { updatedIds } = action.payload || { updatedIds: [] };
        if (updatedIds?.length) {
          const setIds = new Set(updatedIds.map(String));
          state.allOrders = state.allOrders.map((order) =>
            setIds.has(String(order.id))
              ? { ...order, status: "cancelled" }
              : order
          );
        }
      })
      .addCase(cancelOrdersSlice.rejected, (state, action) => {
        state.confirming = false;
        state.error = action.payload;
      })
      .addCase(callShipper.pending, (state) => {
        state.shipping = true;
      })
      .addCase(callShipper.fulfilled, (state, action) => {
        state.shipping = false;
        const { updatedIds } = action.payload || { updatedIds: [] };
        if (updatedIds?.length) {
          const setIds = new Set(updatedIds.map(String));
          state.allOrders = state.allOrders.map((order) =>
            setIds.has(String(order.id))
              ? { ...order, status: "shipping" }
              : order
          );
        }
      })
      .addCase(callShipper.rejected, (state) => {
        state.shipping = false;
      });
  },
});

export default adminOrderSlice.reducer;
