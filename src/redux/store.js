import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import userReducer from "../features/user/slices/userSlice";
import productReducer from "../features/product/slices/productSlice";
import extraProductReducer from "../features/product/slices/extraProductSlice";
import favoriteReducer from "../features/product/slices/favoriteSlice";
import postReducer from "../features/post/slices/postSlice";
import cartReducer from "../features/cart/slices/cartSlice";
import checkoutReducer from "../features/checkout/slices/checkoutSlice";;
import orderReducer from "../features/order/slices/orderSlice";
import reviewReducer from "../features/review/slices/reviewSlice";
import couponReducer from "../features/coupon/slices/couponSlice";
import notificationReducer from "../features/notification/slices/notificationSlice";
import chatReducer from "../features/chat/slices/chatSlice";
import adminOrderReducer from "../features/admin/order/slices/adminOrderSlice";
import adminReviewReducer from "../features/admin/review/slices/adminReviewSlice";
import adminProductReducer from "../features/admin/products/slices/adminProductSlice";
import statisticsReducer from "../features/admin/slices/statisticsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    post: postReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    userOrders: orderReducer,
    extraProduct: extraProductReducer,
    favorite: favoriteReducer,
    review: reviewReducer,

    coupon: couponReducer,
    notification: notificationReducer,
    chat: chatReducer,
    adminOrders: adminOrderReducer,
    adminReviews: adminReviewReducer,
    adminProducts: adminProductReducer,
    statistics: statisticsReducer,
  },
});

export default store;
