import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage, updatePresence } from "../slices/chatSlice";
import { getAccessToken } from "../../../utils/storage";

let socket;

export const useChatSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8088";
    socket = io(SOCKET_URL, {
      auth: { token },
    });

    socket.on("connect", () => console.log("🔌 Chat socket connected"));
    socket.on("chat:message", (data) => {
      dispatch(addMessage(data));
    });
    socket.on("presence", (data) => {
      dispatch(updatePresence(data));
    });
    socket.on("disconnect", () => console.log("❌ Chat socket disconnected"));

    return () => {
      socket?.disconnect();
    };
  }, [dispatch]);
};
