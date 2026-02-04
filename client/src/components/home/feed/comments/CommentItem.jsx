export default function CommentItem({ comment }) {

  return (
    <div className="flex gap-3 text-sm">

      <img
        src={comment.user.avatar || "https://i.pravatar.cc/150?img=15"}
        className="w-7 h-7 rounded-full border border-cyan-500/30"
        alt="avatar"
      />

      <div>

        <span className="text-cyan-400 font-semibold">
          {comment.user.username}
        </span>

        <p className="text-gray-300">
          {comment.text}
        </p>

      </div>

    </div>
  );
}
