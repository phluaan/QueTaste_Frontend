import React from "react";
import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we’ll send you instructions to reset it"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
