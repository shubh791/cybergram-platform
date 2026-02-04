import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LegalHeader() {

  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {

    const onScroll = () => {
      setShadow(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);

  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        bg-black/70 backdrop-blur
        border-b border-cyan-400/10
        transition
        ${shadow ? "shadow-[0_0_25px_rgba(0,255,255,0.25)]" : ""}
      `}
    >

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

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center gap-6">

          {/* HOME */}
          <Link
            to="/"
            className="
              px-5 py-1.5
              rounded-full
              font-semibold
              text-cyan-400
              border border-cyan-400
              hover:bg-cyan-400/10
              hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]
              transition
            "
          >
            Home
          </Link>

          {/* ABOUT */}
          <Link
            to="/about-us"
            className="
              px-5 py-1.5
              rounded-full
              font-semibold
              text-cyan-400
              border border-cyan-400
              hover:bg-cyan-400/10
              hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]
              transition
            "
          >
            About Us
          </Link>

        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cyan-400 text-2xl"
        >
          ☰
        </button>

      </div>

      {/* ================= MOBILE DROPDOWN ================= */}

      {open && (

        <div className="
          md:hidden
          bg-black
          border-t border-cyan-400/10
          px-6 py-4
          flex flex-col gap-4
        ">

          {/* HOME */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="
              text-center
              px-4 py-2
              rounded-full
              font-semibold
              text-cyan-400
              border border-cyan-400
            "
          >
            Home
          </Link>

          {/* ABOUT */}
          <Link
            to="/about-us"
            onClick={() => setOpen(false)}
            className="
              text-center
              px-4 py-2
              rounded-full
              font-semibold
              text-cyan-400
              border border-cyan-400
            "
          >
            About Us
          </Link>

        </div>

      )}

    </header>
  );
}
