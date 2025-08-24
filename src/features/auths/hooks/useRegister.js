import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../../utils/validation";

const useRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const result = await dispatch(
        register({ name: formData.name, email: formData.email, password: formData.password })
      ).unwrap();

      alert("Register success, please verify OTP!");
      console.log(result);
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return {
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
  };
};

export default useRegister;
