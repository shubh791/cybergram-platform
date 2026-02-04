import { useState } from "react";

import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import ChatFooter from "./components/ChatFooter";
import ChatGlobalHeader from "./components/ChatGlobalHeader";

export default function ChatPage() {

  const [selectedUser, setSelectedUser] = useState(null);

  return (

    // Root container
    <div
      className="
        h-screen
        flex flex-col
        bg-[#050d18]
        overflow-hidden
      "
    >

      {/* ================= GLOBAL CHAT HEADER ================= */}

      {/* Show header:
          - ALWAYS on desktop
          - On mobile ONLY when no chat is opened */}

      <div className={`${selectedUser ? "hidden md:block" : "block"}`}>
        <ChatGlobalHeader />
      </div>

      {/* ================= BODY ================= */}

      <div className="flex flex-1 min-h-0">

        {/* ================= SIDEBAR ================= */}

        <div
          className={`
            ${selectedUser ? "hidden md:flex" : "flex"}
            w-full md:w-[320px]
            border-r border-cyan-500/10
            flex-col
            min-h-0
          `}
        >
          <ChatSidebar onSelectUser={setSelectedUser} />
        </div>

        {/* ================= CHAT PANEL ================= */}

        <div className="flex flex-col flex-1 min-h-0">

          {selectedUser ? (

            <ChatWindow
              selectedUser={selectedUser}
              onBack={() => setSelectedUser(null)}
            />

          ) : (

            <div className="hidden md:flex flex-1 items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>

          )}

        </div>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="shrink-0">
        <ChatFooter />
      </div>

    </div>

  );
}
