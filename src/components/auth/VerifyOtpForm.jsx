// src/components/auth/VerifyOtpForm.jsx
import React from "react";
import ButtonCustom from "../ButtonCustom";
import InputField from "../InputField";
import LinkCustom from "../LinkCustom";
import useVerifyOtp from "../../hooks/useVerifyOtp";
const VerifyOtpForm = ({ email }) => {
  const { otp, setOtp, loading, handleSubmit } = useVerifyOtp(email);

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-6">
      
      <InputField
        id="otp"
        name="otp"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        label=""
        placeholder="Enter OTP"
      />

      <ButtonCustom type="submit" loading={loading}>
        Verify OTP
      </ButtonCustom>

      <p className="mt-4 text-sm text-center text-gray-600">
        Back to{" "}
        <LinkCustom to="/login">
          Login
        </LinkCustom>
      </p>
    </form>
  );
};

export default VerifyOtpForm;
