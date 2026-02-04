import { useContext } from "react";
import { OnlineContext } from "../../../context/OnlineContext";

export default function ChatUserItem({ user, onClick }) {

  const onlineUsers = useContext(OnlineContext);

  const isOnline = onlineUsers.includes(String(user.id));

  const avatar =
    user.avatar
      ? user.avatar.startsWith("http")
        ? user.avatar
        : `http://localhost:5000/uploads/${user.avatar}`
      : "https://i.pravatar.cc/150";

  return (
    <div
      onClick={onClick}
      className="
        flex items-center gap-3
        px-3 py-3
        cursor-pointer
        hover:bg-cyan-500/10
        border-b border-cyan-500/5
      "
    >

      {/* AVATAR */}
      <div className="relative">

        <img
          src={avatar}
          className="w-10 h-10 rounded-full object-cover"
        />

        {isOnline && (
          <span className="
            absolute bottom-0 right-0
            w-3 h-3
            bg-green-400
            border-2 border-[#050d18]
            rounded-full
          " />
        )}

      </div>

      {/* NAME */}
      <div className="flex flex-col">

        <span className="text-sm text-white">
          @{user.username}
        </span>

        <span className="text-xs text-gray-400">
          Click to chat
        </span>

      </div>

    </div>
  );
}
