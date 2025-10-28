import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMainSocket, getMainSocket } from "../utils/socketManager";
import { addNotification } from "../features/notification/slices/notificationSlice";
import {
  addMessage,
  incrementUnread,
  markAsRead,
  updatePresence,
} from "../features/chat/slices/chatSlice";

export const useMainSocket = (isChatOpen = false) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((s) => s.auth.accessToken);
  const activeConversation = useSelector((s) => s.chat.activeConversation);

  useEffect(() => {
    if (!accessToken) return;
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const baseUrl = apiUrl?.replace(/\/api$/, "") || "http://localhost:8088";

    const socket = getMainSocket() || initMainSocket(baseUrl);
    if (!socket) return;

    // Chat message
    const handleChat = (data) => {
      dispatch(addMessage(data));
      const currentId = activeConversation?._id;
      if (!isChatOpen || data.conversationId !== currentId)
        dispatch(incrementUnread(data.conversationId));
      else dispatch(markAsRead(data.conversationId));
    };

    // Notifications
    const handleNoti = (noti) => dispatch(addNotification(noti));

    // Presence
    const handlePresence = (data) => dispatch(updatePresence(data));

    socket.on("chat:message", handleChat);
    socket.on("notification", handleNoti);
    socket.on("presence", handlePresence);

    return () => {
      socket.off("chat:message", handleChat);
      socket.off("notification", handleNoti);
      socket.off("presence", handlePresence);
    };
  }, [dispatch, accessToken, activeConversation?._id, isChatOpen]);
};
