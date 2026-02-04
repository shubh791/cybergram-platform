import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import { Server } from "socket.io";

// ================= ROUTES =================

import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import saveRoutes from "./routes/saveRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ================= SOCKET SETUP =================

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Make socket available inside controllers
app.set("io", io);

// ================= ONLINE USERS MAP =================
// userId => Set(socketIds)

const onlineUsers = new Map();

// ================= SOCKET EVENTS =================

io.on("connection", (socket) => {

  console.log("Socket Connected:", socket.id);

  // ================= JOIN ROOM =================

  socket.on("join", (userId) => {

    const roomId = String(userId);

    socket.join(roomId);

    // MULTI TAB / MULTI DEVICE SAFE
    if (!onlineUsers.has(roomId)) {
      onlineUsers.set(roomId, new Set());
    }

    onlineUsers.get(roomId).add(socket.id);

    console.log("User joined room:", roomId);

    // ✅ SEND FULL ONLINE LIST TO NEW USER
    const onlineList = Array.from(onlineUsers.keys());
    socket.emit("online_users", onlineList);

    // ✅ BROADCAST ONLY THIS USER TO OTHERS
    socket.broadcast.emit("user_online", roomId);

  });

  // ================= MESSAGE SEEN =================

  socket.on("message_seen", ({ senderId, messageId }) => {

    if (!senderId || !messageId) return;

    io.to(String(senderId)).emit("message_seen_update", {
      messageId
    });

  });

  // ================= DISCONNECT =================

  socket.on("disconnect", () => {

    let disconnectedUser = null;

    for (let [userId, socketSet] of onlineUsers.entries()) {

      if (socketSet.has(socket.id)) {

        socketSet.delete(socket.id);

        // Remove user ONLY if all tabs/devices closed
        if (socketSet.size === 0) {
          onlineUsers.delete(userId);
          disconnectedUser = userId;
        }

        break;
      }

    }

    if (disconnectedUser) {

      socket.broadcast.emit("user_offline", disconnectedUser);
      console.log("User offline:", disconnectedUser);

    }

    console.log("Socket Disconnected:", socket.id);

  });

});

// ================= API ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/saves", saveRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/chat", chatRoutes);

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  res.send("Cybergram API Running");
});

// ================= SERVER START =================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Cybergram Server Running On Port:", PORT);
});
