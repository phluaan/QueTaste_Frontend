import { Link } from "react-router-dom";
import logo from "../../assets/gauhai.png";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { useSelector } from "react-redux";

export default function AdminHeader() {
    const { accessToken } = useSelector((state) => state.auth);

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-black">QueTaste</span>
        </Link>

        {/* User menu / login */}
        <div className="flex items-center gap-4">
            {accessToken ? (
            <div className="flex items-center gap-2 cursor-pointer">
                <img
                src={defaultAvatar}
                alt="avatar"
                className="w-8 h-8 rounded-full border"
                />
                <span className="text-gray-600">Admin</span>
            </div>
            ) : (
            <div className="flex gap-2">
                <Link
                to="/login"
                className="px-3 py-1 border border-primary text-primary rounded hover:bg-secondary"
                >
                Login
                </Link>
                <Link
                to="/register"
                className="px-3 py-1 bg-primary text-white rounded hover:bg-accent"
                >
                Register
                </Link>
            </div>
            )}
        </div>
        </header>
    );
}