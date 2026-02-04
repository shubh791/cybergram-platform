import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer className="bg-[#020814] border-t border-cyan-400/10 py-10">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">

        {/* LEFT */}
        <div>

          <div className="flex items-center gap-2 mb-3">

            <img src="/cybergram-logo.png" className="w-10 h-10" alt="Cybergram" />

            <span className="text-cyan-400 font-bold text-lg">
              CYBERGRAM
            </span>

          </div>

          <p className="text-gray-400 text-sm max-w-md">

            Cybergram is a cyber awareness platform helping users detect scams,
            report cyber crimes and stay digitally safe.

          </p>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col md:items-end gap-3 text-sm">

          <Link to="/privacy-policy" className="hover:text-cyan-400">
            Privacy Policy
          </Link>

          <Link to="/terms" className="hover:text-cyan-400">
            Terms & Conditions
          </Link>

        </div>

      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} Cybergram — All Rights Reserved
      </div>

    </footer>
  );
}
