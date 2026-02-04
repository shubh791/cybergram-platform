import { SCAM_CATEGORIES } from "./scamCategories";

export default function CategoryTabs({ activeCategory, setActiveCategory }) {

  return (
    <div className="
      flex flex-wrap gap-2
      bg-[#081423]
      border border-cyan-500/20
      rounded-xl
      p-3
      overflow-x-auto
    ">

      <Tab
        label="All"
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {SCAM_CATEGORIES.map(cat => (

        <Tab
          key={cat}
          label={cat}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

      ))}

    </div>
  );
}

function Tab({ label, activeCategory, setActiveCategory }) {

  const isActive = activeCategory === label;

  return (
    <button
      onClick={() => setActiveCategory(label)}
      className={`
        whitespace-nowrap
        px-3 py-1.5
        text-xs
        rounded-full
        transition
        ${isActive
          ? "bg-cyan-500 text-black"
          : "border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"}
      `}
    >
      {label}
    </button>
  );
}
