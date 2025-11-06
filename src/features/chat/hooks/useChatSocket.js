// src/features/chat/hooks/useChatSocket.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  updatePresence,
  incrementUnread,
  markAsRead,
} from "../slices/chatSlice";
import { initSocket, getSocket } from "../../../utils/socketManager";

export const useChatSocket = (isOpen = false) => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((s) => s.chat);
  const accessToken = useSelector((s) => s.auth.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8088";
    const socket = getSocket("chat") || initSocket("chat", SOCKET_URL);
    if (!socket) return;

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

    socket.on("chat:message", handleMessage);
    socket.on("presence", handlePresence);

    return () => {
      socket.off("chat:message", handleMessage);
      socket.off("presence", handlePresence);
    };
  }, [dispatch, accessToken, activeConversation?._id, isOpen]);
};
