import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi, getProductDetailApi } from "../services/productService";

const initialState = {
  products: [],
  total: 0,
  totalPage: 1,
  currentPage: 1,
  productDetail: null,
  loading: { list: false, detail: false },
  error: null,
};

// Fetch all (với filter/sort)
export const fetchAllProducts = createAsyncThunk("product/fetchAll", async (query, thunkAPI) => {
  try {
    const res = await getAllProductsApi(query);
    if (res.success) return res.data;
    return thunkAPI.rejectWithValue(res.message);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Fetch detail
export const fetchProductDetail = createAsyncThunk("product/fetchDetail", async (id, thunkAPI) => {
  try {
    const res = await getProductDetailApi(id);
    if (res.success) return res.data;
    return thunkAPI.rejectWithValue(res.message);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading.list = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })

      // detail
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading.detail = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading.detail = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading.detail = false;
        state.error = action.payload;
      });
  },
});
export const { setPage } = productSlice.actions;
export default productSlice.reducer;
