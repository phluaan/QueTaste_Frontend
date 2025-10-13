import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordApi, loginApi, logoutApi, registerApi, resetPasswordApi } from "../services/authService";
import { setTokens, clearTokens, getAccessToken, getRefreshToken, clearUser } from "../../../utils/storage";

const initialState = {
  user: null,
  accessToken: getAccessToken(),
  rememberMe: localStorage.getItem("accessToken") ? true : false,
  refreshToken: getRefreshToken(),
  loading: false,
  error: null,
  message: null,
};

export const login = createAsyncThunk("auth/login", async (credential, thunkAPI) => {
  try {
    const res = await loginApi(credential);
    if (res.success) return res.data;
    return thunkAPI.rejectWithValue(res.message);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
  }
});

export const logoutAsync = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth;
    const refreshToken = state.refreshToken;
    if (!refreshToken) return thunkAPI.rejectWithValue("No refresh token found");

    const res = await logoutApi(refreshToken);
    if (res.success) return true;
    return thunkAPI.rejectWithValue(res.message);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
  }
});

export const register = createAsyncThunk("auth/register", async (payload, thunkAPI) => {
  try {
    const res = await registerApi(payload);
    if (res.success) return res.data;
    return thunkAPI.rejectWithValue(res.message);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
  }
});
export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, thunkAPI) => {
  try {
    const res = await forgotPasswordApi(email);
    if (res.success) return res.data;
    return thunkAPI.rejectWithValue(res.message);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
  }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (payload, thunkAPI) => {
  try {
    const res = await resetPasswordApi(payload);
    if (res.success) return res.data;
    return thunkAPI.rejectWithValue(res.message);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        state.rememberMe = action.meta.arg.rememberMe;
        state.message = "Login successful";

        setTokens(action.payload.accessToken, action.payload.refreshToken, action.meta.arg.rememberMe);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
        state.message = "Logout successful";
        clearTokens();
        clearUser();
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.message = "Register successful";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
