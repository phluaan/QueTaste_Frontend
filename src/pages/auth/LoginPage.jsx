import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import AuthLayout from "../../layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome to QueTatse"
      subtitle="Please sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
