import { useContext } from "react";

import PublicIcon from "@mui/icons-material/Public";
import CircleIcon from "@mui/icons-material/Circle";

import { OnlineContext } from "../../../context/OnlineContext";

export default function ChatGlobalHeader() {

  const { onlineUsers } = useContext(OnlineContext);

  return (

    <div className="
      flex items-center justify-between
      px-4 py-2
      border-b border-cyan-500/20
      bg-[#071427]
    ">

      {/* LEFT TITLE */}

      <div className="flex items-center gap-2 text-cyan-400 font-semibold">

        <PublicIcon fontSize="small" />
        Cybergram World Chat

      </div>

      {/* ONLINE COUNT */}

      <div className="flex items-center gap-2 text-xs">

        <CircleIcon
          sx={{ fontSize: 10 }}
          className="text-green-500"
        />

        <span className="text-gray-300">
          {onlineUsers.length} Online
        </span>

      </div>

    </div>

  );
}
