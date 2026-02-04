// ================= ICONS =================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VerifiedIcon from "@mui/icons-material/Verified";

// ================= COMPONENTS =================
import ImageCarousel from "./ImageCarousel";
import ImagePreviewModal from "./ImagePreviewModal";
import CommentBox from "./comments/CommentBox";

// ================= API =================
import API from "../../../api/axios";

// ================= BASE URL (🔥 FIX) =================
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// ================= COMPONENT =================
export default function PostCard({ post }) {

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = currentUser?.id === post.user.id;

  // ✅ OFFICIAL ACCOUNT CHECK
  const isOfficial = post.user.id === 8;

  // ================= PREVIEW =================
  const [previewData, setPreviewData] = useState(null);

  // ================= LIKE =================
  const [liked, setLiked] = useState(
    post.likes?.some(like => like.userId === currentUser?.id)
  );

  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [likeLoading, setLikeLoading] = useState(false);

  // ================= COMMENTS =================
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);

  // ================= SAVE =================
  const [saved, setSaved] = useState(
    post.saves?.some(save => save.userId === currentUser?.id)
  );

  const [saveLoading, setSaveLoading] = useState(false);

  // ================= FOLLOW =================
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    setFollowing(post.user.isFollowing || false);
  }, [post.user.isFollowing]);

  /* ================= FOLLOW SYNC LISTENER ================= */
  useEffect(() => {

    const handler = (e) => {
      if (e.detail.username === post.user.username) {
        setFollowing(e.detail.following);
      }
    };

    window.addEventListener("followUpdated", handler);

    return () => {
      window.removeEventListener("followUpdated", handler);
    };

  }, [post.user.username]);

  /* ================= LIKE ================= */
  const handleLike = async () => {

    if (likeLoading) return;

    const newLiked = !liked;

    try {
      setLikeLoading(true);
      setLiked(newLiked);
      setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
      await API.post(`/likes/${post.id}`);
    } catch {
      setLiked(liked);
      setLikeCount(prev => newLiked ? prev - 1 : prev + 1);
    } finally {
      setLikeLoading(false);
    }

  };

  /* ================= SAVE ================= */
  const handleSave = async () => {

    if (saveLoading) return;

    const newSaved = !saved;

    try {
      setSaveLoading(true);
      setSaved(newSaved);
      await API.post(`/saves/${post.id}`);
    } catch {
      setSaved(saved);
    } finally {
      setSaveLoading(false);
    }

  };

  /* ================= FOLLOW ================= */
  const handleFollow = async () => {

    if (followLoading) return;

    try {
      setFollowLoading(true);

      const res = await API.post(`/follow/${post.user.username}`);
      setFollowing(res.data.following);

      window.dispatchEvent(
        new CustomEvent("followUpdated", {
          detail: {
            username: post.user.username,
            following: res.data.following
          }
        })
      );

    } catch (error) {
      console.log("FOLLOW ERROR:", error);
    } finally {
      setFollowLoading(false);
    }

  };

  /* ================= PROFILE NAV ================= */
  const goProfile = () => {
    navigate(`/profile/${post.user.username}`);
  };

  return (
    <div className="
      bg-[#050b14]
      border border-cyan-500/20
      rounded-xl
      p-3 sm:p-4
      shadow-[0_0_20px_rgba(0,255,255,0.05)]
    ">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">

        <div
          onClick={goProfile}
          className="flex items-center gap-3 cursor-pointer"
        >

          <img
            src={
              post.user.avatar
                ? post.user.avatar.startsWith("http")
                  ? post.user.avatar
                  : `${BASE_URL}/uploads/${post.user.avatar}`
                : "https://i.pravatar.cc/150"
            }
            className={`
              w-9 h-9 rounded-full object-cover border
              ${isOfficial
                ? "border-green-500"
                : "border-cyan-400/40"}
            `}
          />

          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-semibold text-sm">
              @{post.user.username}
            </span>
            {isOfficial && (
              <VerifiedIcon className="text-green-500 text-sm" />
            )}
          </div>

        </div>

        {!isOwner && (
          <button
            onClick={handleFollow}
            disabled={followLoading}
            className={`
              text-xs px-3 py-1 rounded-full border
              flex items-center gap-1
              ${following
                ? "border-red-400 text-red-400"
                : "border-cyan-400 text-cyan-400"}
            `}
          >
            {following
              ? <PersonRemoveIcon fontSize="small" />
              : <PersonAddAltIcon fontSize="small" />
            }
            {following ? "Unfollow" : "Follow"}
          </button>
        )}

      </div>

      {/* CATEGORY */}
      <div className="mb-2">
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400">
          #{post.category}
        </span>
      </div>

      {/* CAPTION */}
      {post.caption && (
        <p className="text-sm text-gray-200 mb-3">
          {post.caption}
        </p>
      )}

      {/* IMAGE */}
      {post.images?.length > 0 && (
        <div className="mb-4">

          {post.images.length === 1 ? (
            <img
              src={`${BASE_URL}/uploads/${post.images[0]}`}
              onClick={() => setPreviewData({ images: post.images, index: 0 })}
              className="w-full max-h-[400px] object-contain rounded-lg bg-black cursor-pointer"
            />
          ) : (
            <ImageCarousel
              images={post.images}
              onPreview={(index) =>
                setPreviewData({ images: post.images, index })
              }
            />
          )}

        </div>
      )}

      {/* ACTION BAR */}
      <div className="flex justify-between items-center pt-3 border-t border-cyan-500/20">

        <div className="flex items-center gap-4">
          <button onClick={handleLike}>
            {liked
              ? <FavoriteIcon className="text-pink-500" />
              : <FavoriteBorderIcon className="text-cyan-400" />
            }
          </button>
          <span className="text-xs text-gray-400">{likeCount}</span>
          <button onClick={() => setShowComments(p => !p)}>
            <ChatBubbleOutlineIcon className="text-cyan-400" />
          </button>
        </div>

        <button onClick={handleSave}>
          {saved
            ? <BookmarkIcon className="text-yellow-400" />
            : <BookmarkBorderIcon className="text-cyan-400" />
          }
        </button>

      </div>

      {/* COMMENTS */}
      {showComments && (
        <CommentBox postId={post.id} onCountChange={setCommentCount} />
      )}

      {/* IMAGE PREVIEW */}
      {previewData && (
        <ImagePreviewModal
          images={previewData.images}
          startIndex={previewData.index}
          onClose={() => setPreviewData(null)}
        />
      )}

    </div>
  );
}
