import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthLayout from "../../layouts/AuthLayout";
import axios from "axios";
import ButtonCustom from "../../components/ButtonCustom";
import { API_BASE_URL } from "../../config";
const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/register`, {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            alert(res.data.message);

            // Nếu API trả về resend hoặc thành công, redirect sang VerifyOtp
            navigate("/verify-otp", { state: { email: form.email } });

        } catch (err) {
            alert(err.response?.data?.message || "Failed to register");
        } finally {
            setLoading(false);
        }
    };


    return (
        <AuthLayout>
        <div className="bg-white p-8 rounded-2xl shadow-md w-96">
            <h2 className="text-3xl text-center font-semibold text-[#07689F] mb-5">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            {/* Email */}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            {/* Password */}
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
                <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
                <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
                <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
                >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
                </span>
            </div>

            <ButtonCustom type="submit" loading={loading}>
                Register
            </ButtonCustom>
            </form>

            <div className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#07689F] hover:text-[#FF7E67] transition-colors">
                Login
            </Link>
            </div>
        </div>
        </AuthLayout>
    );
};

export default Register;
