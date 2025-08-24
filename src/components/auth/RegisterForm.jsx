// src/components/auth/RegisterForm.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import ButtonCustom from "../ButtonCustom";
import InputField from "../InputField";
import useRegister from "../../hooks/useRegister";
import LinkCustom from "../LinkCustom";
const RegisterForm = () => {
  const {
    formData,
    errors,
    loading,
    error,
    showPassword,
    showConfirm,
    setShowPassword,
    setShowConfirm,
    handleChange,
    handleSubmit,
  } = useRegister();

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-6">
      <div className="space-y-4">
        {/* Name */}
        <InputField
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          icon={FaUser}
          required
          error={errors.name}
        />
        {/* Email */}
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={FaEnvelope}
          required
          error={errors.email}
        />
        {/* Password */}
        <InputField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={FaLock}
          required
          rightIcon={showPassword ? FiEyeOff : FiEye}
          onRightIconClick={() => setShowPassword(!showPassword)}
          error={errors.password}
        />
        {/* Confirm Password */}
        <InputField
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          icon={FaCheckCircle}
          required
          rightIcon={showConfirm ? FiEyeOff : FiEye}
          onRightIconClick={() => setShowConfirm(!showConfirm)}
          error={errors.confirmPassword}
        />
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}


      <ButtonCustom type="submit" loading={loading}>
        Register
      </ButtonCustom>

      <div className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        
        <LinkCustom to="/login">
          Login
        </LinkCustom>
      </div>
    </form>
  );
};

export default RegisterForm;
