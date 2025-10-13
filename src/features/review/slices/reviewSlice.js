import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../../utils/toastUtils";
import { createReviewApi, getReviewApi } from "../services/reviewService";

export const getReview = createAsyncThunk(
  "review/getReview",
  async ({ productId, rating, orderBy, page, limit }, thunkAPI) => {
    try {
      const params = {};
      params.productId = productId;
      if (rating) params.rating = rating;
      if (orderBy) params.orderBy = orderBy;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const res = await getReviewApi(params); 
      console.log(res.data);

      if (res.success) return res.data;
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err.response?.data?.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, orderId, rating, comment }, thunkAPI) => {
    try {
      const params = { productId, orderId, rating, comment };
      const res = await createReviewApi(params);

      if (res.success) {
        showSuccess("Đánh giá thành công!");
        return res.data;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err.response?.data?.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getReview
      .addCase(getReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.items || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createReview
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        // Thêm review mới vào list (nếu cần)
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
