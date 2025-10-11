import { Link } from "react-router-dom";
import logo from "../../assets/gauhai.png";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchNotifications,
  markRead,
  markAllRead,
} from "../../features/notification/slices/notificationSlice";
import { useNotificationSocket } from "../../features/notification/hooks/useNotificationSocket";
import { FiBell } from "react-icons/fi";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { items, unreadCount } = useSelector((s) => s.notification);
  const [showNoti, setShowNoti] = useState(false);

  // Kích hoạt socket để nhận realtime
  useNotificationSocket();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchNotifications());
    }
  }, [accessToken, dispatch]);

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
                onClick={() => setShowNoti(!showNoti)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-que-background hover:bg-que-secondary/20 transition-colors"
              >
                <FiBell className="h-6 w-6 text-que-text-main group-hover:text-que-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-que-danger border-2 border-white text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse"></span>
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
                      {items.map((n) => (
                        <li
                          key={n._id}
                          onClick={() => dispatch(markRead(n._id))}
                          className={`relative p-2 rounded cursor-pointer transition-colors ${
                            n.isRead
                              ? "text-que-text-muted hover:bg-que-background"
                              : "font-medium text-que-text-main bg-que-background hover:bg-que-secondary/10"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{n.message}</span>
                            {!n.isRead && (
                              <span className="inline-block w-2 h-2 bg-que-secondary rounded-full ml-1"></span>
                            )}
                          </div>
                          <div className="text-xs text-que-text-muted">
                            {new Date(n.createdAt).toLocaleString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={defaultAvatar}
                alt="avatar"
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-que-text-main">Admin</span>
            </div>
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
