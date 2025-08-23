import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { validateLogin } from "../utils/validation";
import InputField from "./InputField";
import ButtonCustom from "./ButtonCustom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const { loading, error, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      console.log("Login success ✅, token:", accessToken);
      // navigate("/dashboard");
    }
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const result = await dispatch(login(formData)).unwrap();
        if (rememberMe) {
          localStorage.setItem("accessToken", result.accessToken);
        } else {
          sessionStorage.setItem("accessToken", result.accessToken);
        }
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

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={FaEnvelope}
          error={errors.email}
          autoComplete="email"
        />
        <InputField
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={FaLock}
          error={errors.password}
          autoComplete="current-password"
        />
      </div>

      {error && <p className="text-sm text-[#FF7E67] text-center">{error}</p>}

      {/* Remember me + Forgot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-[#07689F] focus:ring-[#07689F] border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>

        <button
          type="button"
          className="text-sm font-medium text-gray-700 hover:text-[#FF7E67] transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <ButtonCustom type="submit" loading={loading}>
        Sign in
      </ButtonCustom>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          className="font-semibold text-[#07689F] hover:text-[#FF7E67] transition-colors"
        >
          Create Account
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
