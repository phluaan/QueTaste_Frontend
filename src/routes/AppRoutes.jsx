import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../features/admin/layouts/AdminLayout";

import Home from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ServicePage from "../pages/ServicePage";

import ProductPage from "../features/product/pages/ProductPage";
import ProductDetailPage from "../features/product/pages/ProductDetailPage";
import PostDetailPage from "../features/post/pages/PostDetailPage";
import ProfilePage from "../features/user/pages/ProfilePage";
import OrderTrackingPage from "../features/order/pages/OrderTrackingPage";

import CartPage from "../features/cart/pages/CartPage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import PaymentResultPage from "../features/checkout/pages/PaymentResultPage";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";
import VerifyOtpPage from "../features/auth/pages/VerifyOtpPage";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminOrdersPage from "../features/admin/order/pages/AdminOrdersPage";
import AdminProductsPage from "../features/admin/products/pages/AdminProductsPage";
import AdminReviewsPage from "../features/admin/review/pages/AdminReviewsPage";
import AdminCouponsPage from "../features/admin/pages/coupon/AdminCouponListPage";
import AdminCouponDetailPage from "../features/admin/pages/coupon/AdminCouponDetailPage";
import AdminCouponCreatePage from "../features/admin/pages/coupon/AdminCouponCreatePage";
import AdminUsersPage from "../features/admin/pages/user/AdminUsersPage";
import AdminUserListPage from "../features/admin/pages/user/AdminUsersListPage";
import AdminUserDetailPage from "../features/admin/pages/user/AdminUserDetailPage";
import AdminPostsPage from "../features/admin/pages/post/AdminPostsPage";
import AdminPostsListPage from "../features/admin/pages/post/AdminPostsListPage";
import AdminPostDetailPage from "../features/admin/pages/post/AdminPostDetailPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------- PUBLIC ---------- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />
        <Route
          path="/orders/:orderId/tracking"
          element={<OrderTrackingPage />}
        />
      </Route>

      {/* ---------- AUTH ---------- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />

      {/* ---------- CART & CHECKOUT ---------- */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkout/result" element={<PaymentResultPage />} />

      {/* ---------- ADMIN ---------- */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/reviews" element={<AdminReviewsPage />} />
        <Route path="/admin/coupons" element={<AdminCouponsPage />} />
        <Route path="/admin/coupons/:id" element={<AdminCouponDetailPage />} />
        <Route
          path="/admin/coupon/create"
          element={<AdminCouponCreatePage />}
        />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/users-list" element={<AdminUserListPage />} />
        <Route path="/admin/users/:id" element={<AdminUserDetailPage />} />
        <Route path="/admin/posts" element={<AdminPostsPage />} />
        <Route path="/admin/posts-list" element={<AdminPostsListPage />} />
        <Route path="/admin/posts/:slug" element={<AdminPostDetailPage />} />
      </Route>
    </Routes>
  );
}
