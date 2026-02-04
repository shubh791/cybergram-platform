import { createContext, useEffect, useRef, useContext } from "react";
import socket from "../socket";

import { ChatUnreadContext } from "./ChatUnreadContext";
import { OnlineContext } from "./OnlineContext";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {

  const connectedRef = useRef(false);

  const unreadCtx = useContext(ChatUnreadContext);
  const { addOnline, removeOnline, setBulkOnline } = useContext(OnlineContext);

  const incrementRef = useRef(unreadCtx.increment);

  // Prevent stale closure
  useEffect(() => {
    incrementRef.current = unreadCtx.increment;
  }, [unreadCtx.increment]);

  useEffect(() => {

    /* ================= CONNECT ================= */

    if (!connectedRef.current) {
      socket.connect();
      connectedRef.current = true;
      console.log("Socket Connected");
    }

    /* ================= JOIN ================= */

    const joinUser = () => {

      const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

      if (user?.id) {
        socket.emit("join", user.id);
      }

    };

    if (socket.connected) joinUser();
    socket.on("connect", joinUser);

    /* ================= INITIAL ONLINE LIST ================= */

    const handleOnlineList = (list) => {
      setBulkOnline(list);
    };

    socket.on("online_users", handleOnlineList);

    /* ================= ONLINE STATUS ================= */

    const handleUserOnline = (userId) => {
      addOnline(userId);
    };

    const handleUserOffline = (userId) => {
      removeOnline(userId);
    };

    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);

    /* ================= CHAT UNREAD ================= */

    const handleNewMessage = (data) => {

      if (!data?.senderId) return;

      incrementRef.current(data.senderId);

    };

    socket.on("new_message", handleNewMessage);

    /* ================= 🔥 GLOBAL NOTIFICATION RELAY ================= */

    const handleNotification = (data) => {

      // Forward to UI globally (works on chat page too)
      window.dispatchEvent(
        new CustomEvent("newNotification", {
          detail: data
        })
      );

    };

    socket.on("notification", handleNotification);

    /* ================= CLEANUP ================= */

    return () => {

      socket.off("connect", joinUser);

      socket.off("online_users", handleOnlineList);

      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);

      socket.off("new_message", handleNewMessage);

      socket.off("notification", handleNotification);

    };

  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
