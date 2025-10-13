import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  updatePresence,
  incrementUnread,
  markAsRead,
} from "../slices/chatSlice";
import { getAccessToken } from "../../../utils/storage";

let socket;

export const useChatSocket = (isOpen = false) => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((s) => s.chat);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const SOCKET_URL =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:8088";

    if (!socket) {
      socket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
      });
    }

    socket.on("connect", () => console.log("🔌 Chat socket connected"));

    socket.on("chat:message", (data) => {
      dispatch(addMessage(data));

      const currentConvId = activeConversation?._id;
      const msgConvId = data?.conversationId;

      if (!isOpen || msgConvId !== currentConvId) {
        dispatch(incrementUnread(msgConvId));
      } else {
        dispatch(markAsRead(msgConvId));
      }
    });

    socket.on("presence", (data) => {
      dispatch(updatePresence(data));
    });

    socket.on("disconnect", () => console.log("❌ Chat socket disconnected"));

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [dispatch, activeConversation, isOpen]);
};
