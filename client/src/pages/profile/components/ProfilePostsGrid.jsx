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

    try {
      await axios.delete(`/posts/${deleteId}`);

      // ✅ REFRESH POSTS FROM SERVER
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      const res = await axios.get(`/profile/${decoded.username}/posts`);
      setPosts(res.data);

    } catch (error) {
      console.warn("Delete error:", error?.response?.status);
    } finally {
      setDeleteId(null);
    }
  };

  /* ================= UNSAVE POST ================= */

  const handleUnsave = async () => {
    if (!unsaveId) return;

    try {
      await axios.post(`/saves/${unsaveId}`);

      // ✅ REFRESH SAVED POSTS FROM SERVER
      const res = await axios.get(`/profile/saved/me`);
      setSavedPosts(res.data);

    } catch (error) {
      console.warn("Unsave error:", error?.response?.status);
    } finally {
      setUnsaveId(null);
    }
  };

  return (
    <div className="mt-6 w-full bg-[#0b1628] border border-cyan-500/20 rounded-2xl p-4 sm:p-6 md:p-8 min-h-[260px]">

      {data.length === 0 ? (

        <div className="text-gray-500 text-center py-16">
          No {activeTab === "posts" ? "posts" : "saved posts"}
        </div>

      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">

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
                    draggable={false}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                    No Image
                  </div>

                )}

                {/* DELETE BUTTON */}
                {activeTab === "posts" &&
                  post?.user &&
                  isOwnerPost(post.user.username) && (

                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 p-1.5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} className="text-white" />
                    </button>

                  )}

                {/* UNSAVE BUTTON */}
                {activeTab === "saved" && (

                  <button
                    onClick={() => setUnsaveId(post.id)}
                    className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
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

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#0b1628] p-6 rounded-xl w-[90%] max-w-xs">

            <h3 className="font-semibold mb-2">Delete Post?</h3>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

      {/* UNSAVE MODAL */}

      {unsaveId && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#0b1628] p-6 rounded-xl w-[90%] max-w-xs">

            <h3 className="font-semibold mb-2">Remove Saved Post?</h3>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setUnsaveId(null)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUnsave}
                className="px-4 py-2 bg-yellow-500 rounded text-black"
              >
                Unsave
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
