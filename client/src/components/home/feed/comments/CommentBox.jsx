import { useEffect, useState } from "react";
import API from "../../../../api/axios";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function CommentBox({ postId, onCountChange }) {

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  /* ================= POST COMMENT ================= */

  const handleSubmit = async () => {

    if (!text.trim()) return;

    try {

      await API.post(`/comments/${postId}`, {
        text,
        parentId: replyTo
      });

      setText("");
      setReplyTo(null);

      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);

      // ✅ LOCAL COUNT UPDATE
      onCountChange?.(res.data.length);

      // ✅ GLOBAL EVENT SYNC
      window.dispatchEvent(
        new CustomEvent("commentAdded", {
          detail: { postId }
        })
      );

    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE COMMENT ================= */

  const confirmDelete = async () => {

    try {

      await API.delete(`/comments/${deleteTarget}`);
      setDeleteTarget(null);

      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);

      // ✅ LOCAL COUNT UPDATE
      onCountChange?.(res.data.length);

      // ✅ GLOBAL EVENT SYNC
      window.dispatchEvent(
        new CustomEvent("commentDeleted", {
          detail: { postId }
        })
      );

    } catch (err) {
      console.error(err);
    }
  };

  /* ================= BUILD TREE ================= */

  const buildTree = (list, parentId = null) =>
    list
      .filter(c => c.parentId === parentId)
      .map(c => ({
        ...c,
        replies: buildTree(list, c.id)
      }));

  const tree = buildTree(comments);

  return (
    <div className="mt-4 space-y-4">

      {/* INPUT */}

      <div className="flex gap-2">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={replyTo ? "Reply..." : "Write a comment..."}
          className="
            flex-1
            bg-[#081423]
            border border-cyan-500/20
            rounded-lg
            px-3 py-2
            text-sm
            text-white
            outline-none
          "
        />

        <button
          onClick={handleSubmit}
          className="text-cyan-400 hover:text-cyan-300"
        >
          <SendRoundedIcon />
        </button>

      </div>

      {/* COMMENTS */}

      <div className="space-y-3">

        {tree.map(comment => (

          <CommentItem
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onReply={setReplyTo}
            onDelete={setDeleteTarget}
          />

        ))}

      </div>

      {/* DELETE MODAL */}

      {deleteTarget && (

        <div className="
          fixed inset-0
          bg-black/60
          flex items-center justify-center
          z-50
        ">

          <div className="
            bg-[#081423]
            p-5
            rounded-xl
            border border-red-500/30
            space-y-3
            text-center
          ">

            <p className="text-white text-sm">
              Delete this comment?
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-1 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-1 bg-red-600 rounded"
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

/* ================= SINGLE COMMENT ================= */

function CommentItem({ comment, currentUser, onReply, onDelete }) {

  return (

    <div className="ml-4 mt-3 relative">

      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-500/20"></div>

      <div className="pl-4">

        <div className="bg-[#081423] p-2 rounded-lg">

          <div className="flex justify-between">

            <div className="flex items-center gap-2">

              {comment.parentId && (
                <span className="text-gray-500 text-xs">↳</span>
              )}

              <span className="text-cyan-400 text-xs font-semibold">
                {comment.user.username}
              </span>

            </div>

            {comment.userId === currentUser?.id && (

              <button
                onClick={() => onDelete(comment.id)}
                className="text-red-500"
              >
                <DeleteOutlineIcon fontSize="small" />
              </button>

            )}

          </div>

          <p className="text-xs text-gray-300 mt-1">
            {comment.text}
          </p>

          <button
            onClick={() => onReply(comment.id)}
            className="text-xs text-cyan-400 mt-1"
          >
            Reply
          </button>

        </div>

        {comment.replies?.map(reply => (

          <CommentItem
            key={reply.id}
            comment={reply}
            currentUser={currentUser}
            onReply={onReply}
            onDelete={onDelete}
          />

        ))}

      </div>

    </div>
  );
}
