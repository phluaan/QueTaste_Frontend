import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addNotification } from "../slices/notificationSlice";
import { getAccessToken } from "../../../utils/storage";

let notiSocket;

export const useNotificationSocket = () => {
  const dispatch = useDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token || initialized.current) return;
    initialized.current = true;

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const wsUrl = apiUrl.replace("/api", "");

    notiSocket = io(wsUrl, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
    });

    const handleNotification = (noti) => {
      dispatch(addNotification(noti));
    };

    notiSocket.on("notification", handleNotification);

    return () => {
      if (notiSocket) {
        notiSocket.off("notification", handleNotification);
      }
    };
  }, [dispatch]);

  return notiSocket;
};
