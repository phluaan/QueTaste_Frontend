import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Giả lập gọi API
      await new Promise((res) => setTimeout(res, 1500));
      alert("Reset password email has been sent!");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("ForgotPassword error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    error,
    handleSubmit,
  };
};

export default useForgotPassword;
