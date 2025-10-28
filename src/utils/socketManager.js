import { io } from "socket.io-client";
import { getAccessToken } from "./storage";

let socket = null;
let lastToken = null;

export const initMainSocket = (url, options = {}) => {
  const token = getAccessToken();
  if (!token) return null;

  // Nếu socket cũ còn hợp lệ
  if (socket && lastToken === token) {
    if (!socket.connected) socket.connect();
    return socket;
  }

  // Reset socket nếu token thay đổi
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  socket = io(url, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3000,
    ...options,
  });

  lastToken = token;

  // Debug
  socket.on("connect", () => console.log("[socket] Connected", socket.id));
  socket.on("disconnect", (reason) => console.warn("[socket] Disconnected:", reason));
  socket.on("connect_error", (err) => console.error("[socket] Error:", err.message));
  socket.on("reconnect", (attempt) => console.log("[socket] Reconnected after", attempt, "tries"));

  return socket;
};

export const getMainSocket = () => socket;

export const disconnectMainSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    lastToken = null;
  }
};
