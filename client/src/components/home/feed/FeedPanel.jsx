import { useState } from "react";

import PostComposer from "./PostComposer";
import FeedList from "./FeedList";

export default function FeedPanel({ activeCategory }) {

  const [refreshFeed, setRefreshFeed] = useState(false);

  const handlePostSuccess = () => {
    setRefreshFeed(prev => !prev);
  };

  return (
    <div
      className="
        w-full
        max-w-3xl
        mx-auto

        px-3 sm:px-4 md:px-0
        pb-24 md:pb-6

        space-y-6
      "
    >
      <PostComposer onPostSuccess={handlePostSuccess} />

      <FeedList
        refresh={refreshFeed}
        category={activeCategory}
      />
    </div>
  );
}
