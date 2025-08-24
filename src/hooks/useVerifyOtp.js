// src/hooks/useVerifyOtp.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtpApi } from "../services/authService";

const useVerifyOtp = (email) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return alert("Please enter OTP");

    setLoading(true);
    try {
      const res = await verifyOtpApi({ email, otp });
      alert(res.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    otp,
    setOtp,
    loading,
    handleSubmit,
  };
};

export default useVerifyOtp;
