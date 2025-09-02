import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import userReducer from "../features/user/slices/userSlice";
import productReducer from "../features/product/slices/productSlice";
import postReducer from "../features/post/slices/postSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    post: postReducer,
  },
});

export default store;