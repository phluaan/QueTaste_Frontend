import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";

// Lấy danh sách notification từ API
export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await axiosClient.get("/notifications", { params });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Đánh dấu 1 cái đã đọc
export const markRead = createAsyncThunk(
  "notification/markRead",
  async (id, { rejectWithValue }) => {
    try {
      return await axiosClient.put(`/notifications/${id}/read`);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Đánh dấu tất cả đã đọc
export const markAllRead = createAsyncThunk(
  "notification/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      return await axiosClient.put("/notifications/read-all");
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    items: [],
    loading: false,
    unreadCount: 0,
    error: null,
  },
  reducers: {
    // Nhận realtime từ socket
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.items;
        state.unreadCount = action.payload.data.unreadCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markRead.fulfilled, (state, action) => {
        const id = action.payload.data.item._id;
        const idx = state.items.findIndex((n) => n._id === id);
        if (idx !== -1) state.items[idx] = action.payload.data.item;
        state.unreadCount = action.payload.data.unreadCount;
      })
      .addCase(markAllRead.fulfilled, (state) => {
        state.items = state.items.map((n) => ({ ...n, isRead: true }));
        state.unreadCount = 0;
      });
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
