import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import RegisterPage from "./features/auth/pages/RegisterPage"
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage"
import VerifyOtpPage from "./features/auth/pages/VerifyOtpPage"
import LoginPage from "./features/auth/pages/LoginPage"
import ProfilePage from "./features/user/pages/ProfilePage"
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import ProductLayout from "./features/product/layouts/ProductLayout"
import ProductPage from "./features/product/pages/ProductPage"
import ProductDetailPage from "./features/product/pages/ProductDetailPage"

function App() {
  return (
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
        path="/products"
        element={
          <ProductPage />
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProductDetailPage />
        }
      />

      {/* Auth pages (không dùng layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage/>} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/profile" element={< ProfilePage/>}>
      </Route>
    </Routes>
    
  );
}

export default App;
