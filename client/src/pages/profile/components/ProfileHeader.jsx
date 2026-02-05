import { jwtDecode } from "jwt-decode";

import VerifiedIcon from "@mui/icons-material/Verified";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function ProfileHeader({
  profile,
  onEdit,
  onAvatarClick,
  onFollowToggle
}) {

  const token = localStorage.getItem("token");
  let loggedUsername = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      loggedUsername = decoded.username;
    } catch {}
  }

  const isOwner = loggedUsername === profile.username;
  const isOfficial = profile.id === 8;

  const avatarUrl = profile.avatar
    ? profile.avatar.startsWith("http")
      ? profile.avatar
      : `http://localhost:5000/uploads/${profile.avatar}`
    : "https://i.pravatar.cc/300";

  return (
    <div className="
      w-full max-w-full overflow-hidden
      bg-[#0b1628] border border-cyan-500/20 rounded-2xl
      p-4 sm:p-5 md:p-6
      flex flex-col sm:flex-row
      gap-5 sm:gap-6
      items-center sm:items-start
    ">

      {/* AVATAR */}
      <div
        onClick={isOwner ? onAvatarClick : undefined}
        className="relative cursor-pointer group shrink-0"
      >
        <img
          src={avatarUrl}
          alt="profile"
          draggable={false}
          className={`
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
            rounded-full object-cover border-4
            ${isOfficial ? "border-green-500" : "border-cyan-500/30"}
          `}
        />

        {isOwner && (
          <div className="
            absolute inset-0 bg-black/40 rounded-full
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition
          ">
            <CameraAltIcon className="text-white" />
          </div>
        )}

        {isOfficial && (
          <span className="absolute bottom-1 right-1 bg-green-500 p-1 rounded-full">
            <VerifiedIcon sx={{ fontSize: 14 }} className="text-white" />
          </span>
        )}
      </div>

      {/* INFO */}
      <div className="flex-1 w-full text-center sm:text-left">

        {/* USERNAME */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <h2 className="font-bold text-base sm:text-lg md:text-xl break-all">
            @{profile.username}
          </h2>

          {isOfficial && (
            <VerifiedIcon className="text-green-500 text-sm sm:text-base" />
          )}
        </div>

        {/* BIO */}
        <p className="
          text-gray-400 text-xs sm:text-sm
          mt-2 max-w-xl mx-auto sm:mx-0
          break-words leading-relaxed
        ">
          {profile.bio || "No bio added yet"}
        </p>

        {/* STATS */}
        <div className="
          flex flex-wrap
          justify-center sm:justify-start
          gap-4 sm:gap-8
          mt-4
        ">
          <Stat label="Posts" value={profile._count.posts} />
          <Stat label="Followers" value={profile._count.followers} />
          <Stat label="Following" value={profile._count.following} />
        </div>

        {/* ACTION BUTTON */}
        {isOwner ? (
          <button
            onClick={onEdit}
            className="
              mt-5
              w-full sm:w-auto
              bg-green-500 hover:bg-green-600
              text-black px-4 py-2
              rounded-lg flex items-center justify-center gap-2
              font-semibold text-sm
            "
          >
            <EditIcon fontSize="small" />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={onFollowToggle}
            className={`
              mt-5
              w-full sm:w-auto
              px-5 py-2 rounded-lg font-semibold text-sm
              transition
              ${
                profile.isFollowing
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-black"
              }
            `}
          >
            {profile.isFollowing ? "Following" : "Follow"}
          </button>
        )}

      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center min-w-[70px]">
      <p className="font-bold text-sm sm:text-base md:text-lg">
        {value}
      </p>
      <p className="text-gray-400 text-[11px] sm:text-sm">
        {label}
      </p>
    </div>
  );
}
