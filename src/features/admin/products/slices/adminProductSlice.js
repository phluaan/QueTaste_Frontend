import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  toggleActiveProductApi,
  deleteProductApi,
  bulkHideApi,
  bulkShowApi,
} from "../services/adminProductService";
import { showError, showSuccess } from "../../../../utils/toastUtils";
export const bulkHideProducts = createAsyncThunk(
  "adminProducts/bulkHideProducts",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await bulkHideApi(token, ids);
      if (res.success) {
        showSuccess("Đã ẩn các sản phẩm đã chọn");
        const last = thunkAPI.getState().adminProducts.lastFilters || {};
        thunkAPI.dispatch(getAllProducts(last));
        return res.data;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// 👇 NEW: Hiện nhiều
export const bulkShowProducts = createAsyncThunk(
  "adminProducts/bulkShowProducts",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await bulkShowApi(token, ids);
      if (res.success) {
        showSuccess("Đã hiện các sản phẩm đã chọn");
        const last = thunkAPI.getState().adminProducts.lastFilters || {};
        thunkAPI.dispatch(getAllProducts(last));
        return res.data;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);
// Lấy danh sách sản phẩm
export const getAllProducts = createAsyncThunk(
  "adminProducts/getAllProducts",
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await getAllProductsApi(token, filters); // ← truyền full filters
      if (res.success) return res.data;
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

export const getProductById = createAsyncThunk(
  "adminProducts/getProductById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await getProductByIdApi(token, id);
      if (res.success) return res.data;
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// Thêm sản phẩm
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await createProductApi(token, formData);
      if (res.success) {
        showSuccess("Thêm sản phẩm thành công!");
       const last = thunkAPI.getState().adminProducts.lastFilters || {};
       thunkAPI.dispatch(getAllProducts(last));
        return res.data;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// Cập nhật sản phẩm
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await updateProductApi(token, id, formData);
      if (res.success) {
        showSuccess("Cập nhật sản phẩm thành công!");
        return res.data;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// Ẩn / hiện sản phẩm
export const toggleActiveProduct = createAsyncThunk(
  "adminProducts/toggleActiveProduct",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await toggleActiveProductApi(token, id);
      if (res.success) {
        showSuccess("Cập nhật trạng thái sản phẩm!");
       const last = thunkAPI.getState().adminProducts.lastFilters || {};
       thunkAPI.dispatch(getAllProducts(last));
        return res.data;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// Xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const res = await deleteProductApi(token, id);
      if (res.success) {
        showSuccess("Đã xóa sản phẩm!");
       const state = thunkAPI.getState();
       const last = state.adminProducts.lastFilters || {};
       thunkAPI.dispatch(getAllProducts(last));
        return id;
      }
      return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
      showError(err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    pagination: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (s) => {
        s.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.products = a.payload.products || [];

        const limitFromArg = a?.meta?.arg?.limit ?? 10;

        s.pagination = {
          page: a.payload.currentPage ?? 1,
          limit: limitFromArg,
          total: a.payload.total ?? 0,
          stats: a.payload.stats || { total: 0, active: 0, inactive: 0, outOfStock: 0 },
        };

        s._rawPage = a.payload.currentPage;
        s._rawTotalPage = a.payload.totalPage;
        s.lastFilters = a.meta?.arg || s.lastFilters || {};
      })
      .addCase(getAllProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(getProductById.fulfilled, (s, a) => {
        s.selectedProduct = a.payload;
      })
      .addCase(createProduct.fulfilled, (s, a) => {
        s.products.unshift(a.payload);
      })
      .addCase(updateProduct.fulfilled, (s, a) => {
        s.products = s.products.map((p) =>
          p._id === a.payload._id ? a.payload : p
        );
      })
      .addCase(toggleActiveProduct.fulfilled, (s, a) => {
        s.products = s.products.map((p) =>
          p._id === a.payload._id ? a.payload : p
        );
      })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.products = s.products.filter((p) => p._id !== a.payload);
      });
  },
});

export default adminProductSlice.reducer;
