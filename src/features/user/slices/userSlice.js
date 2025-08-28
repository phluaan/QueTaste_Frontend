import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileApi, updateProfileApi } from "../services/userService";
import { setUser } from "../../../utils/storage";

export const getProfile = createAsyncThunk("user/getProfile",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;
      const res = await getProfileApi(token);
      if (res.success) return res.data;
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

export const updateProfile = createAsyncThunk("user/updateProfile",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;
      const res = await updateProfileApi(token, data);
      if (res.success) return res.data;
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
extraReducers: (builder) => {
  builder
    // getProfile
    .addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      setUser(action.payload);
    })
    .addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
    // updateProfile
    .addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
