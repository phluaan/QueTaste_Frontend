import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import RegisterPage from "./features/auths/pages/RegisterPage"
import ForgotPasswordPage from "./features/auths/pages/ForgotPasswordPage"
import VerifyOtpPage from "./features/auths/pages/VerifyOtpPage"
import LoginPage from "./features/auths/pages/LoginPage"
import ProfileLayout from "./features/user/components/ProfileLayout"
import ProfilePage from "./features/user/pages/ProfilePage"
import ResetPasswordPage from "./features/auths/pages/ResetPasswordPage";

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

      {/* Auth pages (không dùng layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage/>} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />

      <Route path="/profile" element={< ProfileLayout/>}>
        <Route index element={<ProfilePage />} />
        {/* Có thể thêm các route con khác */}
        {/* <Route path="security" element={<SecurityPage />} /> */}
        {/* <Route path="settings" element={<SettingsPage />} /> */}
      </Route>
    </Routes>
    
  );
}

export default App;
