import { useEffect, useState, useContext, useRef } from "react";
import API from "../../../api/axios";

import { SocketContext } from "../../../context/SocketContext";
import { ChatUnreadContext } from "../../../context/ChatUnreadContext";
import { OnlineContext } from "../../../context/OnlineContext";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function ChatWindow({ selectedUser, onBack }) {

  const socket = useContext(SocketContext);
  const { onlineUsers } = useContext(OnlineContext);
  const { setActiveChatId } = useContext(ChatUnreadContext);

  const [messages, setMessages] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const bottomRef = useRef(null);
  const menuRef = useRef(null);

  const localUser = JSON.parse(localStorage.getItem("user"));

  const isOfficial = selectedUser?.id === 8;

  /* ACTIVE CHAT */
  useEffect(() => {
    if (!selectedUser) return;
    setActiveChatId(selectedUser.id);
    return () => setActiveChatId(null);
  }, [selectedUser, setActiveChatId]);

  /* LOAD MESSAGES */
  useEffect(() => {
    if (!selectedUser) return;

    const loadMessages = async () => {
      try {
        const res = await API.get(`/chat/${selectedUser.id}`);
        setMessages(res.data);
      } catch (err) {
        console.log("Chat load error:", err);
      }
    };

    loadMessages();
  }, [selectedUser]);

  /* SOCKET EVENTS */
  useEffect(() => {
    if (!socket || !selectedUser) return;

    const handleIncoming = (data) => {
      if (String(data.senderId) === String(selectedUser.id)) {
        setMessages(prev => [...prev, data]);

        socket.emit("message_seen", {
          senderId: data.senderId,
          messageId: data.id
        });
      }
    };

    const handleSeen = ({ messageId }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    };

    socket.on("new_message", handleIncoming);
    socket.on("message_seen_update", handleSeen);

    return () => {
      socket.off("new_message", handleIncoming);
      socket.off("message_seen_update", handleSeen);
    };

  }, [socket, selectedUser]);

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* SEND */
  const handleSend = async (text) => {
    if (!text.trim()) return;

    try {
      const res = await API.post("/chat/send", {
        receiverId: selectedUser.id,
        content: text
      });

      const savedMsg = res.data;
      setMessages(prev => [...prev, savedMsg]);
      socket.emit("send_message", savedMsg);

    } catch (err) {
      console.log("Send failed:", err);
    }
  };

  /* DELETE CHAT */
  const handleDeleteChat = async () => {
    try {
      await API.delete(`/chat/delete/${selectedUser.id}`);
      setMessages([]);
      setConfirmDelete(false);
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  /* CLOSE MENU */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ONLINE STATUS */
  const isOnline = onlineUsers?.has
    ? onlineUsers.has(String(selectedUser.id))
    : onlineUsers.includes(String(selectedUser.id));

  const profileImage =
    selectedUser?.avatar
      ? selectedUser.avatar.startsWith("http")
        ? selectedUser.avatar
        : `http://localhost:5000/uploads/${selectedUser.avatar}`
      : "https://i.pravatar.cc/150";

  return (

    <div className="flex flex-col flex-1 min-h-0 bg-[#050d18] overflow-hidden">

      {/* HEADER */}
      <div className="
        flex items-center justify-between
        px-3 sm:px-4 py-3
        border-b border-cyan-500/10
        bg-[#071427]
      ">

        <div className="flex items-center gap-3 min-w-0">

          <button
            onClick={onBack}
            className="md:hidden text-cyan-400 text-xl shrink-0"
          >
            ←
          </button>

          <img
            src={profileImage}
            className={`
              w-9 h-9 sm:w-10 sm:h-10
              rounded-full object-cover border shrink-0
              ${isOfficial ? "border-green-500" : "border-cyan-400/40"}
            `}
          />

          <div className="flex flex-col truncate">

            <div className="flex items-center gap-1 truncate">

              <span className="text-cyan-400 font-semibold truncate">
                @{selectedUser.username}
              </span>

              {isOfficial && (
                <VerifiedIcon className="text-green-500 text-sm" />
              )}

            </div>

            <span className={`text-xs ${isOnline ? "text-green-400" : "text-gray-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>

          </div>

        </div>

        {/* MENU */}
        <div ref={menuRef} className="relative shrink-0">

          <button
            onClick={() => setMenuOpen(p => !p)}
            className="text-cyan-400"
          >
            <MoreVertIcon />
          </button>

          {menuOpen && (
            <div className="
              absolute right-0 mt-2 w-44
              bg-[#071427]
              border border-cyan-500/20
              rounded-lg shadow-xl
              overflow-hidden z-50
            ">
              <div
                onClick={() => {
                  setConfirmDelete(true);
                  setMenuOpen(false);
                }}
                className="
                  flex items-center gap-2
                  px-4 py-2 text-red-400
                  hover:bg-red-500/10
                  cursor-pointer text-sm
                "
              >
                <DeleteOutlineIcon fontSize='small' />
                Clear History
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MESSAGE AREA */}
      <div className="
        flex-1 min-h-0 overflow-y-auto
        px-3 sm:px-4 md:px-6 py-4 space-y-3
      ">
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMine={msg.senderId === localUser.id}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="shrink-0 border-t border-cyan-500/10">
        <ChatInput onSend={handleSend} />
      </div>

      {/* DELETE MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="
            bg-[#071427]
            border border-cyan-500/20
            rounded-xl p-5
            w-[90%] max-w-sm
            text-center
          ">

            <p className="text-white mb-4 text-sm sm:text-base">
              Clear this chat for you?
            </p>

            <div className="flex gap-3 justify-center">

              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteChat}
                className="px-4 py-2 bg-red-500 rounded-lg text-sm"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
