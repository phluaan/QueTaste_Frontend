import { useState, useRef } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const VerifiedOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  

  // Khi nhập số
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Tự động focus ô tiếp theo
      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Khi nhấn backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Submit OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP entered:", otpCode);

    // TODO: gọi API verify OTP
    alert("Xác nhận OTP: " + otpCode);
    navigate("/login")
  };

  // Gửi lại OTP
  const handleResend = () => {
    console.log("Resend OTP");
    alert("OTP mới đã được gửi!");
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Xác nhận OTP</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Xác nhận
          </button>
        </form>

        {/* Resend */}
        <div className="mt-4 text-sm text-center text-gray-600">
          Chưa nhận được mã?{" "}
          <button
            onClick={handleResend}
            type="button"
            className="text-blue-600 hover:underline"
          >
            Gửi lại
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifiedOTP;
