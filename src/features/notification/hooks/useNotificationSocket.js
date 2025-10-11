import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addNotification } from "../slices/notificationSlice";
import { getAccessToken } from "../../../utils/storage";

let socket;

export const useNotificationSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const wsUrl = apiUrl.replace("/api", "");
    if (!socket) {
      socket = io(wsUrl, {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      socket.on("connect", () => {
        console.log("🔌 Socket connected", socket.id);
      });

      socket.on("disconnect", (reason) => {
        console.warn("❌ Socket disconnected:", reason);
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Connect error:", err.message);
      });

      socket.on("notification", (noti) => {
        console.log("📩 Realtime notification:", noti);
        dispatch(addNotification(noti));
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [dispatch]);
};
