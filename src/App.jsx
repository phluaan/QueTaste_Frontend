import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ProfilePage from "./pages/user/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";


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
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<ProfilePage />} />
        {/* Có thể thêm các route con khác */}
        {/* <Route path="security" element={<SecurityPage />} /> */}
        {/* <Route path="settings" element={<SettingsPage />} /> */}
      </Route>
    </Routes>
    
  );
}

export default App;
