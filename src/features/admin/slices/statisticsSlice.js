import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getSummaryApi,
    getCompareApi,
    getWeeklyProfitApi,
    getOrderStatusApi,
    getTopProductsApi,
    getNewCustomersApi,
    getUserRegsByDayApi,
    getTopSpendersUsersApi,
    getBuyerRatioApi,
    getUsersApi,
    getUserDetailApi,
    getPostsViewsTotalApi,
    getTopPostsByViewsApi,
} from "../services/statisticsService";

const initialState = {
    summary: { products: 0, users: 0, revenue: 0, profit: 0 },
    compare: { xKey: "day", series: [], data: [], subtitle: "" },
    weeklyProfit: { weekStart: null, weekEnd: null, revenue: 0, profit: 0 },
    orderStatus: [],
    topProducts: [],
    newCustomers: [],
    usersByDay: [],
    topSpendersUsers: [],
    buyerRatio: [],
    usersList: { items: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } },
    userDetail: null,

    postsViewsTotal: 0,
    postsTop: [],

    loading: {
        summary: false,
        compare: false,
        weeklyProfit: false,
        orderStatus: false,
        topProducts: false,
        newCustomers: false,
        usersByDay: false,
        topSpendersUsers: false,
        buyerRatio: false,
        usersList: false,
        userDetail: false,
        postsViewsTotal: false,
        postsTop: false,
    },
    error: null,
};

