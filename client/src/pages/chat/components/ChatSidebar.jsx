import { useEffect, useState, useContext } from "react";

import API from "../../../api/axios";

import ChatUserCard from "./ChatUserCard";

import { ChatUnreadContext } from "../../../context/ChatUnreadContext";
import { OnlineContext } from "../../../context/OnlineContext";

export default function ChatSidebar({ onSelectUser }) {

  const { unreadMap, clearUser, setActiveChatId } =
    useContext(ChatUnreadContext);

  const { onlineUsers } = useContext(OnlineContext);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedUserId, setSelectedUserId] = useState(null);

  /* ================= LOAD USERS ================= */

  useEffect(() => {

    const loadUsers = async () => {

      try {

        const res = await API.get("/chat/users");
        setUsers(res.data);

      } catch (err) {

        console.log("User load error:", err);

      } finally {

        setLoading(false);

      }

    };

    loadUsers();

  }, []);

  /* ================= FILTER ================= */

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= USER CLICK ================= */

  const handleUserClick = (user) => {

    setSelectedUserId(user.id);

    setActiveChatId(user.id);

    clearUser(user.id);

    onSelectUser(user);

  };

  return (

    <div className="w-full flex flex-col flex-1 min-h-0 bg-[#050d18]">

      {/* HEADER */}

      <div className="
        sticky top-0 z-20
        p-4
        border-b border-cyan-500/20
        bg-[#050d18]
      ">

        <h2 className="text-cyan-400 font-semibold mb-2">
          Messages
        </h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="
            w-full
            bg-black/40
            border border-cyan-500/20
            rounded-lg
            px-3 py-2
            text-sm
            outline-none
            text-white
            placeholder-gray-400
            focus:border-cyan-400
            focus:ring-1 focus:ring-cyan-400/30
          "
        />

      </div>

      {/* USER LIST */}

      <div className="
        flex-1
        overflow-y-auto
        scrollbar-thin scrollbar-thumb-cyan-500/30
      ">

        {loading && (
          <div className="text-center text-gray-400 text-sm mt-6">
            Loading chats...
          </div>
        )}

        {!loading && filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-6">
            No users found
          </div>
        )}

        {filteredUsers.map(user => (

          <ChatUserCard
            key={user.id}
            user={user}
            isOnline={onlineUsers.includes(String(user.id))}
            unreadCount={
              selectedUserId === user.id
                ? 0
                : (unreadMap[user.id] || 0)
            }
            isActive={selectedUserId === user.id}
            onClick={() => handleUserClick(user)}
          />

        ))}

      </div>

    </div>

  );
}
