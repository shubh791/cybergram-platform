import { useState } from "react";
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

  // Logged in user
  const token = localStorage.getItem("token");
  let loggedUsername = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      loggedUsername = decoded.username;
    } catch {}
  }

  const isOwner = loggedUsername === profile.username;

  // ✅ OFFICIAL ACCOUNT CHECK
  const isOfficial = profile.id === 8;

  const avatarUrl = profile.avatar
    ? profile.avatar.startsWith("http")
      ? profile.avatar
      : `http://localhost:5000/uploads/${profile.avatar}`
    : "https://i.pravatar.cc/300";

  return (
    <div className="
      w-full
      bg-[#0b1628]
      border border-cyan-500/20
      rounded-2xl
      p-4 sm:p-5 md:p-6
      flex flex-col sm:flex-row
      gap-4 sm:gap-6
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
            w-20 h-20
            sm:w-24 sm:h-24
            md:w-28 md:h-28
            rounded-full
            object-cover
            border-4
            ${
              isOfficial
                ? "border-green-500"
                : "border-cyan-500/30"
            }
          `}
        />

        {/* Camera only for owner */}
        {isOwner && (
          <div className="
            absolute inset-0
            bg-black/40
            rounded-full
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition
          ">
            <CameraAltIcon className="text-white" />
          </div>
        )}

        {/* ✅ VERIFIED BADGE ONLY FOR OFFICIAL */}
        {isOfficial && (
          <span className="
            absolute bottom-1 right-1
            bg-green-500 p-1 rounded-full
          ">
            <VerifiedIcon sx={{ fontSize: 14 }} className="text-white" />
          </span>
        )}

      </div>

      {/* INFO */}
      <div className="flex-1 w-full text-center sm:text-left">

        <div className="flex items-center justify-center sm:justify-start gap-2">

          <h2 className="font-bold text-base sm:text-lg md:text-xl">
            @{profile.username}
          </h2>

          {/* ✅ NAME VERIFIED ICON ONLY FOR OFFICIAL */}
          {isOfficial && (
            <VerifiedIcon className="text-green-500 text-sm sm:text-base" />
          )}

        </div>

        <p className="
          text-gray-400
          text-xs sm:text-sm
          mt-2
          max-w-xl
          mx-auto sm:mx-0
        ">
          {profile.bio || "No bio added yet"}
        </p>

        {/* STATS */}
        <div className="
          flex justify-center sm:justify-start
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
              mt-4
              bg-green-500 hover:bg-green-600
              text-black
              px-4 py-2
              rounded-lg
              flex items-center gap-2
              font-semibold
              mx-auto sm:mx-0
              text-sm
            "
          >
            <EditIcon fontSize="small" />
            Edit Profile
          </button>

        ) : (

          <button
            onClick={onFollowToggle}
            className={`
              mt-4
              px-5 py-2
              rounded-lg
              font-semibold
              text-sm
              mx-auto sm:mx-0
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
    <div className="text-center">
      <p className="font-bold text-sm sm:text-base md:text-lg">
        {value}
      </p>
      <p className="text-gray-400 text-[11px] sm:text-sm">
        {label}
      </p>
    </div>
  );
}
