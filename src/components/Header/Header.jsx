import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../features/auth/slices/authSlice";
import logo from "../../assets/gauhai.png";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import UserMenu from "./UserMenu";
import { FiMenu, FiX } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useEffect } from "react";
import { fetchCart } from "../../features/cart/slices/cartSlice";
import { fetchNotifications, markRead, markAllRead } from "../../features/notification/slices/notificationSlice";
import { useNotificationSocket } from "../../features/notification/hooks/useNotificationSocket";
import { FiBell } from "react-icons/fi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, unreadCount } = useSelector((s) => s.notification);
  const [showNoti, setShowNoti] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);

  useNotificationSocket();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchNotifications());
    }
  }, [accessToken, dispatch]);

  // lấy số lượng item từ redux store giỏ hàng
  const cartItems = useSelector((state) => state.cart.items || []);
  const cartCount = cartItems.length;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCart());
    }
  }, [accessToken, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-neutral shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-black">QueTaste</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          {/* User + Cart + Notification */} 
          <div className="hidden md:flex items-center space-x-4">
            {accessToken && (
              <>
                {/* Cart Button */}
                <Link to="/cart" className="relative">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#FFE1DA]">
                    <HiOutlineShoppingBag className="h-6 w-6 text-[#FF7E67]" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#FF7E67] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Notification bell nằm cạnh giỏ hàng */}
                <div className="relative ml-2">
                  <button
                    onClick={() => setShowNoti(!showNoti)}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                  >
                    <FiBell className="h-6 w-6 text-gray-700 group-hover:text-blue-600" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-500 border-2 border-white text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse"></span>
                    )}
                  </button>

                  {showNoti && (
                    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto z-50 border border-blue-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-blue-700">Thông báo</span>
                        {unreadCount > 0 && (
                          <button
                            onClick={() => dispatch(markAllRead())}
                            className="text-sm text-green-600 font-semibold hover:underline px-2 py-1 rounded transition-colors hover:bg-green-50"
                          >
                            Đánh dấu tất cả đã đọc
                          </button>
                        )}
                      </div>

                      {items.length === 0 ? (
                        <p className="text-gray-500 text-sm">Không có thông báo</p>
                      ) : (
                        <ul>
                          {items.map((n) => (
                            <li
                              key={n._id}
                              onClick={() => dispatch(markRead(n._id))}
                              className={`relative p-2 rounded cursor-pointer hover:bg-blue-50 transition-colors ${
                                n.isRead ? "text-gray-600" : "font-medium text-black bg-blue-50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span>{n.message}</span>
                                {!n.isRead && (
                                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1"></span>
                                )}
                              </div>
                              <div className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-300" />

                {/* User menu */}
                <UserMenu defaultAvatar={defaultAvatar} handleLogout={handleLogout} />
              </>
            )}

            {!accessToken && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-primary text-white hover:bg-accent"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent hover:bg-secondary"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-neutral">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block text-primary hover:text-accent hover:bg-secondary px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </Link>
          ))}

          {!accessToken && (
            <div className="mt-4 space-y-2">
              <Link
                to="/login"
                className="block w-full text-left text-primary hover:text-accent px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-accent"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
