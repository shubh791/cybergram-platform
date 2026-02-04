import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { SocketProvider } from "./context/SocketContext";
import { OnlineProvider } from "./context/OnlineContext";
import { ChatUnreadProvider } from "./context/ChatUnreadContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <>
    <OnlineProvider>

      <ChatUnreadProvider>

        <SocketProvider>

          <BrowserRouter>
            <App />
          </BrowserRouter>

        </SocketProvider>

      </ChatUnreadProvider>

    </OnlineProvider>
  </>

);
