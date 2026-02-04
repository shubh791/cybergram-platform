import { createContext, useState, useRef } from "react";

export const ChatUnreadContext = createContext();

export function ChatUnreadProvider({ children }) {

  const [unreadMap, setUnreadMap] = useState({});
  const [activeChatId, _setActiveChatId] = useState(null);

  const activeRef = useRef(null);

  // Sync + immediate setter (fix race condition)
  const setActiveChatId = (id) => {
    activeRef.current = id;
    _setActiveChatId(id);
  };

  /* -----------------------------
     INCREMENT (new message)
  ----------------------------- */

  const increment = (senderId) => {

    // Block unread when chat is open
    if (activeRef.current === senderId) return;

    setUnreadMap(prev => {

      const updated = {
        ...prev,
        [senderId]: (prev[senderId] || 0) + 1
      };

      localStorage.setItem("chat_unread", JSON.stringify(updated));
      return updated;
    });
  };

  /* -----------------------------
     CLEAR USER
  ----------------------------- */

  const clearUser = (userId) => {

    setUnreadMap(prev => {

      const updated = { ...prev };
      delete updated[userId];

      localStorage.setItem("chat_unread", JSON.stringify(updated));
      return updated;
    });
  };

  /* -----------------------------
     TOTAL UNREAD
  ----------------------------- */

  const getTotalUnread = () => {

    return Object.entries(unreadMap)
      .filter(([id]) => id !== String(activeRef.current))
      .reduce((sum, [, val]) => sum + val, 0);
  };

  /* -----------------------------
     LOAD STORAGE
  ----------------------------- */

  const loadSaved = () => {

    const saved = localStorage.getItem("chat_unread");
    if (saved) setUnreadMap(JSON.parse(saved));
  };

  return (
    <ChatUnreadContext.Provider value={{
      unreadMap,
      increment,
      clearUser,
      loadSaved,
      getTotalUnread,
      activeChatId,
      setActiveChatId
    }}>
      {children}
    </ChatUnreadContext.Provider>
  );
}
