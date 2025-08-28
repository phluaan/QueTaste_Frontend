// src/hooks/useLogin.js
import { validateLogin } from "../../../utils/validation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";

import { useNavigate } from "react-router-dom";
import { getProfile } from "../../user/slices/userSlice";

const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const { loading, error, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await dispatch(login({ 
          ...formData, 
          rememberMe 
        })).unwrap();
        dispatch(getProfile());
      } catch (err) {
        console.error("❌ Login failed: ", err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return {
    formData,
    errors,
    loading,
    error,
    rememberMe,
    handleChange,
    handleSubmit,
    setRememberMe,
  };
};

export default useLogin;
