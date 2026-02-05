import express from "express";

import {
  createPost,
  getPosts,
  deletePost
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ================= FETCH POSTS ================= */

router.get("/", authMiddleware, getPosts);

/* ================= CREATE POST ================= */

router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    upload.array("images", 5)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message || "Image upload failed"
        });
      }
      next();
    });
  },
  createPost
);

/* ================= DELETE POST ================= */

router.delete("/:id", authMiddleware, deletePost);

export default router;
