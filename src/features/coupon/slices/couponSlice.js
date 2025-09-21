import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAdminCouponsApi, getUserCouponsApi,
    getCouponDetailApi,
    createCouponApi,
    updateCouponApi,
    changeCouponStatusApi,
} from "../services/couponService";

const initialState = {
    coupons: [],
    total: 0,
    totalPage: 1,
    currentPage: 1,
    couponDetail: null,
    loading: { list: false, detail: false, action: false },
    error: null,
};

// Async actions
export const fetchAdminCoupons = createAsyncThunk(
    "coupon/fetchAdmin",
    async ({ params, token }, thunkAPI) => {
        try {
        const res = await getAdminCouponsApi(params, token);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const fetchUserCoupons = createAsyncThunk(
    "coupon/fetchUser",
    async ({ params, token }, thunkAPI) => {
        try {
        const res = await getUserCouponsApi(params, token);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const fetchCouponDetail = createAsyncThunk("coupon/fetchDetail", async (id, thunkAPI) => {
    try {
        const res = await getCouponDetailApi(id);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const createCoupon = createAsyncThunk("coupon/create", async (data, thunkAPI) => {
    try {
        const res = await createCouponApi(data);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const updateCoupon = createAsyncThunk("coupon/update", async ({ id, data }, thunkAPI) => {
    try {
        const res = await updateCouponApi(id, data);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const changeCouponStatus = createAsyncThunk(
    "coupon/changeStatus",
    async ({ id, action }, thunkAPI) => {
        try {
        const res = await changeCouponStatusApi(id, action);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        setPage: (state, action) => {
        state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
    // Admin
    builder
        .addCase(fetchAdminCoupons.pending, (state) => {
        state.loading.list = true;
        state.error = null;
        })
        .addCase(fetchAdminCoupons.fulfilled, (state, action) => {
        state.loading.list = false;
        state.coupons = action.payload.coupons;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPage = action.payload.totalPage;
        })
        .addCase(fetchAdminCoupons.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
        });

    // User
    builder
        .addCase(fetchUserCoupons.pending, (state) => {
        state.loading.list = true;
        state.error = null;
        })
        .addCase(fetchUserCoupons.fulfilled, (state, action) => {
        state.loading.list = false;
        state.coupons = action.payload.coupons;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPage = action.payload.totalPage;
        })
        .addCase(fetchUserCoupons.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
        });

    // Detail
    builder
        .addCase(fetchCouponDetail.pending, (state) => {
        state.loading.detail = true;
        state.error = null;
        })
        .addCase(fetchCouponDetail.fulfilled, (state, action) => {
        state.loading.detail = false;
        state.couponDetail = action.payload;
        })
        .addCase(fetchCouponDetail.rejected, (state, action) => {
        state.loading.detail = false;
        state.error = action.payload;
        });

    // Create / Update / Change status
    builder.addMatcher(
        (action) =>
        ["coupon/create", "coupon/update", "coupon/changeStatus"].some((t) =>
            action.type.startsWith(t)
        ),
        (state, action) => {
        if (action.type.endsWith("pending")) {
            state.loading.action = true;
            state.error = null;
        } else if (action.type.endsWith("fulfilled")) {
            state.loading.action = false;
        } else if (action.type.endsWith("rejected")) {
            state.loading.action = false;
            state.error = action.payload;
        }
        }
    );
    },
});

export const { setPage } = couponSlice.actions;
export default couponSlice.reducer;