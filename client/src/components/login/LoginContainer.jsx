import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

import LoginCard from "./LoginCard";

export default function LoginContainer() {

  const navigate = useNavigate();

  return (
    <div
      className="
        relative w-full max-w-md
        p-7
        rounded-xl
        bg-black/75
        border border-cyan-400/30
        backdrop-blur-xl
        shadow-[0_0_50px_rgba(0,255,255,0.25)]
      "
    >

      {/* TITLE */}

      <h2 className="text-center text-xl font-semibold text-cyan-400 mb-2">

        <Typewriter
          words={["Secure Login Portal — Authorized Access"]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={45}
        />

      </h2>

      <p className="text-center text-gray-400 text-sm mb-6">
        Verify your identity to access Cybergram Network
      </p>

      {/* FORM CARD */}

      <LoginCard onSuccess={() => navigate("/gateway")} />

      {/* REGISTER LINK */}

      <div className="mt-5 text-center text-gray-400 text-sm">

        New Agent?{" "}

        <span
          onClick={() => navigate("/signup")}
          className="text-cyan-400 cursor-pointer hover:underline"
        >
          Register Access
        </span>

      </div>

    </div>
  );
}
