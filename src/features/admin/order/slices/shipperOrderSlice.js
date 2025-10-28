import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getShipperOrdersApi,
  markOrderDoneApi,
  requestCancelOrderApi,
} from "../services/shipperOrderService";
import { showError, showSuccess } from "../../../../utils/toastUtils";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Lấy danh sách đơn giao cho shipper
export const fetchShipperOrders = createAsyncThunk(
  "shipper/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const res = await getShipperOrdersApi();
      console.log(res);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Đánh dấu đã giao
export const markAsDone = createAsyncThunk(
  "shipper/markAsDone",
  async (orderId, thunkAPI) => {
    try {
      await markOrderDoneApi(orderId);
      showSuccess?.("Đã xác nhận giao hàng thành công!");
      const refreshed = await getShipperOrdersApi();
      return refreshed;
    } catch (err) {
      showError?.("Lỗi khi xác nhận giao hàng");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Gửi yêu cầu hủy đơn
export const requestCancel = createAsyncThunk(
  "shipper/requestCancel",
  async (orderId, thunkAPI) => {
    try {
      await requestCancelOrderApi(orderId);
      showSuccess?.("Đã gửi yêu cầu hủy đơn hàng");
      const refreshed = await getShipperOrdersApi();
      return refreshed;
    } catch (err) {
      showError?.("Lỗi khi gửi yêu cầu hủy");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const shipperOrderSlice = createSlice({
  name: "shipperOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipperOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipperOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
      })
      .addCase(fetchShipperOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không tải được danh sách đơn hàng";
      })
      // markAsDone
      .addCase(markAsDone.fulfilled, (state, action) => {
        state.orders = action.payload || [];
      })
      // requestCancel
      .addCase(requestCancel.fulfilled, (state, action) => {
        state.orders = action.payload || [];
      });
  },
});

export default shipperOrderSlice.reducer;
