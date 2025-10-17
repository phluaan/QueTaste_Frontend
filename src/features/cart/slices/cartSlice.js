// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartApi,
  addToCartApi,
  updateCartApi,
  removeFromCartApi,
} from "../services/cartService";
import { reOrder } from "../../order/slices/orderSlice";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await getCartApi();
      return res.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await addToCartApi(productId, quantity);
      const refreshed = await getCartApi();
      return refreshed.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await updateCartApi(productId, quantity);
      const refreshed = await getCartApi();
      return refreshed.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      await removeFromCartApi(productId);
      const refreshed = await getCartApi();
      return refreshed.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch cart failed";
      })

      // add/update/remove
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })

      // ✅ reOrder: lấy items từ payload.cart
      .addCase(reOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reOrder.fulfilled, (state, action) => {
        state.loading = false;
        const cart = action.payload?.cart;
        state.items = cart?.items ?? [];
      })
      .addCase(reOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Re-order failed";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
