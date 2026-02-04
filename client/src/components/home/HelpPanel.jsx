import { useNavigate } from "react-router-dom";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function HelpPanel() {

  const navigate = useNavigate();

  return (
    <div
      className="
        bg-[#081423]
        border border-cyan-500/20
        rounded-xl
        p-5
        space-y-5
        shadow-[0_0_30px_rgba(0,255,255,0.05)]
      "
    >

      {/* HEADER */}
      <div className="flex items-center gap-2 text-cyan-400 font-semibold tracking-wide">
        <SecurityIcon />
        <span>CYBER ASSISTANCE CENTER</span>
      </div>

      {/* INFO BOX */}
      <div
        className="
          bg-[#050b14]
          border border-cyan-500/20
          rounded-lg
          p-4
          text-sm
          text-gray-300
          leading-relaxed
        "
      >

        <div className="flex items-center gap-2 text-cyan-400 mb-2">
          <VerifiedUserIcon fontSize="small" />
          Verified Support Channel
        </div>

        If you are facing cyber fraud, online scams, account hacking,
        identity misuse, or digital harassment, you can report it to
        official cyber crime authorities and get step-by-step recovery
        guidance.

      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={() => navigate("/help")}
        className="
          w-full
          bg-gradient-to-r
          from-cyan-500
          to-blue-500
          py-2.5
          rounded-lg
          font-semibold
          tracking-wide
          text-black
          flex items-center justify-center gap-2
          hover:opacity-90
          transition
        "
      >

        <SupportAgentIcon />
        Get Official Help

      </button>

    </div>
  );
}
