import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/gauhai.png";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchNotifications,
  markRead,
  markAllRead,
} from "../../features/notification/slices/notificationSlice";
import { FiBell } from "react-icons/fi";
import AdminMenu from "../AdminMenu";
import { logoutAsync } from "../../features/auth/slices/authSlice";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, user } = useSelector((state) => state.auth);
  const { items, unreadCount } = useSelector((s) => s.notification);
  const [showNoti, setShowNoti] = useState(false);

  useEffect(() => {
    if (accessToken) dispatch(fetchNotifications());
  }, [accessToken, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="h-16 bg-que-surface shadow flex items-center justify-between px-6">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-que-primary">
          QueTaste Admin
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {accessToken ? (
          <>
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNoti((v) => !v)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-que-background hover:bg-que-secondary/20 transition-colors"
                aria-haspopup="true"
                aria-expanded={showNoti}
                aria-label="Notifications"
              >
                <FiBell className="h-6 w-6 text-que-text-main" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-que-danger border-2 border-white text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse" />
                )}
              </button>

              {showNoti && (
                <div className="absolute right-0 mt-2 w-80 bg-que-surface shadow-lg rounded-md p-3 max-h-96 overflow-y-auto z-50 border border-que-secondary/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-que-primary">
                      Thông báo Admin
                    </span>
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
                    <p className="text-que-text-muted text-sm">
                      Không có thông báo
                    </p>
                  ) : (
                    <ul>
                      {items
                      .filter((n) => n && n._id && n.message)
                      .map((n) => (
                        <li
                          key={n._id || `${n.message}-${n.createdAt || Math.random()}`}
                          onClick={() => n._id && dispatch(markRead(n._id))}
                          className={`relative p-2 rounded cursor-pointer transition-colors ${
                            n.isRead
                              ? "text-que-text-muted hover:bg-que-background"
                              : "font-medium text-que-text-main bg-que-background hover:bg-que-secondary/10"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{n.message}</span>
                            {!n.isRead && (
                              <span className="inline-block w-2 h-2 bg-que-secondary rounded-full ml-1" />
                            )}
                          </div>
                          <div className="text-xs text-que-text-muted">
                            {n.createdAt
                              ? new Date(n.createdAt).toLocaleString()
                              : "—"}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Admin dropdown */}
            <AdminMenu
              avatar={defaultAvatar}
              name={user?.fullName || user?.name || "Admin"}
              onLogout={handleLogout}
            />
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-3 py-1 border border-que-primary text-que-primary rounded hover:bg-que-secondary/20"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-que-primary text-white rounded hover:bg-que-accent"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
