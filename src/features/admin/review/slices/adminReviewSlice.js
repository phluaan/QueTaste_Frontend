import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteReviewApi, getAllReviewApi } from "../services/reviewService";
import { showError, showSuccess } from "../../../../utils/toastUtils";

export const getAllReviews = createAsyncThunk(
  "review/getAllReview",
  async ({ productId, rating, search, orderBy, page, limit }, thunkAPI) => {
    try {
      const params = {};
      if (productId) params.productId = productId;
      if (rating) params.rating = rating;
      if (search) params.search = search;
      if (orderBy) params.orderBy = orderBy;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const res = await getAllReviewApi(params);
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

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, thunkAPI) => {
    try {
      const res = await deleteReviewApi(reviewId);
      if (res.success) {
        showSuccess("Đã xóa đánh giá thành công");
        return reviewId; // trả về id để cập nhật lại state
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      const msg = err.response?.data?.message || "Không thể xóa đánh giá ";
      showError(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const adminReviewSlice = createSlice({
  name: "adminReviews",
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
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.items || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        // Xóa ngay trong state
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminReviewSlice.reducer;
