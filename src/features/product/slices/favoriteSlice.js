import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFavoritesApi,
  addFavoriteApi,
  removeFavoriteApi,
} from "../services/extraProductService";

export const fetchFavorites = createAsyncThunk("favorite/fetch", async () => {
  const res = await getFavoritesApi();
  return res.data;
});

export const addFavorite = createAsyncThunk("favorite/add", async (productId) => {
  await addFavoriteApi(productId);
  return productId;
});

export const removeFavorite = createAsyncThunk("favorite/remove", async (productId) => {
  await removeFavoriteApi(productId);
  return productId;
});

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.list.push({ productId: action.payload });
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.list = state.list.filter((f) => f.productId !== action.payload);
      });
  },
});

export default favoriteSlice.reducer;
