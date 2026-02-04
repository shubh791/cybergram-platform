import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

// Create single socket instance
const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

// ================= PRESENCE HANDLING =================

// When socket connects → announce online
socket.on("connect", () => {

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  if (user?.id) {

    socket.emit("user_online", user.id);
    console.log("Presence sent: ONLINE", user.id);

  }
});

// When tab closes / refresh → announce offline
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
