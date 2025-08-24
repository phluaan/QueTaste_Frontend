import React from "react";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";

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
