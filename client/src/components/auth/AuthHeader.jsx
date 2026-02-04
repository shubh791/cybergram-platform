import { Link } from "react-router-dom";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function AuthHeader() {

  const [open, setOpen] = useState(false);

  const navBtnClass =
    "border border-cyan-400 px-4 py-1.5 rounded-full text-cyan-400 hover:bg-cyan-400/10 transition";

  const mobileBtnClass =
    "block text-cyan-400 border border-cyan-400 px-4 py-2 rounded-full text-center hover:bg-cyan-400/10 transition";

  return (
    <header className="
      fixed top-0 left-0 w-full z-50
      bg-black/70 backdrop-blur
      border-b border-cyan-400/10
    ">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/cybergram-logo.png"
            className="w-9 h-9"
            alt="Cybergram"
          />

          <span className="text-cyan-400 font-bold text-lg">
            CYBERGRAM
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-4">

          <Link to="/" className={navBtnClass}>
            Home
          </Link>

          <Link to="/login" className={navBtnClass}>
            Login
          </Link>

        </div>

        {/* MOBILE ICON */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open
              ? <CloseIcon className="text-cyan-400" />
              : <MenuIcon className="text-cyan-400" />
            }
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="
          md:hidden
          bg-black/95 backdrop-blur
          border-t border-cyan-400/20
          px-6 py-4
          space-y-3
          animate-fadeIn
        ">

          <Link
            onClick={() => setOpen(false)}
            to="/"
            className={mobileBtnClass}
          >
            Home
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/login"
            className={mobileBtnClass}
          >
            Login
          </Link>

        </div>
      )}

    </header>
  );
}
