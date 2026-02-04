import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

export default function ChatInput({ onSend }) {

  const [text, setText] = useState("");

  // ================= SEND HANDLER =================

  const handleSend = () => {

    if (!text.trim()) return;

    onSend(text.trim());
    setText("");

  };

  // ================= ENTER KEY SUPPORT =================

  const handleKeyDown = (e) => {

    // Enter = Send
    // Shift + Enter = New line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }

  };

  return (
    <div
      className="
        flex items-center gap-2
        p-3
        border-t border-cyan-500/10
        bg-[#071427]
      "
    >

      {/* ================= INPUT ================= */}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="
          flex-1
          bg-black/40
          px-4 py-2.5
          rounded-full
          outline-none
          text-sm
          text-white
          border border-cyan-500/20
          placeholder-gray-400
          focus:border-cyan-400
          focus:ring-1 focus:ring-cyan-400/30
          transition
        "
      />

      {/* ================= SEND BUTTON ================= */}

      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className={`
          flex items-center justify-center
          w-11 h-11
          rounded-full
          transition
          ${
            text.trim()
              ? "bg-cyan-400 hover:bg-cyan-300 text-black"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }
        `}
      >

        <SendIcon sx={{ fontSize: 20 }} />

      </button>

    </div>
  );
}
