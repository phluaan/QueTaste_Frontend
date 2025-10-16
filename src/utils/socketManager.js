// src/utils/socketManager.js
import { io } from "socket.io-client";
import { getAccessToken } from "./storage";

let sockets = {
  chat: null,
  notification: null,
};

export const initSocket = (type, url, options = {}) => {
  const token = getAccessToken();
  if (!token) return null;

  // Đảm bảo chỉ tạo 1 instance cho mỗi loại
  if (sockets[type]) return sockets[type];

  const socket = io(url, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3000,
    ...options,
  });

  sockets[type] = socket;
  return socket;
};

export const disconnectSocket = (type) => {
  if (sockets[type]) {
    sockets[type].removeAllListeners();
    sockets[type].disconnect();
    sockets[type] = null;
  }
};

export const disconnectAllSockets = () => {
  Object.keys(sockets).forEach((type) => disconnectSocket(type));
};

export const getSocket = (type) => sockets[type];
