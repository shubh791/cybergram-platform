import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  sendMessage,
  getMessages,
  markSeen,
  deleteChatForMe,
  getChatUsers
} from "../controllers/chatController.js";

const router = express.Router();

// ================= CHAT SIDEBAR USERS =================

router.get("/users", authMiddleware, getChatUsers);

// ================= GET CHAT HISTORY =================

router.get("/:userId", authMiddleware, getMessages);

// ================= SEND MESSAGE =================

router.post("/send", authMiddleware, sendMessage);

// ================= MARK MESSAGE SEEN =================

router.put("/seen/:id", authMiddleware, markSeen);

// ================= CLEAR CHAT FOR ME =================
// NOTE: userId = OTHER PERSON ID

router.delete("/delete/:userId", authMiddleware, deleteChatForMe);

export default router;
