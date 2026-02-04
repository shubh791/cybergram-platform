import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

export default function HeroText() {

  return (
    <div className="space-y-6">

      <h1 className="text-4xl md:text-5xl font-bold leading-tight">

        Protect Your Digital Identity <br />

        <span className="text-cyan-400">

          <ReactTyped
            strings={[
              "Detect Online Threats",
              "Prevent Cyber Scams",
              "Stay Digitally Safe"
            ]}
            typeSpeed={60}
            backSpeed={40}
            loop
          />

        </span>

        <br />
        Secure Your Online Presence

      </h1>

      <p className="text-gray-400 max-w-xl leading-relaxed">

        Cybergram is a next-generation cyber awareness platform that empowers
        users to detect scams, report fraud and stay digitally protected.

      </p>

      <div className="flex flex-wrap gap-4">

        <Link
          to="/login"
          className="
            px-6 py-2.5 rounded-lg
            border border-cyan-400
            text-cyan-400
            hover:bg-cyan-400/10
          "
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="
            px-6 py-2.5 rounded-lg
            bg-gradient-to-r from-cyan-400 to-blue-500
            text-black font-semibold
            hover:scale-105 transition
          "
        >
          Create Free Account
        </Link>

      </div>

    </div>
  );
}
