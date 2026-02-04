import { Link } from "react-router-dom";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function LoginHeader() {

  const [open, setOpen] = useState(false);

  const navBtn =
    "border border-cyan-400 px-4 py-1.5 rounded-full text-cyan-400 hover:bg-cyan-400/10 transition";

  return (
    <header className="
      fixed top-0 left-0 w-full z-50
      bg-black/70 backdrop-blur
      border-b border-cyan-400/10
    ">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src="/cybergram-logo.png" className="w-9 h-9" />
          <span className="text-cyan-400 font-bold text-lg">
            CYBERGRAM
          </span>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-4">
          <Link to="/" className={navBtn}>Home</Link>
          <Link to="/signup" className={navBtn}>Create Free Account</Link>
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open
            ? <CloseIcon className="text-cyan-400" />
            : <MenuIcon className="text-cyan-400" />
          }
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/95 px-6 py-4 space-y-3">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`${navBtn} block text-center`}
          >
            Home
          </Link>

          <Link
            to="/signup"
            onClick={() => setOpen(false)}
            className={`${navBtn} block text-center`}
          >
            Create Free Account
          </Link>

        </div>
      )}

    </header>
  );
}
