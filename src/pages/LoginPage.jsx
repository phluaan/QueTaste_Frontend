import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen bg-[#FAFAFA] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#07689F] mb-2">
            Welcome to Que Tatse
          </h2>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
