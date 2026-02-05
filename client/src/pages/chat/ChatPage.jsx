import { useState } from "react";

import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import ChatFooter from "./components/ChatFooter";
import ChatGlobalHeader from "./components/ChatGlobalHeader";

export default function ChatPage() {

  const [selectedUser, setSelectedUser] = useState(null);

  return (

    /* ROOT */
    <div
      className="
        h-screen
        flex flex-col
        bg-[#050d18]
        overflow-hidden
      "
    >

      {/* ================= GLOBAL HEADER =================
          Desktop → always visible
          Mobile  → only when NO chat selected
      */}
      <div className={`${selectedUser ? "hidden md:block" : "block"}`}>
        <ChatGlobalHeader />
      </div>

      {/* ================= BODY ================= */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ================= SIDEBAR =================
            Mobile → full screen list
            Desktop → fixed width sidebar
        */}
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

        {/* ================= CHAT WINDOW ================= */}
        <div className="flex flex-col flex-1 min-h-0">

          {selectedUser ? (

            <ChatWindow
              selectedUser={selectedUser}
              onBack={() => setSelectedUser(null)}
            />

          ) : (

            /* Desktop empty state */
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-500 text-sm">
              Select a conversation to start chatting
            </div>

          )}

        </div>

      </div>

      {/* ================= FOOTER =================
          Mobile safe:
          - stays visible
          - does not push layout
      */}
      <div className="shrink-0 border-t border-cyan-500/10">
        <ChatFooter />
      </div>

    </div>

  );
}
