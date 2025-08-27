import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword, resetPassword } from "../slices/authSlice";
import { validateEmail, validateResetPassword } from "../../../utils/validation";

const useResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy email từ trang forgot-password
  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gửi lại OTP
  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      await dispatch(forgotPassword({ email: formData.email })).unwrap();
      console.log("Resend OTP to:", formData.email);
      setCountdown(60); // reset countdown
    } catch (err) {
      console.error(err);
      setErrors({ general: "Không thể gửi lại OTP, vui lòng thử lại" });
    } finally {
      setResendLoading(false);
    }
  };

  // Countdown effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValid = validateEmail(formData.email);
    const OTPValid = validateOTP(formData.otp);
    const passValid = validateResetPassword(formData.newPassword);

    if (!emailValid || !OTPValid || !passValid) {
      setErrors({
        email: !emailValid ? "Email không hợp lệ" : undefined,
        otp: !OTPValid ? "OTP không hợp lệ" : undefined,
        newPassword: !passValid ? "Mật khẩu mới không hợp lệ" : undefined,
      });
      return;
    }

    setLoading(true);
    try {
      await dispatch(resetPassword(formData)).unwrap();
      alert("Mật khẩu đã được đặt lại thành công!");
      navigate("/login");
    } catch (err) {
      console.error("❌ Reset Password failed:", err);
      setErrors({ general: err.message || "Đặt lại mật khẩu thất bại" });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    resendLoading,
    countdown,
    handleChange,
    handleSubmit,
    handleResendOtp,
  };
};

export default useResetPassword;
