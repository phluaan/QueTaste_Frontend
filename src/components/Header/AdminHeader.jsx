import { Link } from "react-router-dom";
import logo from "../../assets/gauhai.png";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchNotifications, markRead, markAllRead } from "../../features/notification/slices/notificationSlice";
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
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-black">QueTaste Admin</span>
      </Link>

      <div className="flex items-center gap-4">
        {accessToken ? (
          <>
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNoti(!showNoti)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
              >
                <FiBell className="h-6 w-6 text-gray-700 group-hover:text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 border-2 border-white text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse"></span>
                )}
              </button>

              {showNoti && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto z-50 border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-blue-700">Thông báo Admin</span>
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
                          <div className="text-xs text-gray-400">
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
              <span className="text-gray-600">Admin</span>
            </div>
          </>
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
