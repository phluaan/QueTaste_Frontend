// src/components/auth/VerifyOtpForm.jsx
import React from "react";
import ButtonCustom from "../../../components/ButtonCustom";
import InputField from "../../../components/InputField";
import LinkCustom from "../../../components/LinkCustom";
import useVerifyOtp from "../hooks/useVerifyOtp";

const VerifyOtpForm = ({ email }) => {
  const { otp, setOtp, loading, handleSubmit } = useVerifyOtp(email);

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-6">
      <p className="text-sm text-center text-que-text-muted">
        Nhập mã OTP đã được gửi đến <span className="font-medium">{email}</span>
      </p>

      <InputField
        id="otp"
        name="otp"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Nhập mã OTP"
        maxLength={6}
        className="text-center tracking-widest"
      />

      <ButtonCustom type="submit" loading={loading}>
        Xác minh OTP
      </ButtonCustom>

      <p className="mt-4 text-sm text-center text-que-text-muted">
        Quay lại <LinkCustom to="/login">Đăng nhập</LinkCustom>
      </p>
    </form>
  );
};

export default VerifyOtpForm;
