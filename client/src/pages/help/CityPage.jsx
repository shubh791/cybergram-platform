import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { cityData } from "./data/citydata";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export default function CityPage() {

  // ================= ROUTER =================

  const { state: rawState } = useParams();
  const navigate = useNavigate();

  // Decode URL param (important)
  const state = decodeURIComponent(rawState || "");

  // ================= DATA =================

  const cities = cityData[state] || [];

  // ================= UI STATE =================

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // ================= FILTER =================

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-black text-white">

      {/* ================= HEADER ================= */}

      <div
        className="
          px-4 py-4
          border-b border-white/10
          flex items-center justify-between
        "
      >

        {/* TITLE */}
        <h1 className="text-base sm:text-xl font-bold flex items-center gap-2">

          <LocationCityIcon className="text-cyan-400" />

          <span className="truncate">
            {state} Cyber Cells
          </span>

        </h1>

        {/* MOBILE MENU */}
        <div className="sm:hidden relative">

          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="text-cyan-400"
          >
            <MenuIcon />
          </button>

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

            </div>

          )}

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="px-4 mt-4">

        <input
          placeholder="Search city cyber cell..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-[#0b1626]
            px-4 py-3
            rounded-xl
            border border-cyan-500/20
            outline-none
            text-white
          "
        />

      </div>

      {/* ================= GRID ================= */}

      <div className="flex-1 px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredCities.length === 0 ? (

          <div className="text-gray-400 text-center col-span-full py-10">
            No cyber cells found
          </div>

        ) : (

          filteredCities.map((city, index) => (

            <div
              key={index}
              className="
                bg-[#081423]
                border border-cyan-500/20
                p-4
                rounded-xl
                shadow-lg
              "
            >

              <h3 className="font-semibold flex items-center gap-2">

                <LocationCityIcon className="text-cyan-400" />
                {city.name}

              </h3>

              <p className="flex items-center gap-2 text-sm mt-2 text-gray-300">

                <PhoneIcon fontSize="small" />
                {city.phone}

              </p>

              <a
                href={city.map}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-4
                  flex items-center justify-center gap-2
                  bg-gradient-to-r from-cyan-500 to-blue-500
                  py-2
                  rounded-lg
                  text-black
                  font-semibold
                "
              >

                <MapIcon fontSize="small" />
                Open Location

              </a>

            </div>

          ))

        )}

      </div>

      {/* ================= FOOTER ================= */}

      <div className="text-center text-sm text-gray-400 py-4 border-t border-white/10">

        © {new Date().getFullYear()} CyberGram. Independent cyber security platform.
        <br />
        Not affiliated with any government. Official portal:{" "}
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 underline"
        >
          cybercrime.gov.in
        </a>

      </div>

    </div>

  );
}
