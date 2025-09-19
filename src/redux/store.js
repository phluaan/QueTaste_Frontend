import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import userReducer from "../features/user/slices/userSlice";
import productReducer from "../features/product/slices/productSlice";
import postReducer from "../features/post/slices/postSlice";
import cartReducer from "../features/cart/slices/cartSlice";
import checkoutReducer from "../features/checkout/slices/checkoutSlice";
import orderReducer from '../features/order/slices/orderSlice'
import couponReducer from "../features/coupon/slices/couponSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    post: postReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    coupon: couponReducer,
  },
});

export default store;