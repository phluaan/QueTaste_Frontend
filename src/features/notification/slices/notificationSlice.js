import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";

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
    addNotification: (state, action) => {
      const newNoti = action.payload;
      if (!newNoti?._id || !newNoti?.message) return;
      if (!state.items.some((n) => n._id === newNoti._id)) {
        state.items.unshift(newNoti);
        state.unreadCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.items || [];
        state.unreadCount = action.payload.data.unreadCount || 0;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markRead.fulfilled, (state, action) => {
        const updated = action.payload.data.item;
        const idx = state.items.findIndex((n) => n._id === updated._id);
        if (idx !== -1) state.items[idx] = updated;
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
