import express from "express";

import {
  getUserProfile,
  getUserPosts,
  getSavedPosts,
  updateBio,
  updateAvatar,
  deleteMyAccount
} from "../controllers/profileController.js";

import verifyToken from "../middleware/authMiddleware.js";
import optionalAuth from "../middleware/optionalAuth.js";
import upload from "../middleware/uploadMiddleware.js"; // ✅ MEMORY MULTER

const router = express.Router();

// ================= STATIC ROUTES =================

// Saved posts
router.get("/saved/me", verifyToken, getSavedPosts);

// Update bio
router.put("/edit/bio", verifyToken, updateBio);

// Upload avatar (CLOUDINARY)
router.put(
  "/edit/avatar",
  verifyToken,
  upload.single("avatar"),
  updateAvatar
);

// ================= DELETE ACCOUNT =================
router.delete("/delete/me", verifyToken, deleteMyAccount);

// ================= DYNAMIC ROUTES =================

// User posts
router.get("/:username/posts", getUserPosts);

// Profile info
router.get("/:username", optionalAuth, getUserProfile);

export default router;
