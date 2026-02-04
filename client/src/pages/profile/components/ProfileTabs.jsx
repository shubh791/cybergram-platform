import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function ProfileTabs({ activeTab, setActiveTab }) {

  return (
    <div className="mt-6 flex gap-3 flex-wrap">

      <Tab
        active={activeTab === "posts"}
        onClick={() => setActiveTab("posts")}
        icon={<GridOnIcon />}
        label="Posts"
      />

      <Tab
        active={activeTab === "saved"}
        onClick={() => setActiveTab("saved")}
        icon={<BookmarkBorderIcon />}
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
        flex items-center gap-2
        px-5 py-2 rounded-lg
        border
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
