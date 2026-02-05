import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../../../api/axios.js";

import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

export default function ProfilePostsGrid({
  activeTab,
  posts = [],
  setPosts,
  savedPosts = [],
  setSavedPosts
}) {

  const data = activeTab === "posts" ? posts : savedPosts;

  const [deleteId, setDeleteId] = useState(null);
  const [unsaveId, setUnsaveId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= OWNER CHECK ================= */

  const isOwnerPost = (postUser) => {
    const token = localStorage.getItem("token");
    if (!token || !postUser) return false;

    try {
      const decoded = jwtDecode(token);
      return decoded.username === postUser;
    } catch {
      return false;
    }
  };

  /* ================= DELETE POST ================= */

  const handleDelete = async () => {
    if (!deleteId) return;

    setLoading(true);

    try {
      await axios.delete(`/posts/${deleteId}`);
    } catch (err) {
      console.warn("Delete warning:", err?.response?.status);
    }

    // UI always update
    setPosts(prev => prev.filter(p => p.id !== deleteId));
    setDeleteId(null);
    setLoading(false);
  };

  /* ================= UNSAVE POST ================= */

  const handleUnsave = async () => {
    if (!unsaveId) return;

    setLoading(true);

    try {
      await axios.post(`/saves/${unsaveId}`);
    } catch (err) {
      console.warn("Unsave warning:", err?.response?.status);
    }

    setSavedPosts(prev => prev.filter(p => p.id !== unsaveId));
    setUnsaveId(null);
    setLoading(false);
  };

  return (
    <div className="mt-6 w-full bg-[#0b1628] border border-cyan-500/20 rounded-2xl p-6 min-h-[260px]">

      {data.length === 0 ? (
        <div className="text-gray-500 text-center py-16">
          No {activeTab === "posts" ? "posts" : "saved posts"}
        </div>
      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

          {data.map(post => {

            const imageUrl =
              post?.images?.[0]?.startsWith("http")
                ? post.images[0]
                : null;

            return (
              <div
                key={post.id}
                className="relative bg-[#081423] border border-cyan-500/10 rounded-lg overflow-hidden aspect-square group"
              >

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="post"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                    No Image
                  </div>
                )}

                {/* DELETE */}
                {activeTab === "posts" &&
                  post?.user &&
                  isOwnerPost(post.user.username) && (

                    <button
                      type="button"
                      onClick={() => setDeleteId(post.id)}
                      className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 p-2 rounded-full z-20"
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} className="text-white" />
                    </button>

                  )}

                {/* UNSAVE */}
                {activeTab === "saved" && (

                  <button
                    type="button"
                    onClick={() => setUnsaveId(post.id)}
                    className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 p-2 rounded-full z-20"
                  >
                    <BookmarkRemoveIcon sx={{ fontSize: 18 }} className="text-black" />
                  </button>

                )}

              </div>
            );
          })}

        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">

          <div className="bg-[#0b1628] p-6 rounded-xl w-[90%] max-w-xs">

            <h3 className="font-semibold mb-3">Delete Post?</h3>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 rounded"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* UNSAVE MODAL */}
      {unsaveId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">

          <div className="bg-[#0b1628] p-6 rounded-xl w-[90%] max-w-xs">

            <h3 className="font-semibold mb-3">Remove Saved Post?</h3>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setUnsaveId(null)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleUnsave}
                className="px-4 py-2 bg-yellow-500 rounded text-black"
              >
                {loading ? "Removing..." : "Unsave"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
