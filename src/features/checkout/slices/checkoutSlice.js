import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi } from "../services/checkoutService";

const initialState = {
    order: null,
    loading: false,
    error: null,
};

export const createOrder = createAsyncThunk(
    "checkout/createOrder",
    async (data, thunkAPI) => {
        try {
        return await createOrderApi(data);
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default checkoutSlice.reducer;