import VerifiedIcon from "@mui/icons-material/Verified";

export default function ChatUserCard({
  user,
  onClick,
  unreadCount = 0,
  isActive = false,
  isOnline = false
}) {

  // ================= OFFICIAL ACCOUNT CHECK =================

  const isOfficial = user.id === 8;

  // ================= AVATAR =================

  const avatar = user.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `http://localhost:5000/uploads/${user.avatar}`
    : "https://i.pravatar.cc/150?img=5";

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3
        px-4 py-3
        cursor-pointer
        select-none
        border-b border-cyan-500/10
        transition

        ${isActive
          ? "bg-cyan-500/20 border-l-4 border-cyan-400"
          : "hover:bg-cyan-500/10 active:bg-cyan-500/20"}
      `}
    >

      {/* ================= AVATAR + ONLINE DOT ================= */}

      <div className="relative">

        <img
          src={avatar}
          onError={(e) => {
            e.target.src = "https://i.pravatar.cc/150?img=5";
          }}
          className={`
            w-11 h-11
            rounded-full
            object-cover
            border
            ${
              isOfficial
                ? "border-green-500"
                : "border-cyan-500/40"
            }
          `}
          alt="profile"
        />

        {/* ONLINE INDICATOR */}

        {isOnline && (
          <span
            className="
              absolute bottom-0 right-0
              w-3 h-3
              bg-green-500
              border-2 border-[#050d18]
              rounded-full
            "
          />
        )}

        {/* ✅ VERIFIED BADGE ONLY FOR OFFICIAL */}

        {isOfficial && (
          <span
            className="
              absolute -bottom-1 -right-1
              bg-green-500
              p-[2px]
              rounded-full
            "
          >
            <VerifiedIcon
              sx={{ fontSize: 12 }}
              className="text-white"
            />
          </span>
        )}

      </div>

      {/* ================= USER INFO ================= */}

      <div className="flex flex-col flex-1 overflow-hidden">

        <div className="flex items-center gap-1">

          <span
            className={`
              text-sm
              font-medium
              truncate
              ${isActive ? "text-cyan-300" : "text-gray-200"}
            `}
          >
            @{user.username}
          </span>

          {/* ✅ NAME VERIFIED ICON */}

          {isOfficial && (
            <VerifiedIcon className="text-green-500 text-xs" />
          )}

        </div>

        <span
          className="
            text-gray-500
            text-xs
            truncate
          "
        >
          Click to chat
        </span>

      </div>

      {/* ================= UNREAD BADGE ================= */}

      {unreadCount > 0 && (

        <div
          className="
            bg-red-500
            text-white
            text-[11px]
            min-w-[18px]
            h-[18px]
            px-1
            rounded-full
            flex items-center justify-center
            font-semibold
            animate-pulse
          "
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>

      )}

    </div>
  );
}
