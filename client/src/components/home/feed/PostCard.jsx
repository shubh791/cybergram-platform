import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VerifiedIcon from "@mui/icons-material/Verified";

import ImageCarousel from "./ImageCarousel";
import ImagePreviewModal from "./ImagePreviewModal";
import CommentBox from "./comments/CommentBox";

import API from "../../../api/axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function PostCard({ post }) {

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = currentUser?.id === post.user.id;
  const isOfficial = post.user.id === 8;

  const [previewData, setPreviewData] = useState(null);

  /* ================= LIKE ================= */
  const [liked, setLiked] = useState(
    post.likes?.some(like => like.userId === currentUser?.id)
  );
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);

  /* ================= COMMENTS ================= */
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(
    post.comments?.length || 0
  );
  const [commentAnim, setCommentAnim] = useState(false);

  /* ================= SAVE ================= */
  const [saved, setSaved] = useState(
    post.saves?.some(save => save.userId === currentUser?.id)
  );
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveAnim, setSaveAnim] = useState(false);

  /* ================= FOLLOW ================= */
  const [following, setFollowing] = useState(post.user.isFollowing || false);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.username === post.user.username) {
        setFollowing(prev => !prev);
      }
    };
    window.addEventListener("followUpdated", handler);
    return () => window.removeEventListener("followUpdated", handler);
  }, [post.user.username]);

  /* ================= LIKE HANDLER ================= */
  const handleLike = async () => {
    if (likeLoading) return;

    const newLiked = !liked;

    setLiked(newLiked);
    setLikeCount(p => newLiked ? p + 1 : p - 1);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 200);

    try {
      setLikeLoading(true);
      await API.post(`/likes/${post.id}`);
    } catch {
      // rollback
      setLiked(!newLiked);
      setLikeCount(p => newLiked ? p - 1 : p + 1);
    } finally {
      setLikeLoading(false);
    }
  };

  /* ================= SAVE HANDLER ================= */
  const handleSave = async () => {
    if (saveLoading) return;

    const newSaved = !saved;
    setSaved(newSaved);
    setSaveAnim(true);
    setTimeout(() => setSaveAnim(false), 200);

    try {
      setSaveLoading(true);
      await API.post(`/saves/${post.id}`);
    } catch {
      setSaved(!newSaved);
    } finally {
      setSaveLoading(false);
    }
  };

  /* ================= FOLLOW HANDLER ================= */
  const handleFollow = async () => {
    await API.post(`/follow/${post.user.username}`);
    window.dispatchEvent(
      new CustomEvent("followUpdated", {
        detail: { username: post.user.username }
      })
    );
  };

  const goProfile = () => {
    navigate(`/profile/${post.user.username}`);
  };

  const getImageUrl = (img) =>
    img?.startsWith("http")
      ? img
      : `${BASE_URL}/uploads/${img}`;

  return (
    <div className="bg-[#050b14] border border-cyan-500/20 rounded-xl p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div onClick={goProfile} className="flex items-center gap-3 cursor-pointer">
          <img
            src={
              post.user.avatar
                ? getImageUrl(post.user.avatar)
                : "https://i.pravatar.cc/150"
            }
            className={`w-9 h-9 rounded-full object-cover border ${
              isOfficial ? "border-green-500" : "border-cyan-400/40"
            }`}
          />
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-semibold text-sm">
              @{post.user.username}
            </span>
            {isOfficial && <VerifiedIcon className="text-green-500 text-sm" />}
          </div>
        </div>

        {!isOwner && (
          <button
            onClick={handleFollow}
            className={`text-xs px-3 py-1 rounded-full border ${
              following
                ? "border-red-400 text-red-400"
                : "border-cyan-400 text-cyan-400"
            }`}
          >
            {following ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* CAPTION */}
      {post.caption && (
        <p className="text-sm text-gray-200 mb-3">{post.caption}</p>
      )}

      {/* IMAGE */}
      {post.images?.length > 0 && (
        <div className="mb-4">
          {post.images.length === 1 ? (
            <img
              src={getImageUrl(post.images[0])}
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
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={handleLike}
            className={`transition ${likeAnim ? "scale-125" : "scale-100"}`}
          >
            {liked ? <FavoriteIcon className="text-pink-500" /> : <FavoriteBorderIcon />}
            <span className="ml-1 text-xs">
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </span>
          </button>

          <button
            onClick={() => setShowComments(p => !p)}
            className={`transition ${commentAnim ? "scale-125" : "scale-100"}`}
          >
            <ChatBubbleOutlineIcon />
            <span className="ml-1 text-xs">
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </span>
          </button>
        </div>

        <button
          onClick={handleSave}
          className={`transition ${saveAnim ? "scale-125" : "scale-100"}`}
        >
          {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </button>
      </div>

      {previewData && (
        <ImagePreviewModal
          images={previewData.images}
          startIndex={previewData.index}
          onClose={() => setPreviewData(null)}
        />
      )}

      {showComments && (
        <CommentBox
          postId={post.id}
          onCountChange={(count) => {
            setCommentCount(count);
            setCommentAnim(true);
            setTimeout(() => setCommentAnim(false), 200);
          }}
        />
      )}
    </div>
  );
}
