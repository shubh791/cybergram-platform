import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import PostCard from "./PostCard";

export default function FeedList({ refresh, category }) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [refresh, category]);

  const fetchPosts = async () => {

    try {

      setLoading(true);

      const url =
        category === "All"
          ? "/posts"
          : `/posts?category=${encodeURIComponent(category)}`;

      const res = await axios.get(url);

      setPosts(res.data);

    } catch (error) {

      console.error("FEED ERROR:", error);

    } finally {

      setLoading(false);

    }

  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="text-center text-gray-500 text-sm py-10">
        Loading feed...
      </div>
    );
  }

  return (
    <div
      className="
        space-y-6
        px-0 sm:px-1
      "
    >

      {posts.length === 0 ? (

        <div className="text-center text-gray-500 py-12 text-sm">
          No posts in this category
        </div>

      ) : (

        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))

      )}

    </div>
  );
}
