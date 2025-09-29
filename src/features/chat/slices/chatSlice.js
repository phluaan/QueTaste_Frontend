import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";

// API calls
export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      return await axiosClient.get("/chat/conversations");
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ conversationId, page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      return await axiosClient.get(`/chat/${conversationId}/messages`, {
        params: { page, limit },
      });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiverId, content, type = "text" }, { rejectWithValue }) => {
    try {
      return await axiosClient.post("/chat/send", { receiverId, content, type });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const markSeen = createAsyncThunk(
  "chat/markSeen",
  async (conversationId, { rejectWithValue }) => {
    try {
      return await axiosClient.put(`/chat/${conversationId}/seen`);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    messages: {},
    activeConversation: null,
    presence: {},
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.messages[conversationId]) state.messages[conversationId] = [];
      state.messages[conversationId].unshift(message);
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updatePresence: (state, action) => {
      const { userId, status, count } = action.payload;
      state.presence[userId] = { status, count };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const conversationId = action.meta.arg.conversationId;
        const page = action.meta.arg.page || 1;
        const newItems = action.payload?.data || [];

        const prev = state.messages[conversationId] || [];

        state.messages[conversationId] = page === 1
            ? newItems
            : [...prev, ...newItems];
        })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const msg = action.payload.data;
        if (!state.messages[msg.conversationId]) state.messages[msg.conversationId] = [];
        state.messages[msg.conversationId].unshift(msg);
      });
  },
});

export const { addMessage, setActiveConversation, updatePresence } = chatSlice.actions;
export default chatSlice.reducer;
