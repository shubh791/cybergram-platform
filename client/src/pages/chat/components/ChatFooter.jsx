import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function ChatFooter() {

  return (

    <div
      className="
        px-4 py-3
        flex flex-col
        items-center
        justify-center
        gap-1
        text-[11px]
        text-gray-400
        border-t
        border-cyan-500/10
        bg-[#050d18]
        pb-[env(safe-area-inset-bottom)]
        select-none
      "
    >

      {/* MAIN LINE */}

      <div className="flex items-center gap-2">

        <LockIcon sx={{ fontSize: 15 }} />

        <span className="text-cyan-400 font-medium">
          Cybergram End-to-End Encrypted Chat
        </span>

      </div>

      {/* SUB INFO */}

      <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-gray-500">

        <div className="flex items-center gap-1">
          <SecurityIcon sx={{ fontSize: 12 }} />
          Secure Transport
        </div>

        <div className="flex items-center gap-1">
          <VerifiedUserIcon sx={{ fontSize: 12 }} />
          Privacy Protected
        </div>

      </div>

    </div>

  );
}
