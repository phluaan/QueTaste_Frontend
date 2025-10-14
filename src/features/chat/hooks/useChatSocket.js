import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  updatePresence,
  incrementUnread,
  markAsRead,
} from "../slices/chatSlice";
import { getAccessToken } from "../../../utils/storage";

let chatSocket; 

export const useChatSocket = (isOpen = false) => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((s) => s.chat);
  const initialized = useRef(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token || initialized.current) return;
    initialized.current = true;

    const SOCKET_URL =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:8088";

    chatSocket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
    });

    const handleMessage = (data) => {
      dispatch(addMessage(data));
      const currentConvId = activeConversation?._id;
      const msgConvId = data?.conversationId;
      if (!isOpen || msgConvId !== currentConvId) {
        dispatch(incrementUnread(msgConvId));
      } else {
        dispatch(markAsRead(msgConvId));
      }
    };

    const handlePresence = (data) => {
      dispatch(updatePresence(data));
    };

    chatSocket.on("chat:message", handleMessage);
    chatSocket.on("presence", handlePresence);

    return () => {
      if (chatSocket) {
        chatSocket.off("chat:message", handleMessage);
        chatSocket.off("presence", handlePresence);
      }
    };
  }, [dispatch]); 

  return chatSocket;
};
