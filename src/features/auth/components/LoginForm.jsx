// src/components/LoginForm.jsx
import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import InputField from "../../../components/InputField";
import ButtonCustom from "../../../components/ButtonCustom";
import useLogin from "../hooks/useLogin";
import LinkCustom from "../../../components/LinkCustom";
const LoginForm = () => {
  const {
    formData,
    errors,
    loading,
    error,
    rememberMe,
    handleChange,
    handleSubmit,
    setRememberMe,
  } = useLogin();

  return (
    <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={FaEnvelope}
          error={errors.email}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={FaLock}
          error={errors.password}
        />
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Remember me + Forgot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <LinkCustom to="/forgot-password">
          Forgot password?
        </LinkCustom>
      </div>

      <ButtonCustom type="submit" loading={loading}>
        Sign in
      </ButtonCustom>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <LinkCustom to="/register">
          Register
        </LinkCustom>
      </p>
    </form>
  );
};

export default LoginForm;
