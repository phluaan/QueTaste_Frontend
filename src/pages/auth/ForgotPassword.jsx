import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Forgot password email:", email);
        // TODO: call API forgot password
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-md w-96">
            <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition"
            >
                Reset Password
            </button>
            </form>
            <div className="mt-4 text-sm text-center text-gray-600">
            Back to{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
                Login
            </Link>
            </div>
        </div>
        </div>
    );
};

export default ForgotPassword;
