import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <div
      className="
        mt-6
        flex flex-wrap
        justify-center sm:justify-start
        gap-3
        w-full
      "
    >
      <Tab
        active={activeTab === "posts"}
        onClick={() => setActiveTab("posts")}
        icon={<GridOnIcon fontSize="small" />}
        label="Posts"
      />

      <Tab
        active={activeTab === "saved"}
        onClick={() => setActiveTab("saved")}
        icon={<BookmarkBorderIcon fontSize="small" />}
        label="Saved"
      />
    </div>
  );
}

function Tab({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        px-4 sm:px-5 py-2
        rounded-lg
        border
        text-sm
        min-w-[110px]
        transition
        ${
          active
            ? "bg-green-500 text-black border-green-500"
            : "bg-[#0b1628] text-gray-400 border-cyan-500/20 hover:text-white"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}
