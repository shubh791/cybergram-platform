import { io } from "socket.io-client";

const SOCKET_URL = "https://cybergram-server.onrender.com";

// Create single socket instance
const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

// ================= PRESENCE HANDLING =================

socket.on("connect", () => {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  if (user?.id) {
    socket.emit("user_online", user.id);
    console.log("Presence sent: ONLINE", user.id);
  }
});

window.addEventListener("beforeunload", () => {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  if (user?.id && socket.connected) {
    socket.emit("user_offline", user.id);
    socket.disconnect();
  }
});

export default socket;