export const fetchSummary = createAsyncThunk("statistics/summary", async (_, thunkAPI) => {
    try {
        const res = await getSummaryApi();
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch summary failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchCompare = createAsyncThunk("statistics/compare", async (params, thunkAPI) => {
    try {
        const res = await getCompareApi(params);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch compare failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchWeeklyProfit = createAsyncThunk("statistics/weeklyProfit", async (_, thunkAPI) => {
    try {
        const res = await getWeeklyProfitApi();
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch weekly profit failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchOrderStatus = createAsyncThunk("statistics/orderStatus", async (_, thunkAPI) => {
    try {
        const res = await getOrderStatusApi();
        if (res.success) return res.data.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch order status failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchTopProducts = createAsyncThunk("statistics/topProducts", async (params, thunkAPI) => {
    try {
        const res = await getTopProductsApi(params);
        if (res.success) return res.data.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch top products failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchNewCustomers = createAsyncThunk("statistics/newCustomers", async (params, thunkAPI) => {
    try {
        const res = await getNewCustomersApi(params);
        if (res.success) return res.data.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch new customers failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchUserRegsByDay = createAsyncThunk("statistics/usersByDay", async (params, thunkAPI) => {
    try {
        const res = await getUserRegsByDayApi(params);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch registrations failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchTopSpendersUsers = createAsyncThunk(
    "statistics/topSpendersUsers",
    async (params, thunkAPI) => {
        try {
        const res = await getTopSpendersUsersApi(params);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch top spenders failed");
        } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchBuyerRatio = createAsyncThunk("statistics/buyerRatio", async (params, thunkAPI) => {
    try {
        const res = await getBuyerRatioApi(params);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch buyer ratio failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchUsersList = createAsyncThunk("statistics/usersList", async (params, thunkAPI) => {
    try {
        const res = await getUsersApi(params);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch users failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchUserDetail = createAsyncThunk("statistics/userDetail", async (id, thunkAPI) => {
    try {
        const res = await getUserDetailApi(id);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message || "Fetch user detail failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const fetchPostsViewsTotal = createAsyncThunk(
    "statistics/postsViewsTotal",
    async (_, thunkAPI) => {
        try {
        const res = await getPostsViewsTotalApi();
        if (res.success) return res.data; // number
        return thunkAPI.rejectWithValue(res.message || "Fetch posts total views failed");
        } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchPostsTop = createAsyncThunk("statistics/postsTop", async (params, thunkAPI) => {
    try {
        const res = await getTopPostsByViewsApi(params); // { limit }
        if (res.success) return res.data; // array
        return thunkAPI.rejectWithValue(res.message || "Fetch top posts failed");
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

const statisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b
        .addCase(fetchSummary.pending, (s) => {
            s.loading.summary = true;
            s.error = null;
        })
        .addCase(fetchSummary.fulfilled, (s, a) => {
            s.loading.summary = false;
            s.summary = a.payload;
        })
        .addCase(fetchSummary.rejected, (s, a) => {
            s.loading.summary = false;
            s.error = a.payload;
        })

        .addCase(fetchCompare.pending, (s) => {
            s.loading.compare = true;
            s.error = null;
        })
        .addCase(fetchCompare.fulfilled, (s, a) => {
            s.loading.compare = false;
            s.compare = a.payload;
        })
        .addCase(fetchCompare.rejected, (s, a) => {
            s.loading.compare = false;
            s.error = a.payload;
        })

        .addCase(fetchWeeklyProfit.pending, (s) => {
            s.loading.weeklyProfit = true;
            s.error = null;
        })
        .addCase(fetchWeeklyProfit.fulfilled, (s, a) => {
            s.loading.weeklyProfit = false;
            s.weeklyProfit = a.payload;
        })
        .addCase(fetchWeeklyProfit.rejected, (s, a) => {
            s.loading.weeklyProfit = false;
            s.error = a.payload;
        })

        .addCase(fetchOrderStatus.pending, (s) => {
            s.loading.orderStatus = true;
            s.error = null;
        })
        .addCase(fetchOrderStatus.fulfilled, (s, a) => {
            s.loading.orderStatus = false;
            s.orderStatus = a.payload;
        })
        .addCase(fetchOrderStatus.rejected, (s, a) => {
            s.loading.orderStatus = false;
            s.error = a.payload;
        })

        .addCase(fetchTopProducts.pending, (s) => {
            s.loading.topProducts = true;
            s.error = null;
        })
        .addCase(fetchTopProducts.fulfilled, (s, a) => {
            s.loading.topProducts = false;
            s.topProducts = a.payload;
        })
        .addCase(fetchTopProducts.rejected, (s, a) => {
            s.loading.topProducts = false;
            s.error = a.payload;
        })

        .addCase(fetchNewCustomers.pending, (s) => {
            s.loading.newCustomers = true;
            s.error = null;
        })
        .addCase(fetchNewCustomers.fulfilled, (s, a) => {
            s.loading.newCustomers = false;
            s.newCustomers = a.payload;
        })
        .addCase(fetchNewCustomers.rejected, (s, a) => {
            s.loading.newCustomers = false;
            s.error = a.payload;
        })

        .addCase(fetchUserRegsByDay.pending, (s) => {
            s.loading.usersByDay = true;
            s.error = null;
        })
        .addCase(fetchUserRegsByDay.fulfilled, (s, a) => {
            s.loading.usersByDay = false;
            s.usersByDay = a.payload.data || [];
        })
        .addCase(fetchUserRegsByDay.rejected, (s, a) => {
            s.loading.usersByDay = false;
            s.error = a.payload;
        })

        .addCase(fetchTopSpendersUsers.pending, (s) => {
            s.loading.topSpendersUsers = true;
            s.error = null;
        })
        .addCase(fetchTopSpendersUsers.fulfilled, (s, a) => {
            s.loading.topSpendersUsers = false;
            s.topSpendersUsers = a.payload.data || [];
        })
        .addCase(fetchTopSpendersUsers.rejected, (s, a) => {
            s.loading.topSpendersUsers = false;
            s.error = a.payload;
        })

        .addCase(fetchBuyerRatio.pending, (s) => {
            s.loading.buyerRatio = true;
            s.error = null;
        })
        .addCase(fetchBuyerRatio.fulfilled, (s, a) => {
            s.loading.buyerRatio = false;
            s.buyerRatio = a.payload.data || [];
        })
        .addCase(fetchBuyerRatio.rejected, (s, a) => {
            s.loading.buyerRatio = false;
            s.error = a.payload;
        })

        .addCase(fetchUsersList.pending, (s) => {
            s.loading.usersList = true;
            s.error = null;
        })
        .addCase(fetchUsersList.fulfilled, (s, a) => {
            s.loading.usersList = false;
            s.usersList = a.payload;
        })
        .addCase(fetchUsersList.rejected, (s, a) => {
            s.loading.usersList = false;
            s.error = a.payload;
        })

        .addCase(fetchUserDetail.pending, (s) => {
            s.loading.userDetail = true;
            s.error = null;
            s.userDetail = null;
        })
        .addCase(fetchUserDetail.fulfilled, (s, a) => {
            s.loading.userDetail = false;
            s.userDetail = a.payload;
        })
        .addCase(fetchUserDetail.rejected, (s, a) => {
            s.loading.userDetail = false;
            s.error = a.payload;
            s.userDetail = null;
        })

        .addCase(fetchPostsViewsTotal.pending, (s) => {
            s.loading.postsViewsTotal = true;
            s.error = null;
        })
        .addCase(fetchPostsViewsTotal.fulfilled, (s, a) => {
            s.loading.postsViewsTotal = false;
            s.postsViewsTotal = (a.payload && a.payload.totalViews) ?? 0;
        })
        .addCase(fetchPostsViewsTotal.rejected, (s, a) => {
            s.loading.postsViewsTotal = false;
            s.error = a.payload;
        })

        .addCase(fetchPostsTop.pending, (s) => {
            s.loading.postsTop = true;
            s.error = null;
        })
        .addCase(fetchPostsTop.fulfilled, (s, a) => {
            s.loading.postsTop = false;
            s.postsTop = Array.isArray(a.payload?.items) ? a.payload.items : [];
        })
        .addCase(fetchPostsTop.rejected, (s, a) => {
            s.loading.postsTop = false;
            s.error = a.payload;
        });
    },
});

export default statisticsSlice.reducer;