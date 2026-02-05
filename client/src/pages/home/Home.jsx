import { useState } from "react";

import CyberNewsPanel from "../../components/home/CyberNewsPanel";
import FeedPanel from "../../components/home/feed/FeedPanel";
import HelpPanel from "../../components/home/HelpPanel";
import CategoryTabs from "../../components/home/feed/CategoryTabs";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-[#050b14]">

      {/* CATEGORY FILTER */}
      <div className="
        px-3 sm:px-4 md:px-6 lg:px-8
        mt-4
        max-w-[1400px]
        mx-auto
      ">
        <CategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      {/* MAIN GRID */}
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-5
        px-3 sm:px-4 md:px-6 lg:px-8
        py-6
        max-w-[1400px]
        mx-auto
      ">

        {/* LEFT PANEL */}
        <div className="hidden lg:block lg:col-span-3">
          <CyberNewsPanel />
        </div>

        {/* FEED CENTER */}
        <div className="col-span-1 lg:col-span-6">
          <FeedPanel activeCategory={activeCategory} />
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden lg:block lg:col-span-3">
          <HelpPanel />
        </div>

      </div>

    </div>
  );
}
