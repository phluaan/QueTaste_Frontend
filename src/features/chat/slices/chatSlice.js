import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";

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
    unreadCounts: {}, 
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.messages[conversationId]) state.messages[conversationId] = [];

      const exists = state.messages[conversationId].some(
        (m) => m._id === message._id
      );
      if (!exists) {
        state.messages[conversationId].unshift(message);
      }

      const idx = state.conversations.findIndex((c) => c._id === conversationId);
      if (idx > -1) {
        const conv = state.conversations[idx];
        state.conversations.splice(idx, 1);
        state.conversations.unshift(conv);
      }

      const isActive = state.activeConversation?._id === conversationId;
      if (!isActive) {
        state.unreadCounts[conversationId] =
          (state.unreadCounts[conversationId] || 0) + 1;
      }
    },

    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
      if (action.payload?._id) {
        state.unreadCounts[action.payload._id] = 0;
      }
    },

    updatePresence: (state, action) => {
      const { userId, status, count } = action.payload;
      state.presence[userId] = { status, count };
    },

    incrementUnread: (state, action) => {
      const id = action.payload;
      if (!id) return;
      state.unreadCounts[id] = (state.unreadCounts[id] || 0) + 1;
    },

    markAsRead: (state, action) => {
      const id = action.payload;
      if (!id) return;
      state.unreadCounts[id] = 0;
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
        state.messages[conversationId] =
          page === 1 ? newItems : [...prev, ...newItems];
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const msg = action.payload.data;
        const convId = msg.conversationId;

        const exists = state.conversations.find((c) => c._id === convId);
        if (!exists) {
          state.conversations.unshift({
            _id: convId,
            participants: [
              {
                user:
                  typeof msg.sender === "object"
                    ? msg.sender
                    : { _id: msg.sender },
              },
              {
                user:
                  typeof msg.receiver === "object"
                    ? msg.receiver
                    : { _id: msg.receiver },
              },
            ],
            lastMessageAt: msg.createdAt,
          });
        } else {
          exists.lastMessageAt = msg.createdAt;
        }

        if (state.activeConversation?._id?.startsWith("new-")) {
          state.activeConversation =
            state.conversations.find((c) => c._id === convId) ||
            state.activeConversation;
        }
      });
  },
});

export const {
  addMessage,
  setActiveConversation,
  updatePresence,
  incrementUnread,
  markAsRead,
} = chatSlice.actions;

export default chatSlice.reducer;
