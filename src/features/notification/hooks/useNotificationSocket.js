// src/features/notification/hooks/useNotificationSocket.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../slices/notificationSlice";
import { initSocket, getSocket } from "../../../utils/socketManager";

export const useNotificationSocket = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((s) => s.auth.accessToken);

  useEffect(() => {
    // Chỉ khởi tạo khi đã có token
    if (!accessToken) return;

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const wsUrl = apiUrl?.endsWith("/api") ? apiUrl.replace("/api", "") : (apiUrl || "http://localhost:8088");

    const socket = getSocket("notification") || initSocket("notification", wsUrl);
    if (!socket) return;

    const handleNoti = (noti) => dispatch(addNotification(noti));

    socket.on("notification", handleNoti);

    return () => {
      socket.off("notification", handleNoti);
    };
  }, [dispatch, accessToken]);
};
