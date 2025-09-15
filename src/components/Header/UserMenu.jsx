import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { getUser } from "../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import {getProfile} from "../../features/user/slices/userSlice";

const UserMenu = ({ handleLogout, defaultAvatar }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = getUser();

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar + Họ tên user */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 font-medium text-gray-800 hover:text-black focus:outline-none"
      >
        <span>{user?.personalInfo?.fullName || "Người dùng"}</span>
        
        <img
          src={user?.avatar || defaultAvatar}
          alt="avatar"
          className="w-8 h-8 rounded-full border object-cover"
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg py-2 z-50">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
          >
            <User size={18} className="text-gray-600" />
            <span>Trang cá nhân</span>
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
          >
            <ShoppingCart size={18} className="text-gray-600" />
            <span>Đơn hàng của tôi</span>
          </Link>

          <button
            onClick={() => {
              handleLogout();
              navigate("/");
            }}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
          >
            <LogOut size={18} className="text-gray-600" />
            <span>Đăng xuất</span>
          </button>
        </div>
      )}

    </div>
  );
};

export default UserMenu;
