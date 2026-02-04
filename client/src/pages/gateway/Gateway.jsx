import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Typewriter } from "react-simple-typewriter";

import ShieldIcon from "@mui/icons-material/Security";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RadarIcon from "@mui/icons-material/Radar";

export default function Gateway() {

  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [username, setUsername] = useState("");
  const [unlock, setUnlock] = useState(false);

  const isReturningUser = localStorage.getItem("visited");

  const TOTAL_TIME = isReturningUser ? 5000 : 7000;

  // ================= JWT USER FETCH =================

 useEffect(() => {

  // Try JWT first
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.username) {
        setUsername(decoded.username);
        return;
      }

    } catch (err) {
      console.error("Invalid token");
    }
  }

  // Fallback to saved user object
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    const user = JSON.parse(savedUser);
    setUsername(user.username || "");
  }

}, []);


  // ================= PROGRESS ENGINE =================

  useEffect(() => {

    let timer = TOTAL_TIME / 100;

    const interval = setInterval(() => {

      setProgress(prev => {

        const next = prev + 1;

        if (next === 80) {
          setUnlock(true);
        }

        if (next >= 100) {

          clearInterval(interval);

          localStorage.setItem("visited", "true");

          setTimeout(() => {
            navigate("/home");
          }, 1200);

        }

        return next;

      });

    }, timer);

    return () => clearInterval(interval);

  }, []);

  // ================= UI =================

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 sm:px-6">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#021a12] to-black" />

      {/* GRID EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,150,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,150,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* FLOATING ICONS */}
      <Floating Icon={ShieldIcon} top="15%" left="10%" />
      <Floating Icon={RadarIcon} bottom="15%" right="10%" />

      {/* MAIN TERMINAL */}
      <div
        className="
        relative z-10
        bg-[#04110b]/95 backdrop-blur-xl
        border border-green-400/40
        rounded-2xl sm:rounded-3xl
        p-6 sm:p-8 md:p-10
        w-full max-w-sm sm:max-w-md md:max-w-xl
        shadow-[0_0_140px_rgba(0,255,160,0.45)]
        animate-glow-pulse
        "
      >

        {/* HEADER */}
        <div className="text-center text-green-400 tracking-widest uppercase text-[10px] sm:text-xs mb-2 sm:mb-3">
          Cybergram Secure Gateway
        </div>

        {/* WELCOME TEXT */}
        <h2
          className="
          text-center
          text-xl sm:text-2xl md:text-3xl
          font-bold
          text-green-400
          tracking-wider
          mb-2
          "
        >
          {isReturningUser
            ? `Welcome Back ${username}`
            : `Welcome ${username}`}
        </h2>

        {/* TYPEWRITER */}
        <p
          className="
          text-center
          text-green-300/80
          text-xs sm:text-sm
          mb-5 sm:mb-6
          "
        >
          <Typewriter
            words={[
              "Authenticating Identity...",
              "Decrypting Security Layers...",
              "Initializing Cyber Defense...",
              "Access Granted..."
            ]}
            loop={false}
            cursor
            typeSpeed={45}
            deleteSpeed={0}
            delaySpeed={900}
          />
        </p>

        {/* PROGRESS BAR */}
        <div className="w-full h-2 sm:h-3 md:h-4 bg-black rounded-full overflow-hidden border border-green-400/40">

          <div
            className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />

        </div>

        {/* PERCENT */}
        <p className="text-center text-green-400 font-mono text-xs sm:text-sm mt-2 sm:mt-3">
          {progress}%
        </p>

        {/* LOCK STATUS */}
        <div className="flex justify-center mt-5 sm:mt-6 md:mt-8">

          {unlock ? (

            <div className="text-green-400 animate-pulse text-center">
              <LockOpenIcon sx={{ fontSize: 40 }} className="sm:!text-[48px] md:!text-[55px]" />
              <p className="text-[10px] sm:text-xs mt-2 tracking-widest">
                SECURE ACCESS ENABLED
              </p>
            </div>

          ) : (

            <div className="relative">

              <div className="absolute inset-0 rounded-full border-2 border-green-400/40 animate-ping"></div>
              <ShieldIcon sx={{ fontSize: 40 }} className="sm:!text-[48px] md:!text-[55px] text-green-400" />

            </div>

          )}

        </div>

        {/* FOOTER STATUS */}
        <p className="text-center text-green-400/70 text-[10px] sm:text-xs tracking-widest uppercase mt-4 sm:mt-6">
          Cyber Defense System Online
        </p>

      </div>

    </div>
  );
}

/* ================= FLOATING ICON ================= */

function Floating({ Icon, ...style }) {
  return (
    <div
      className="absolute text-green-400/30 animate-float-slow hidden sm:block"
      style={style}
    >
      <Icon sx={{ fontSize: 40 }} />
    </div>
  );
}
