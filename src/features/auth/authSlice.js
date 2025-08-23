import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken") || null,
    loading: false,
    error: null,
    message: null
};

export const login = createAsyncThunk("auth/login", async (credential, thunkAPI) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, credential);
        if (res.data.success) {
            return res.data.data;
        } else {
            return thunkAPI.rejectWithValue(res.data.message);
        }
    } catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
});

export const logoutAsync = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState().auth; 
        const refreshToken = state.refreshToken;

        if (!refreshToken) {
            return thunkAPI.rejectWithValue("No refresh token found");
        }

        const res = await axios.post(`${API_BASE_URL}/auth/logout`, { refreshToken });

        if (res.data.success) {
            return true; 
        } else {
            return thunkAPI.rejectWithValue(res.data.message);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            if (action.payload.refreshToken) {
                state.refreshToken = action.payload.refreshToken;
            }
            localStorage.setItem("accessToken", state.accessToken);
            if (state.refreshToken) localStorage.setItem("refreshToken", state.refreshToken);
        },
        logout: (state) => {
            state.user = null,
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
            state.message = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
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
            state.message = "Login successful";
            if (action.meta.arg.rememberMe) {
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            } else {
                sessionStorage.setItem("accessToken", action.payload.accessToken);
                sessionStorage.setItem("refreshToken", action.payload.refreshToken);
            }
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(logoutAsync.fulfilled, (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
            state.message = "Logout successful";
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
        })
        .addCase(logoutAsync.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
});

export const {logout, setTokens } = authSlice.actions;
export default authSlice.reducer;