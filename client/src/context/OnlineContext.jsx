import { createContext, useState } from "react";

export const OnlineContext = createContext({
  onlineUsers: [],
  addOnline: () => {},
  removeOnline: () => {},
  setBulkOnline: () => {}
});

export const OnlineProvider = ({ children }) => {

  const [onlineUsers, setOnlineUsers] = useState([]);

  /* ================= ADD ONLINE ================= */

  const addOnline = (id) => {

    const uid = String(id);

    setOnlineUsers(prev => {

      if (prev.includes(uid)) return prev;

      return [...prev, uid];

    });

  };

  /* ================= REMOVE ONLINE ================= */

  const removeOnline = (id) => {

    const uid = String(id);

    setOnlineUsers(prev =>
      prev.filter(userId => userId !== uid)
    );

  };

  /* ================= BULK SET (OPTIONAL) ================= */

  const setBulkOnline = (list) => {

    if (!Array.isArray(list)) return;

    setOnlineUsers(list.map(String));

  };

  return (

    <OnlineContext.Provider
      value={{
        onlineUsers,
        addOnline,
        removeOnline,
        setBulkOnline
      }}
    >

      {children}

    </OnlineContext.Provider>

  );
};
