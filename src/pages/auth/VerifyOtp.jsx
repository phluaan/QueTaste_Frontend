import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import ButtonCustom from "../../components/ButtonCustom";

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Email sẽ được truyền từ Register page qua state
    const email = location.state?.email || "";
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otp) return alert("Please enter OTP");

        setLoading(true);
        try {
        const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
            email,
            otp,
        });
        alert(res.data.message);
        navigate("/login"); // xác nhận xong quay về login
        } catch (err) {
        alert(err.response?.data?.message || "OTP verification failed");
        } finally {
        setLoading(false);
        }
    };

    return (
        <AuthLayout>
        <div className="bg-white p-8 rounded-2xl shadow-md w-96">
            <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <ButtonCustom type="submit" loading={loading}>
                Verify OTP
            </ButtonCustom>
            </form>

            <div className="mt-4 text-sm text-center text-gray-600">
            Back to{" "}
            <Link to="/login" className="font-semibold text-[#07689F] hover:text-[#FF7E67] transition-colors">
                Login
            </Link>
            </div>
        </div>
        </AuthLayout>
    );
};

export default VerifyOtp;
