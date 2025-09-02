import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../features/auth/slices/authSlice";
import logo from "../../assets/gauhai.png";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import UserMenu from "./UserMenu";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4">
        {/* Container gom tất cả vào giữa */}
        <div className="flex items-center justify-center h-16 space-x-8">
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

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!accessToken ? (
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
            ) : (
              <UserMenu defaultAvatar={defaultAvatar} handleLogout={handleLogout} />
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