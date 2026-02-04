import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { statesData } from "./data/statedata";

import ShieldIcon from "@mui/icons-material/Shield";
import WarningIcon from "@mui/icons-material/Warning";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";


export default function HelpPage() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("state");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);


  const filteredData = statesData.filter(item =>
    item.type === activeTab &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">

      
     {/* ================= HEADER ================= */}
<div className="flex justify-between items-center gap-3 px-4 py-4 border-b border-white/10">

  {/* LEFT BRAND */}
  <div className="flex items-center gap-2">
    <img
      src="/cybergram-logo.png"
      alt="Cybergram Logo"
      className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
    />
    <div>
      <h1 className="text-lg sm:text-xl font-bold tracking-wide">
        CYBERGRAM
      </h1>
      <p className="text-xs text-gray-400">
        Cyber Assistance Portal
      </p>
    </div>
  </div>

  {/* DESKTOP REPORT BUTTON */}
  <a
    href="https://cybercrime.gov.in"
    target="_blank"
    className="
      hidden sm:flex
      bg-red-600
      px-4
      py-2
      rounded-lg
      items-center
      gap-1
      text-sm
      font-semibold
      hover:bg-red-500
      transition
    "
  >
    Report Online
    <OpenInNewIcon fontSize="small" />
  </a>

  {/* MOBILE MENU BUTTON */}
  <div className="sm:hidden relative">

    <button
      onClick={() => setMenuOpen(prev => !prev)}
      className="text-cyan-400"
    >
      <MenuIcon />
    </button>

    {/* MOBILE DROPDOWN */}
    {menuOpen && (

      <div className="
        absolute right-0 mt-2
        w-44
        bg-[#081423]
        border border-cyan-500/20
        rounded-xl
        shadow-xl
        overflow-hidden
        z-50
      ">

        <button
          onClick={() => {
            navigate("/home");
            setMenuOpen(false);
          }}
          className="
            w-full
            flex items-center gap-2
            px-4 py-3
            text-sm
            text-gray-300
            hover:bg-cyan-500/10
          "
        >
          <HomeIcon fontSize="small" />
          Home
        </button>

        <button
          onClick={() => {
            navigate("/news");
            setMenuOpen(false);
          }}
          className="
            w-full
            flex items-center gap-2
            px-4 py-3
            text-sm
            text-gray-300
            hover:bg-cyan-500/10
          "
        >
          <NewspaperIcon fontSize="small" />
          News
        </button>

        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          className="
            flex items-center gap-2
            px-4 py-3
            text-sm
            text-red-400
            hover:bg-red-500/10
          "
        >
          <OpenInNewIcon fontSize="small" />
          Report
        </a>

      </div>

    )}

  </div>

</div>


      {/* ================= WARNING ================= */}
      <div className="m-4 p-4 border border-yellow-500/40 rounded-xl bg-yellow-500/5 flex gap-2">

        <WarningIcon className="text-yellow-400 flex-shrink-0" />

        <p className="text-sm text-gray-300 leading-relaxed">
          This is NOT an official government website. CyberGram is an independent
          awareness platform. For official reporting visit{" "}
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            className="text-cyan-400 underline"
          >
            cybercrime.gov.in
          </a>
        </p>

      </div>

      {/* ================= HELPLINE ================= */}
      <div
        className="
          mx-4
          my-5
          p-4 sm:p-5
          rounded-xl
          bg-gradient-to-r
          from-blue-700
          to-blue-500
          flex
          flex-col
          lg:flex-row
          justify-between
          items-center
          gap-4
        "
      >

        <div className="flex items-center gap-3 text-center sm:text-left">
          <ShieldIcon fontSize="large" />
          <div>
            <h2 className="font-bold text-base sm:text-lg">
              National Cyber Crime Helpline
            </h2>
            <p className="text-xs sm:text-sm">
              24x7 Support | Toll Free
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

          <div className="bg-white/20 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <CallIcon />
            <span className="font-semibold">1930</span>
          </div>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-1"
          >
            Report Now
            <OpenInNewIcon fontSize="small" />
          </a>

        </div>

      </div>

      {/* ================= TABS ================= */}
      <div className="flex flex-wrap justify-center gap-3 px-4">

        <button
          onClick={() => setActiveTab("state")}
          className={`
            px-5
            py-2
            rounded-lg
            font-semibold
            text-sm
            ${activeTab === "state"
              ? "bg-cyan-500 text-black"
              : "bg-white/10 text-gray-300"}
          `}
        >
          States (28)
        </button>

        <button
          onClick={() => setActiveTab("ut")}
          className={`
            px-5
            py-2
            rounded-lg
            font-semibold
            text-sm
            ${activeTab === "ut"
              ? "bg-cyan-500 text-black"
              : "bg-white/10 text-gray-300"}
          `}
        >
          Union Territories (8)
        </button>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="px-4 mt-5">

        <input
          placeholder="Search state or UT cyber cell..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-[#0b1626]
            px-4
            py-3
            rounded-xl
            outline-none
            border
            border-cyan-500/20
            text-base
            text-white
          "
        />

      </div>

      {/* ================= STATE GRID ================= */}
      <div className="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredData.map((item) => (
          <div
            key={item.id}
            className="
              bg-[#081423]
              border
              border-cyan-500/20
              p-4
              rounded-xl
              shadow-[0_0_20px_rgba(0,255,255,0.08)]
              hover:shadow-[0_0_30px_rgba(0,255,255,0.18)]
              transition
            "
          >

            <h3 className="font-semibold mb-2 text-base">
              {item.name}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CallIcon fontSize="small" />
              {item.phone}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300 mt-1 break-all">
              <MailIcon fontSize="small" />
              {item.email}
            </div>

            <button
              onClick={() => navigate(`/help/${item.name}`)}
              className="
                mt-4
                w-full
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                py-2.5
                rounded-lg
                text-black
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                active:scale-[0.98]
                transition
              "
            >
              <LocationOnIcon fontSize="small" />
              View Cyber Cells
            </button>

          </div>
        ))}

      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-center text-xs sm:text-sm text-gray-400 py-6 border-t border-white/10 px-4">

        © {new Date().getFullYear()} CyberGram. Independent cyber security platform.
        <br />
        Not affiliated with any government. Official portal:{" "}
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          className="text-cyan-400 underline"
        >
          cybercrime.gov.in
        </a>

      </div>

    </div>
  );
}
