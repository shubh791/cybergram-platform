import express from "express";
import multer from "multer";

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

const router = express.Router();


// ================= MULTER CONFIG =================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() + "-" +
      Math.round(Math.random() * 1e9) + "-" +
      file.originalname;

    cb(null, uniqueName);

  }

});

const upload = multer({ storage });


// ================= STATIC ROUTES =================

// Saved posts
router.get("/saved/me", verifyToken, getSavedPosts);

// Update bio
router.put("/edit/bio", verifyToken, updateBio);

// Upload avatar
router.put(
  "/edit/avatar",
  verifyToken,
  upload.single("avatar"),
  updateAvatar
);

// ================= DELETE ACCOUNT =================
// Secure password + FK safe + transaction protected

router.delete("/delete/me", verifyToken, deleteMyAccount);


// ================= DYNAMIC ROUTES =================

// User posts
router.get("/:username/posts", getUserPosts);

// Profile info
router.get("/:username", optionalAuth, getUserProfile);

export default router;
