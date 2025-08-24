// src/pages/auth/VerifyOtpPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import VerifyOtpForm from "../../components/auth/VerifyOtpForm";

const VerifyOtpPage = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  return (
    <AuthLayout 
      title="Verify OTP"
      subtitle="Enter the code sent to your email">
      <VerifyOtpForm email={email} />
    </AuthLayout>
  );
};

export default VerifyOtpPage;
