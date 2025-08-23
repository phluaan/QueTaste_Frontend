import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifiedOTP from "./pages/auth/VerifiedOTP";
import ProfilePage from "./pages/user/ProfilePage";


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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verified-otp" element={<VerifiedOTP />} />

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
