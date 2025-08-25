import React, { useState, useEffect } from "react";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import useResetPassword from "../hooks/useResetPassword";
import ButtonCustom from "../../../components/ButtonCustom";
import InputField from "../../../components/InputField";

const ResetPasswordForm = () => {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleResendOtp,
    resendLoading,
    countdown,
  } = useResetPassword();

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email (readonly) */}
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Nhập email của bạn"
          icon={FaEnvelope}
          error={errors.email}
          autoComplete="off"
          disabled
        />

        {/* OTP */}
        <InputField
          id="otp"
          name="otp"
          type="text"
          value={formData.otp}
          onChange={handleChange}
          placeholder="Nhập mã OTP"
          icon={FaKey}
          error={errors.otp}
        />

        {/* New Password */}
        <InputField
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Nhập mật khẩu mới"
          icon={FaLock}
          error={errors.newPassword}
        />

        {/* Submit */}
        <ButtonCustom type="submit" loading={loading}>
          Xác nhận
        </ButtonCustom>

        {/* Resend OTP */}
        <ButtonCustom
          type="button"
          onClick={handleResendOtp}
          loading={resendLoading}
          disabled={resendLoading || countdown > 0}
        >
          {countdown > 0 ? `Gửi lại OTP sau ${countdown}s` : "Gửi lại OTP"}
        </ButtonCustom>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
