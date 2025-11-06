import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../features/auth/slices/authSlice";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import UserMenu from "./UserMenu";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { fetchCart } from "../../features/cart/slices/cartSlice";
import {
  fetchNotifications,
  markRead,
  markAllRead,
} from "../../features/notification/slices/notificationSlice";
//import { useNotificationSocket } from "../../features/notification/hooks/useNotificationSocket";
import Logo from "../Logo";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, unreadCount } = useSelector((s) => s.notification);
  const [showNoti, setShowNoti] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);

  //useNotificationSocket();

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
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Dịch vụ", href: "/services" },
    { name: "Giới thiệu", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <nav className="bg-que-surface shadow-md fixed top-0 w-full z-50 border-b border-que-secondary/20">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-que-text-main hover:text-que-accent px-3 py-2 rounded-md text-base font-medium transition-colors"
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
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-que-background">
                    <HiOutlineShoppingBag className="h-6 w-6 text-que-accent" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-que-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Notification bell */}
                <div className="relative ml-2">
                  <button
                    onClick={() => setShowNoti(!showNoti)}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-que-background hover:bg-que-secondary/20 transition-colors"
                  >
                    <FiBell className="h-6 w-6 text-que-text-main group-hover:text-que-secondary" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-que-danger border-2 border-white text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse"></span>
                    )}
                  </button>
                    {showNoti && (
                      <div className="absolute right-0 mt-2 w-80 bg-que-surface shadow-lg rounded-md p-3 max-h-96 overflow-y-auto z-50 border border-que-secondary/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-que-primary">Thông báo</span>
                          {unreadCount > 0 && (
                            <button
                              onClick={() => dispatch(markAllRead())}
                              className="text-sm text-que-secondary font-semibold hover:underline px-2 py-1 rounded transition-colors hover:bg-que-background"
                            >
                              Đánh dấu tất cả đã đọc
                            </button>
                          )}
                        </div>

                        {items.length === 0 ? (
                          <p className="text-que-text-muted text-sm">Không có thông báo</p>
                        ) : (
                          <ul>
                            {items.map((n) => (
                              <li
                                key={n._id}
                                onClick={async () => {
                                  try {
                                    await dispatch(markRead(n._id));

                                    if (n.link) {
                                      if (n.link.startsWith("/")) {
                                        navigate(n.link);
                                      } else {
                                        window.open(n.link, "_blank");
                                      }
                                    }

                                    setShowNoti(false);
                                  } catch (err) {
                                    console.error("Lỗi khi mở thông báo:", err);
                                  }
                                }}
                                className={`relative p-2 rounded cursor-pointer hover:bg-que-secondary/10 transition-colors ${
                                  n.isRead
                                    ? "text-que-text-muted"
                                    : "font-medium text-que-text-main bg-que-secondary/10"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span>
                                    {n.message
                                      ? n.message.replace(
                                          /#undefined/g,
                                          "#6905edd25e4823c88f9b7940"
                                        )
                                      : "Thông báo không xác định"}
                                  </span>
                                  {!n.isRead && (
                                    <span className="inline-block w-2 h-2 bg-que-accent rounded-full ml-1"></span>
                                  )}
                                </div>
                                <div className="text-xs text-que-text-muted">
                                  {new Date(n.createdAt).toLocaleString("vi-VN")}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-que-secondary/30" />

                {/* User menu */}
                <UserMenu
                  defaultAvatar={defaultAvatar}
                  handleLogout={handleLogout}
                />
              </>
            )}

            {!accessToken && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full border border-que-primary text-que-primary hover:bg-que-secondary hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-que-primary text-white hover:bg-que-accent transition-colors"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-que-primary hover:text-que-accent hover:bg-que-secondary/20"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-que-surface border-t border-que-secondary/20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block text-que-text-main hover:text-que-accent hover:bg-que-background px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </Link>
          ))}

          {!accessToken && (
            <div className="mt-4 space-y-2">
              <Link
                to="/login"
                className="block w-full text-left text-que-primary hover:text-que-accent px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center bg-que-primary text-white px-4 py-2 rounded-md hover:bg-que-accent transition-colors"
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
