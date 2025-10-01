import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./features/admin/pages/AdminDashboard";
import AdminOrdersPage from "./features/admin/order/pages/AdminOrdersPage";
import AdminCouponDetailPage from "./features/admin/pages/coupon/AdminCouponDetailPage";
import AdminCouponsPage from "./features/admin/pages/coupon/AdminCouponListPage";
import AdminCouponCreatePage from "./features/admin/pages/coupon/AdminCouponCreatePage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import VerifyOtpPage from "./features/auth/pages/VerifyOtpPage";
import CartPage from "./features/cart/pages/CartPage";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";
import PaymentResultPage from "./features/checkout/pages/PaymentResultPage";
import PostDetailPage from "./features/post/pages/PostDetailPage";
import ProductDetailPage from "./features/product/pages/ProductDetailPage";
import ProductPage from "./features/product/pages/ProductPage";
import ProfilePage from "./features/user/pages/ProfilePage";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";
function App() {
  return (
    <>
      <Routes>
        {/* Home (default) */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <ServicePage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />

        <Route path="/products" element={<ProductPage />} />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetailPage />
            </MainLayout>
          }
        />
        <Route
          path="/post/:slug"
          element={
            <MainLayout>
              <PostDetailPage />
            </MainLayout>
          }
        />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />

        {/* Cart + Checkout */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/coupons" element={<AdminCouponsPage />} />
        <Route path="/admin/coupons/:id" element={<AdminCouponDetailPage />} />
        <Route
          path="/admin/coupon/create"
          element={<AdminCouponCreatePage />}
        />

        <Route path="/checkout/result" element={<PaymentResultPage />} />
      </Routes>

      {/* ✅ ToastContainer global */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
