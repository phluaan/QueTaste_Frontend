import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllProductsApi,
    getProductDetailApi,
    getNewestProductsApi,
    getBestSellingProductsApi,
    getMostViewedProductsApi,
    getTopDiscountedProductsApi
} from "../services/productService";

const initialState = {
    allProducts: [],
    newest: [],
    bestSelling: [],
    mostViewed: [],
    topDiscount: [],
    productDetail: null,
    loading: { all: false, newest: false, best: false, viewed: false, discount: false, detail: false },
    error: null
};

// Async thunks
export const fetchAllProducts = createAsyncThunk("product/fetchAll", async (_, thunkAPI) => {
    try {
        const res = await getAllProductsApi();
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const fetchProductDetail = createAsyncThunk("product/fetchDetail", async (id, thunkAPI) => {
    try {
        const res = await getProductDetailApi(id);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err){
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const fetchNewestProducts = createAsyncThunk("product/fetchNewest", async (_, thunkAPI) => {
    try {
        const res = await getNewestProductsApi();
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const fetchBestSellingProducts = createAsyncThunk("product/fetchBestSelling", async (_, thunkAPI) => {
    try {
        const res = await getBestSellingProductsApi();
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const fetchMostViewedProducts = createAsyncThunk("product/fetchMostViewed", async (_, thunkAPI) => {
    try {
        const res = await getMostViewedProductsApi();
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const fetchTopDiscountProducts = createAsyncThunk("product/fetchTopDiscount", async (_, thunkAPI) => {
    try {
        const res = await getTopDiscountedProductsApi();
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProducts.pending, (state) => { state.loading.all = true; })
        .addCase(fetchAllProducts.fulfilled, (state, action) => { state.loading.all = false; state.allProducts = action.payload; })
        .addCase(fetchAllProducts.rejected, (state, action) => { state.loading.all = false; state.error = action.payload; })

        // newest
        .addCase(fetchNewestProducts.pending, (state) => { state.loading.newest = true; })
        .addCase(fetchNewestProducts.fulfilled, (state, action) => { state.loading.newest = false; state.newest = action.payload; })
        .addCase(fetchNewestProducts.rejected, (state, action) => { state.loading.newest = false; state.error = action.payload; })

        // best selling
        .addCase(fetchBestSellingProducts.pending, (state) => { state.loading.best = true; })
        .addCase(fetchBestSellingProducts.fulfilled, (state, action) => { state.loading.best = false; state.bestSelling = action.payload; })
        .addCase(fetchBestSellingProducts.rejected, (state, action) => { state.loading.best = false; state.error = action.payload; })

        // most viewed
        .addCase(fetchMostViewedProducts.pending, (state) => { state.loading.viewed = true; })
        .addCase(fetchMostViewedProducts.fulfilled, (state, action) => { state.loading.viewed = false; state.mostViewed = action.payload; })
        .addCase(fetchMostViewedProducts.rejected, (state, action) => { state.loading.viewed = false; state.error = action.payload; })

        // top discount
        .addCase(fetchTopDiscountProducts.pending, (state) => { state.loading.discount = true; })
        .addCase(fetchTopDiscountProducts.fulfilled, (state, action) => { state.loading.discount = false; state.topDiscount = action.payload; })
        .addCase(fetchTopDiscountProducts.rejected, (state, action) => { state.loading.discount = false; state.error = action.payload; })

        // product detail
        .addCase(fetchProductDetail.pending, (state) => { state.loading.detail = true; state.error = null;})
        .addCase(fetchProductDetail.fulfilled, (state, action) => { state.loading.detail = false; state.productDetail = action.payload; state.error = null;})
        .addCase(fetchProductDetail.rejected, (state, action) => { state.loading.detail = false; state.error = action.payload; });
    }
});

export default productSlice.reducer;
