import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../features/auth/slices/authSlice";
import logo from "../../assets/gauhai.png";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import UserMenu from "./UserMenu";
import { getUser } from "../../utils/storage";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accessToken} = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            await dispatch(logoutAsync()).unwrap();
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <header className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
            {/* Logo bên trái */}
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-10 w-10" />
                <span className="font-bold text-lg text-gray-800">QueTaste</span>
            </Link>

            {/* Nút bên phải */}
            <div className="flex items-center gap-4">
                {!accessToken ? (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <UserMenu defaultAvatar={defaultAvatar} handleLogout={handleLogout} />
                )}
            </div>
        </header>
    );
};
export default Header;
