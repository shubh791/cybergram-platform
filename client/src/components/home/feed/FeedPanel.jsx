import { useState } from "react";

import PostComposer from "./PostComposer";
import FeedList from "./FeedList";

export default function FeedPanel({ activeCategory }) {

  const [refreshFeed, setRefreshFeed] = useState(false);

  const handlePostSuccess = () => {
    setRefreshFeed(prev => !prev);
  };

  return (
    <div className="space-y-6">

      <PostComposer onPostSuccess={handlePostSuccess} />

      <FeedList
        refresh={refreshFeed}
        category={activeCategory}
      />

    </div>
  );
}
