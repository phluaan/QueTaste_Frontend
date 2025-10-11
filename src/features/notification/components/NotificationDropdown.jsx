import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchNotifications,
  markRead,
  markAllRead,
} from "../notificationSlice";

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
          <span className="absolute -top-1 -right-1 bg-que-danger text-que-surface text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-80 bg-que-surface shadow-lg rounded-md p-2 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">Thông báo</span>
          {unreadCount > 0 && (
            <button
              onClick={() => dispatch(markAllRead())}
              className="text-sm text-que-secondary"
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
                onClick={() => dispatch(markRead(n._id))}
                className={`p-2 rounded cursor-pointer ${
                  n.isRead ? "bg-que-background" : "bg-que-accent/10"
                }`}
              >
                <div className="font-medium">{n.message}</div>
                <div className="text-xs text-que-text-muted">{n.createdAt}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
