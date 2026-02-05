const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function CommentItem({ comment }) {

  const avatarUrl =
    comment?.user?.avatar?.startsWith("http")
      ? comment.user.avatar
      : comment?.user?.avatar
      ? `${BASE_URL}/uploads/${comment.user.avatar}`
      : "https://i.pravatar.cc/150?img=15";

  return (
    <div className="flex gap-3 text-sm items-start">

      {/* AVATAR */}
      <img
        src={avatarUrl}
        alt="avatar"
        draggable={false}
        className="w-7 h-7 rounded-full border border-cyan-500/30 shrink-0"
      />

      {/* COMMENT TEXT */}
      <div className="break-words max-w-full">

        <span className="text-cyan-400 font-semibold block">
          {comment?.user?.username || "user"}
        </span>

        <p className="text-gray-300 leading-snug">
          {comment?.text}
        </p>

      </div>

    </div>
  );
}
