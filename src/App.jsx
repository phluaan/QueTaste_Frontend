import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import VerifyOtpPage from "./features/auth/pages/VerifyOtpPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ProfilePage from "./features/user/pages/ProfilePage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import ProductLayout from "./features/product/layouts/ProductLayout";
import ProductPage from "./features/product/pages/ProductPage";
import ProductDetailPage from "./features/product/pages/ProductDetailPage";
import PostDetailPage from "./features/post/pages/PostDetailPage";
import CartPage from "./features/cart/pages/CartPage";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";

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
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Cart + Checkout */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
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