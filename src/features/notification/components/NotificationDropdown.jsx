import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotifications, markRead, markAllRead } from "../notificationSlice";

const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const { items, unreadCount } = useSelector((s) => s.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="relative">
      <button className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-2 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">Thông báo</span>
          {unreadCount > 0 && (
            <button
              onClick={() => dispatch(markAllRead())}
              className="text-sm text-blue-500"
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
                className={`p-2 rounded cursor-pointer ${
                  n.isRead ? "bg-gray-100" : "bg-blue-50"
                }`}
              >
                <div className="font-medium">{n.message}</div>
                <div className="text-xs text-gray-500">{n.createdAt}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
