import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../slices/notificationSlice";
import { initSocket, getSocket } from "../../../utils/socketManager";

export const useNotificationSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const wsUrl = apiUrl.replace("/api", "");

    const socket =
      getSocket("notification") || initSocket("notification", wsUrl);

    if (!socket) return;

    const handleNoti = (noti) => {
      dispatch(addNotification(noti));
    };

    socket.on("notification", handleNoti);

    return () => {
      socket.off("notification", handleNoti);
    };
  }, [dispatch]);
};
