import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// ================= ICONS =================
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// ================= CONTEXT =================
import { ChatUnreadContext } from "../../context/ChatUnreadContext";
import { SocketContext } from "../../context/SocketContext";

export default function HomeHeader() {

  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);

  const isNewsPage = location.pathname === "/news";

  const { getTotalUnread, loadSaved, activeChatId } =
    useContext(ChatUnreadContext);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  /* ================= CHAT UNREAD LOAD ================= */

  useEffect(() => {
    loadSaved();
  }, []);

  /* ================= USER LOAD ================= */

  useEffect(() => {

    const localUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (localUser) {
      setUser(JSON.parse(localUser));
      return;
    }

    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch {
      console.log("JWT decode failed");
    }

  }, []);

  /* ================= REALTIME NOTIFICATION ================= */

  useEffect(() => {

    const handler = (e) => {

      const data = e.detail;
      if (!data) return;

      const newNotification = {
        id: data.id || Date.now(),
        type: data.type,
        message: data.message,
        fromUsername: data.fromUsername,
        time: data.createdAt || Date.now()
      };

      setNotifications(prev =>
        [newNotification, ...prev].slice(0, 20)
      );

      setUnreadCount(prev => prev + 1);
    };

    window.addEventListener("newNotification", handler);

    return () => {
      window.removeEventListener("newNotification", handler);
    };

  }, []);

  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {

    const handler = (e) => {

      if (dropdownRef.current &&
        !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }

      if (notifRef.current &&
        !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }

    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);

  }, []);

  /* ================= NAV ================= */

  const goProfile = () => {
    setOpen(false);
    if (user?.username) navigate(`/profile/${user.username}`);
  };

  const goHome = () => {
    setOpen(false);
    navigate("/home");
  };

  const goNews = () => {
    setOpen(false);
    navigate("/news");
  };

  const goHelp = () => {
    setOpen(false);
    navigate("/help");
  };

  const goChat = () => navigate("/chat");

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  /* ================= AVATAR ================= */

  const profileImage =
    user?.avatar?.startsWith("http")
      ? user.avatar
      : "https://i.pravatar.cc/150";

  const getIcon = (type) => {

    if (type === "follow") return <PersonAddIcon className="text-cyan-400" />;
    if (type === "like") return <FavoriteIcon className="text-pink-400" />;
    if (type === "comment") return <CommentIcon className="text-green-400" />;

    return <NotificationsIcon className="text-gray-400" />;
  };

  const formatTime = (time) => {

    const diff = Math.floor((Date.now() - time) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="sticky top-0 z-50 bg-[#081423] border-b border-cyan-500/20 px-4 md:px-6 h-16 flex items-center justify-between">

      {/* LOGO */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img src="/cybergram-logo.png" className="w-9 h-9" />
        <span className="text-cyan-400 font-bold hidden sm:block">
          CYBERGRAM
        </span>
      </div>

      <div className="flex items-center gap-4">

        {/* CHAT */}
        <div onClick={goChat} className="relative cursor-pointer">
          <ForumIcon className="text-cyan-400" />

          {!activeChatId && getTotalUnread() > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {getTotalUnread()}
            </span>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div ref={notifRef} className="relative">

          <div
            onClick={() => {
              setNotifOpen(prev => !prev);
              setUnreadCount(0);
            }}
            className="cursor-pointer"
          >
            <NotificationsIcon className="text-cyan-400" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </div>

          {notifOpen && (

            <div className="absolute right-0 mt-3 w-72 max-h-80 bg-[#081423] border border-cyan-500/20 rounded-xl shadow-xl overflow-hidden">

              <div className="px-4 py-2 border-b border-cyan-500/20 text-sm font-semibold text-cyan-400">
                Notifications
              </div>

              <div className="overflow-y-auto">

                {notifications.length === 0 && (
                  <div className="text-center text-gray-400 py-6 text-sm">
                    No notifications yet
                  </div>
                )}

                {notifications.map((n) => (

                  <div
                    key={n.id}
                    className="px-4 py-3 border-b border-cyan-500/10 flex gap-3 text-sm"
                  >
                    {getIcon(n.type)}

                    <div>
                      <span className="text-gray-300">{n.message}</span>
                      <div className="text-[11px] text-gray-500">
                        {formatTime(n.time)}
                      </div>
                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

        {/* PROFILE MENU */}
        <div ref={dropdownRef} className="relative">

          <div
            onClick={() => setOpen(p => !p)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <img
              src={profileImage}
              className="w-9 h-9 rounded-full border border-cyan-400/40 object-cover"
            />

            <ArrowDropDownIcon className="text-cyan-400 hidden md:block" />
          </div>

          {open && (

            <div className="absolute right-0 mt-3 w-52 bg-[#081423] border border-cyan-500/20 rounded-xl shadow-xl">

              <DropdownItem icon={<PersonIcon />} label="View Profile" onClick={goProfile} />
              <DropdownItem icon={<LogoutIcon />} label="Logout" onClick={handleLogout} danger />

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

function DropdownItem({ icon, label, onClick, danger }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm transition ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-300 hover:bg-cyan-500/10"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}
