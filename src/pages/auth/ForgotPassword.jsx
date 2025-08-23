import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import ButtonCustom from "../../components/ButtonCustom";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("Forgot password email:", email);

            // giả lập gọi API
            await new Promise((res) => setTimeout(res, 1500));

            alert("Email reset password đã được gửi!");
            navigate("/verify-otp");
        } catch (error) {
            alert("Có lỗi xảy ra, vui lòng thử lại.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="bg-white p-8 rounded-2xl shadow-md w-96">
                <h2 className="text-2xl text-center font-semibold text-[#07689F] mb-5">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <ButtonCustom type="submit" loading={loading}>
                        Reser Password
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

export default ForgotPassword;
