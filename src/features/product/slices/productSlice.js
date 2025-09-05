import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi, getProductDetailApi } from "../services/productService";

const initialState = {
  products: [],
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
  reducers: {},
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

export default productSlice.reducer;
