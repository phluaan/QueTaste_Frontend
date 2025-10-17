// src/utils/socketManager.js
import { io } from "socket.io-client";
import { getAccessToken } from "./storage";

let sockets = {
  chat: null,
  notification: null,
};

let lastToken = {
  chat: null,
  notification: null,
};

export const initSocket = (type, url, options = {}) => {
  const token = getAccessToken();
  if (!token) return null;

  // Nếu đã có socket nhưng token đã đổi -> disconnect & tạo mới
  if (sockets[type]) {
    if (lastToken[type] === token) {
      // Đúng token hiện tại -> đảm bảo đã connect
      if (!sockets[type].connected) sockets[type].connect();
      return sockets[type];
    }
    sockets[type].removeAllListeners();
    sockets[type].disconnect();
    sockets[type] = null;
  }

  const socket = io(url, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3000,
    ...options,
  });

  sockets[type] = socket;
  lastToken[type] = token;

  return socket;
};

export const disconnectSocket = (type) => {
  if (sockets[type]) {
    sockets[type].removeAllListeners();
    sockets[type].disconnect();
    sockets[type] = null;
    lastToken[type] = null;
  }
};

export const disconnectAllSockets = () => {
  Object.keys(sockets).forEach((type) => disconnectSocket(type));
};

export const getSocket = (type) => sockets[type];
