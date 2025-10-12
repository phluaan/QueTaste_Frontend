import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRevenueApi, getCashFlowApi } from "../services/statisticsService";

export const getRevenue = createAsyncThunk(
    "statistics/revenue",
    async ({ filterType, range }, thunkAPI) => {
        try {
        const token = thunkAPI.getState().auth.accessToken;
        const res = await getRevenueApi(token, { filterType, range });
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
        } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
        }
    }
);

export const getCashFlow = createAsyncThunk(
    "statistics/cashflow",
    async (_, thunkAPI) => {
        try {
        const token = thunkAPI.getState().auth.accessToken;
        const res = await getCashFlowApi(token);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
        } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
        }
    }
);

const statisticsSlice = createSlice({
    name: "statistics",
    initialState: {
        revenue: null,
        cashFlow: null,
        loadingRevenue: false,
        loadingCashFlow: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        // Revenue
        .addCase(getRevenue.pending, (state) => {
            state.loadingRevenue = true;
            state.error = null;
        })
        .addCase(getRevenue.fulfilled, (state, action) => {
            state.loadingRevenue = false;
            state.revenue = action.payload;
        })
        .addCase(getRevenue.rejected, (state, action) => {
            state.loadingRevenue = false;
            state.error = action.payload;
        })

        // CashFlow
        .addCase(getCashFlow.pending, (state) => {
            state.loadingCashFlow = true;
            state.error = null;
        })
        .addCase(getCashFlow.fulfilled, (state, action) => {
            state.loadingCashFlow = false;
            state.cashFlow = action.payload;
        })
        .addCase(getCashFlow.rejected, (state, action) => {
            state.loadingCashFlow = false;
            state.error = action.payload;
        });
    },
});

export default statisticsSlice.reducer;