import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRelatedProductsApi,
  getViewedProductsApi,
  addViewedProductApi,
  getProductStatsApi,
} from "../services/extraProductService";

export const fetchRelatedProducts = createAsyncThunk("product/related", async (id) => {
  const res = await getRelatedProductsApi(id);
  return res.data;
});

export const fetchViewedProducts = createAsyncThunk("userviews/viewed", async () => {
  const res = await getViewedProductsApi();
  return res.data;
});

export const addViewedProduct = createAsyncThunk("userviews/addViewed", async (id) => {
  await addViewedProductApi(id);
  return id;
});

export const fetchProductStats = createAsyncThunk("product/stats", async (id) => {
  const res = await getProductStatsApi(id);
  return res.data;
});

const extraProductSlice = createSlice({
  name: "extraProduct",
  initialState: {
    related: [],
    viewed: [],
    stats: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.related = action.payload;
      })
      .addCase(fetchViewedProducts.fulfilled, (state, action) => {
  const unique = [];
  const map = new Map();

  action.payload.forEach((v) => {
    const product = v?.productId;
    if (product && product._id && !map.has(product._id)) {
      map.set(product._id, true);
      unique.push(product);
    }
  });

  state.viewed = unique;
})

      .addCase(fetchProductStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default extraProductSlice.reducer;
